import { dynamoDB } from "../config/aws.config.js";

const JOBS_TABLE = process.env.JOBS_TABLE || "Jobs_dev";
const COMPANIES_TABLE = process.env.COMPANIES_TABLE || "Companies_dev";

async function scanAll(tableName) {
  const items = [];
  let ExclusiveStartKey;
  do {
    const page = await dynamoDB.scan({ TableName: tableName, ExclusiveStartKey });
    items.push(...(page.Items || []));
    ExclusiveStartKey = page.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

async function companyMap() {
  try {
    const companies = await scanAll(COMPANIES_TABLE);
    return new Map(companies.map((company) => [company.companyId, company]));
  } catch (error) {
    console.error("Company lookup for public pages failed", error.message);
    return new Map();
  }
}

export async function listJobs() {
  const [jobs, companies] = await Promise.all([scanAll(JOBS_TABLE), companyMap()]);
  return jobs.map((job) => ({
    ...job,
    company: companies.get(job.companyId) || job.company || null,
  }));
}

export async function getJob(jobId) {
  const result = await dynamoDB.get({
    TableName: JOBS_TABLE,
    Key: { jobId },
  });
  if (!result.Item) return null;
  const job = result.Item;
  if (job.companyId) {
    try {
      const company = await dynamoDB.get({
        TableName: COMPANIES_TABLE,
        Key: { companyId: job.companyId },
      });
      job.company = company.Item || null;
    } catch (error) {
      console.error("Company lookup failed", error.message);
    }
  }
  return job;
}
