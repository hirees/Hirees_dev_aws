// Development URLs
const DEV_API_BASE = "http://localhost:8000/api/v1";

// Production URLs (commented out for development)
const PROD_API_BASE = "https://www.hirees.com/api/v1";

// Use environment variable to determine API base
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? PROD_API_BASE : DEV_API_BASE);

export const USER_API_END_POINT = `${API_BASE}/user`;
export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;
export const SAVEDJOB_API_END_POINT = `${API_BASE}/savedjobs`;

/*
// PRODUCTION URLs (uncomment when deploying to production)
export const USER_API_END_POINT = `${PROD_API_BASE}/user`;
export const JOB_API_END_POINT = `${PROD_API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${PROD_API_BASE}/application`;
export const COMPANY_API_END_POINT = `${PROD_API_BASE}/company`;
export const SAVEDJOB_API_END_POINT = `${PROD_API_BASE}/savedjobs`;
*/
