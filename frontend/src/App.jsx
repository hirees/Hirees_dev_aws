// import { lazy, useState } from "react";


// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import Home from "./components/Home";
// // const Home = lazy(() => import('./components/Home'));

// import AdminJobs from "./components/admin/AdminJobs";
// import Browse from "./components/Browse";
// import Profile from "./components/Profile";
// import JobDescription from "./components/JobDescription";
// import Companies from "./components/admin/Companies";
// import CompanyCreaate from "./components/admin/CompanyCreaate";
// import CompanySetup from "./components/admin/CompanySetup";
// import Jobs from "./components/Jobs";
// import PostJob from "./components/admin/PostJob";
// import Applicants from "./components/admin/Applicants";
// import ProtectedRoute from "./components/admin/ProtectedRoute";
// import CandidateSignup from "./components/auth/CandidateSignup";
// import RecruiterSignup from "./components/auth/RecruiterSignup";
// import Candidates from "./components/admin/Candidates";
// import EditJobForm from "./components/admin/EditJobForm";


// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: '/signup/candidate', // Updated path for CandidateSignup
//     element: <CandidateSignup />,
//   },
//   {
//     path: '/signup/recruiter', // Updated path for RecruiterSignup
//     element: <RecruiterSignup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/jobs",
//     element: <Jobs></Jobs>,
//   },
//   {
//     path: "/description/:id",
//     element: <JobDescription></JobDescription>
//   },
//   {
//     path: "/browse",
//     element: <Browse></Browse>,
//   },
//   {
//     path: "/profile",
//     element: <Profile></Profile>
//   },
//   //admin
//   {
//     path:'/admin/companies',
//     element:<ProtectedRoute><Companies></Companies></ProtectedRoute>

//   },
//   {
//     path:'/admin/companies/create',
//     element:<ProtectedRoute><CompanyCreaate></CompanyCreaate></ProtectedRoute>
//   },
//   {
//     path:'/admin/companies/:id',
//     element:<ProtectedRoute><CompanySetup></CompanySetup></ProtectedRoute>
//   },
//   {
//     path:'/admin/jobs',
//     element:<ProtectedRoute><AdminJobs></AdminJobs></ProtectedRoute>
//   },
//   {
//     path:'/admin/jobs/post',
//     element:<ProtectedRoute><PostJob></PostJob></ProtectedRoute>
//   },
//   {
//     path:'/admin/jobs/:id/applicants',
//     element:<ProtectedRoute><Applicants></Applicants></ProtectedRoute>
//   },
//   {
//     path:"/admin/candidates",
//     element:<ProtectedRoute><Candidates/></ProtectedRoute>
//   },
//   {
//     path:"/admin/jobs/edit/:id/",
//     element:<ProtectedRoute><EditJobForm></EditJobForm></ProtectedRoute>
//   },



// ]);

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       {/* Only use RouterProvider for routing */}
//       <RouterProvider router={appRouter} />
//     </>
//   );
// }

// export default App;
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Only import Home component directly - this loads first
import Home from "./components/Home";
import Company from "./components/Company";
import CompanyJobs from "./components/CompanyJobs";
import ContactPage from "./components/ContactPage";
import RecruiterDashboard from "./components/shared/RecruiterDashboard";

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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,  // This loads immediately
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/jobs/:companyId",
    element: <CompanyJobs></CompanyJobs>,  // This loads immediately
  },
  {
    path: "/signup/candidate",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CandidateSignup />
      </Suspense>
    ),
  },
  {
    path: "/signup/recruiter",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RecruiterSignup />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/jobs",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Jobs />
      </Suspense>
    ),
  },
  {
    path: "/contactUs",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
       <ContactPage></ContactPage>
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
      <Company></Company>
      </Suspense>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <JobDescription />
      </Suspense>
    ),
  },
  {
    path: "/browse",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Browse />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <CompanyCreaate />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <CompanySetup />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <AdminJobs />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/jobs/post",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <PostJob />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <Applicants />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/candidates",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <Candidates />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/jobs/edit/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <EditJobForm />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <RecruiterDashboard/>
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;