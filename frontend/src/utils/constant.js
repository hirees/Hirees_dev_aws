    const API_BASE =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
        ? "https://www.hirees.com/api/v1"
        : "http://localhost:8000/api/v1");

    export const USER_API_END_POINT = `${API_BASE}/user`;
    export const JOB_API_END_POINT = `${API_BASE}/job`;
    export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
    export const COMPANY_API_END_POINT = `${API_BASE}/company`;
    export const SAVED_JOBS_API_END_POINT = `${API_BASE}/savedjobs`;
