// One API base for every client call.
// Set VITE_API_URL in the environment (for example https://www.hirees.com/api/v1).
// The localhost value is only the local-dev fallback when that variable is unset
// and the app is not a production build.
const configuredBase =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://www.hirees.com/api/v1"
    : "http://localhost:8000/api/v1");

export const API_BASE = String(configuredBase).replace(/\/$/, "");

// Origin without the /api/v1 suffix, for sockets and other host-level clients.
export const API_ORIGIN = API_BASE.replace(/\/api\/v1$/, "");

export const USER_API_END_POINT = `${API_BASE}/user`;
export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;
export const SAVED_JOBS_API_END_POINT = `${API_BASE}/savedjobs`;
export const FEEDBACK_API_END_POINT = `${API_BASE}/feedback`;
export const NEWSLETTER_API_END_POINT = `${API_BASE}/newsletter`;
export const TEMPLATES_API_END_POINT = `${API_BASE}/templates`;
