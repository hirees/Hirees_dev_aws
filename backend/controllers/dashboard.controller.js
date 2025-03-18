import { dynamoDB } from "../config/aws.config.js";

// Recruiter dashboard controller
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.id;

    // Get all jobs created by the recruiter
    const jobsParams = {
      TableName: "Jobs_dev",
      IndexName: "CreatedByIndex",
      KeyConditionExpression: "created_by = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      }
    };

    const jobsResult = await dynamoDB.query(jobsParams);
    const jobs = jobsResult.Items || [];

    // Get all applications for the recruiter's jobs
    let allApplications = [];
    let jobTitles = {};

    // Create a map of job IDs to job titles for easier reference
    jobs.forEach(job => {
      jobTitles[job.jobId] = job.title;
    });

    // Get applications for each job
    for (const job of jobs) {
      const applicationsParams = {
        TableName: "Applications_dev",
        FilterExpression: "job = :jobId",
        ExpressionAttributeValues: {
          ":jobId": job.jobId
        }
      };

      const applicationsResult = await dynamoDB.scan(applicationsParams);
      if (applicationsResult.Items && applicationsResult.Items.length > 0) {
        // Add job title to each application
        const appsWithTitle = applicationsResult.Items.map(app => ({
          ...app,
          jobTitle: job.title
        }));
        allApplications = [...allApplications, ...appsWithTitle];
      }
    }

    // Get candidate information for each application
    const candidateProfiles = new Map();
    for (const app of allApplications) {
      if (!candidateProfiles.has(app.applicant)) {
        const candidateParams = {
          TableName: "Users_dev",
          Key: {
            "email": app.applicant
          }
        };

        const candidateResult = await dynamoDB.get(candidateParams);
        if (candidateResult.Item) {
          candidateProfiles.set(app.applicant, candidateResult.Item);
        }
      }
    }

    // Process data for the dashboard

    // 1. Total jobs and applications
    const totalJobs = jobs.length;
    const totalApplications = allApplications.length;

    // 2. Applications by status
    const jobsByStatus = [
      { status: "pending", count: allApplications.filter(app => app.status === "pending").length },
      { status: "accepted", count: allApplications.filter(app => app.status === "accepted").length },
      { status: "rejected", count: allApplications.filter(app => app.status === "rejected").length }
    ];

    // 3. Applications by job
    const applicationsByJob = jobs.map(job => ({
      jobId: job.jobId,
      jobTitle: job.title,
      applicationCount: allApplications.filter(app => app.job === job.jobId).length
    })).sort((a, b) => b.applicationCount - a.applicationCount).slice(0, 10);

    // 4. Recent applications (last 10)
    const recentApplications = allApplications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map(app => {
        const candidate = candidateProfiles.get(app.applicant);
        return {
          id: app.id,
          candidateName: candidate ? candidate.fullname : app.applicant,
          jobTitle: app.jobTitle || "Untitled Job",
          date: app.createdAt,
          status: app.status
        };
      });

    // 5. Application trend by date (last 14 days)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const applicationTrend = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(twoWeeksAgo);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      const count = allApplications.filter(app => {
        const appDate = new Date(app.createdAt).toISOString().split('T')[0];
        return appDate === dateString;
      }).length;

      applicationTrend.push({
        date: dateString,
        count
      });
    }

    // 6. Candidates by skills
    const skillsCount = new Map();
    candidateProfiles.forEach(candidate => {
      if (candidate.skills) {
        const skills = Array.isArray(candidate.skills) ? candidate.skills : [candidate.skills];
        skills.forEach(skill => {
          skillsCount.set(skill, (skillsCount.get(skill) || 0) + 1);
        });
      }
    });

    const candidatesBySkill = Array.from(skillsCount.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Prepare the dashboard data
    const dashboardData = {
      totalJobs,
      totalApplications,
      jobsByStatus,
      applicationsByJob,
      recentApplications,
      applicationTrend,
      candidatesBySkill
    };

    return res.status(200).json({
      status: true,
      message: "Dashboard data retrieved successfully",
      data: dashboardData
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve dashboard data",
      error: error.message
    });
  }
};