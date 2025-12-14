import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ChatBot, { WebsiteDataProvider } from "./components/ChatBot.jsx"; // Temporarily disabled chatbot
import { useEffect } from "react";


// Loading component
const PageLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-lg font-semibold">Loading page...</p>
      </div>
    </div>
);

// Only import Home component directly - this loads first
import Home from "./components/Home";
import Company from "./components/Company";
import CompanyJobs from "./components/CompanyJobs";
import ContactPage from "./components/ContactPage";
import RecruiterDashboard from "./components/shared/RecruiterDashboard";
import RegisterLanding from "./components/auth/RegisterLanding.jsx";

// Lazy load everything else
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const CandidateSignup = lazy(() => import("./components/auth/CandidateSignup"));
const RecruiterSignup = lazy(() => import("./components/auth/RecruiterSignup"));
const Jobs = lazy(() => import("./components/Jobs"));
const JobDescription = lazy(() => import("./components/JobDescription"));
const Browse = lazy(() => import("./components/Browse"));
const Profile = lazy(() => import("./components/Profile"));
const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
const Companies = lazy(() => import("./components/admin/Companies"));
const CompanyCreaate = lazy(() => import("./components/admin/CompanyCreaate"));
const CompanySetup = lazy(() => import("./components/admin/CompanySetup"));
const PostJob = lazy(() => import("./components/admin/PostJob"));
const Applicants = lazy(() => import("./components/admin/Applicants"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const Candidates = lazy(() => import("./components/admin/Candidates"));
const EditJobForm = lazy(() => import("./components/admin/EditJobForm"));

// Wrapping all lazy components with consistent loader
const withLoader = (Component) => (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
);

// Wrapping protected routes
const withProtectedLoader = (Component) => (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    </Suspense>
);

// Create Layout component to wrap all routes with WebsiteDataProvider and ChatBot
// const Layout = ({ children }) => {
//   return (
//       <WebsiteDataProvider>
//         {children}
//         <ChatBot />
//       </WebsiteDataProvider>
//   );
// };

// Modified to use Layout component
// const withLayout = (Component) => (
//     <Layout>
//       {Component}
//     </Layout>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: withLoader(Login),
  },
  {
    path: "/jobs/:companyId",
    element: <CompanyJobs />,
  },
  {
    path: "/signup",
    element: withLoader(() => <RegisterLanding />),
  },
  {
    path: "/signup/candidate",
    element: withLoader(CandidateSignup),
  },
  {
    path: "/signup/recruiter",
    element: withLoader(RecruiterSignup),
  },
  {
    path: "/signup",
    element: withLoader(Signup),
  },
  {
    path: "/jobs",
    element: withLoader(Jobs),
  },
  {
    path: "/contactUs",
    element: withLoader(() => <ContactPage />),
  },
  {
    path: "/company",
    element: withLoader(() => <Company />),
  },
  {
    path: "/description/:id",
    element: withLoader(JobDescription),
  },
  {
    path: "/browse",
    element: withLoader(Browse),
  },
  {
    path: "/profile",
    element: withLoader(Profile),
  },
  {
    path: "/admin/companies",
    element: withProtectedLoader(Companies),
  },
  {
    path: "/admin/companies/create",
    element: withProtectedLoader(CompanyCreaate),
  },
  {
    path: "/admin/companies/:id",
    element: withProtectedLoader(CompanySetup),
  },
  {
    path: "/admin/jobs",
    element: withProtectedLoader(AdminJobs),
  },
  {
    path: "/admin/jobs/post",
    element: withProtectedLoader(PostJob),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: withProtectedLoader(Applicants),
  },
  {
    path: "/admin/candidates",
    element: withProtectedLoader(Candidates),
  },
  {
    path: "/admin/jobs/edit/:id",
    element: withProtectedLoader(EditJobForm),
  },
  {
    path: "/admin/dashboard",
    element: withProtectedLoader(() => <RecruiterDashboard />),
  },
]);

function App() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return    <RouterProvider router={router} />;

  
 
     
 



  
  
}

export default App;