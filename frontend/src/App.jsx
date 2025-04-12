// // import { lazy, useState } from "react";
//
//
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
//
// // import Login from "./components/auth/Login";
// // import Signup from "./components/auth/Signup";
// // import Home from "./components/Home";
// // // const Home = lazy(() => import('./components/Home'));
//
// // import AdminJobs from "./components/admin/AdminJobs";
// // import Browse from "./components/Browse";
// // import Profile from "./components/Profile";
// // import JobDescription from "./components/JobDescription";
// // import Companies from "./components/admin/Companies";
// // import CompanyCreaate from "./components/admin/CompanyCreaate";
// // import CompanySetup from "./components/admin/CompanySetup";
// // import Jobs from "./components/Jobs";
// // import PostJob from "./components/admin/PostJob";
// // import Applicants from "./components/admin/Applicants";
// // import ProtectedRoute from "./components/admin/ProtectedRoute";
// // import CandidateSignup from "./components/auth/CandidateSignup";
// // import RecruiterSignup from "./components/auth/RecruiterSignup";
// // import Candidates from "./components/admin/Candidates";
// // import EditJobForm from "./components/admin/EditJobForm";
//
//
// // const appRouter = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <Home />,
// //   },
// //   {
// //     path: '/signup/candidate', // Updated path for CandidateSignup
// //     element: <CandidateSignup />,
// //   },
// //   {
// //     path: '/signup/recruiter', // Updated path for RecruiterSignup
// //     element: <RecruiterSignup />,
// //   },
// //   {
// //     path: "/login",
// //     element: <Login />,
// //   },
// //   {
// //     path: "/signup",
// //     element: <Signup />,
// //   },
// //   {
// //     path: "/jobs",
// //     element: <Jobs></Jobs>,
// //   },
// //   {
// //     path: "/description/:id",
// //     element: <JobDescription></JobDescription>
// //   },
// //   {
// //     path: "/browse",
// //     element: <Browse></Browse>,
// //   },
// //   {
// //     path: "/profile",
// //     element: <Profile></Profile>
// //   },
// //   //admin
// //   {
// //     path:'/admin/companies',
// //     element:<ProtectedRoute><Companies></Companies></ProtectedRoute>
//
// //   },
// //   {
// //     path:'/admin/companies/create',
// //     element:<ProtectedRoute><CompanyCreaate></CompanyCreaate></ProtectedRoute>
// //   },
// //   {
// //     path:'/admin/companies/:id',
// //     element:<ProtectedRoute><CompanySetup></CompanySetup></ProtectedRoute>
// //   },
// //   {
// //     path:'/admin/jobs',
// //     element:<ProtectedRoute><AdminJobs></AdminJobs></ProtectedRoute>
// //   },
// //   {
// //     path:'/admin/jobs/post',
// //     element:<ProtectedRoute><PostJob></PostJob></ProtectedRoute>
// //   },
// //   {
// //     path:'/admin/jobs/:id/applicants',
// //     element:<ProtectedRoute><Applicants></Applicants></ProtectedRoute>
// //   },
// //   {
// //     path:"/admin/candidates",
// //     element:<ProtectedRoute><Candidates/></ProtectedRoute>
// //   },
// //   {
// //     path:"/admin/jobs/edit/:id/",
// //     element:<ProtectedRoute><EditJobForm></EditJobForm></ProtectedRoute>
// //   },
//
//
//
// // ]);
//
// // function App() {
// //   const [count, setCount] = useState(0);
//
// //   return (
// //     <>
// //       {/* Only use RouterProvider for routing */}
// //       <RouterProvider router={appRouter} />
// //     </>
// //   );
// // }
//
// // // export default App;
// // import { lazy, Suspense } from "react";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
//
// // // Only import Home component directly - this loads first
// // import Home from "./components/Home";
// // import Company from "./components/Company";
// // import CompanyJobs from "./components/CompanyJobs";
// // import ContactPage from "./components/ContactPage";
// // import RecruiterDashboard from "./components/shared/RecruiterDashboard";
//
// // // Lazy load everything else
// // const Login = lazy(() => import("./components/auth/Login"));
// // const Signup = lazy(() => import("./components/auth/Signup"));
// // const CandidateSignup = lazy(() => import("./components/auth/CandidateSignup"));
// // const RecruiterSignup = lazy(() => import("./components/auth/RecruiterSignup"));
// // const Jobs = lazy(() => import("./components/Jobs"));
// // const JobDescription = lazy(() => import("./components/JobDescription"));
// // const Browse = lazy(() => import("./components/Browse"));
// // const Profile = lazy(() => import("./components/Profile"));
// // const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
// // const Companies = lazy(() => import("./components/admin/Companies"));
// // const CompanyCreaate = lazy(() => import("./components/admin/CompanyCreaate"));
// // const CompanySetup = lazy(() => import("./components/admin/CompanySetup"));
// // const PostJob = lazy(() => import("./components/admin/PostJob"));
// // const Applicants = lazy(() => import("./components/admin/Applicants"));
// // const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
// // const Candidates = lazy(() => import("./components/admin/Candidates"));
// // const EditJobForm = lazy(() => import("./components/admin/EditJobForm"));
//
// // const appRouter = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <Home />,  // This loads immediately
// //   },
// //   {
// //     path: "/login",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <Login />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/jobs/:companyId",
// //     element: <CompanyJobs></CompanyJobs>,  // This loads immediately
// //   },
// //   {
// //     path: "/signup/candidate",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <CandidateSignup />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/signup/recruiter",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <RecruiterSignup />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/signup",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <Signup />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/jobs",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <Jobs />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/contactUs",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //        <ContactPage></ContactPage>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/company",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //       <Company></Company>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/description/:id",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <JobDescription />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/browse",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <Browse />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/profile",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <Profile />
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/companies",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <Companies />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/companies/create",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <CompanyCreaate />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/companies/:id",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <CompanySetup />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/jobs",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <AdminJobs />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/jobs/post",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <PostJob />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/jobs/:id/applicants",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <Applicants />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/candidates",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <Candidates />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/jobs/edit/:id",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <EditJobForm />
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// //   {
// //     path: "/admin/dashboard",
// //     element: (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <ProtectedRoute>
// //           <RecruiterDashboard/>
// //         </ProtectedRoute>
// //       </Suspense>
// //     ),
// //   },
// // ]);
//
// // function App() {
// //   return <RouterProvider router={appRouter} />;
// // }
//
// // export default App;
// import { lazy, Suspense, useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
//
// // Loading component
// const PageLoader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
//       <p className="text-lg font-semibold">Loading page...</p>
//     </div>
//   </div>
// );
//
// // Only import Home component directly - this loads first
// import Home from "./components/Home";
// import Company from "./components/Company";
// import CompanyJobs from "./components/CompanyJobs";
// import ContactPage from "./components/ContactPage";
// import RecruiterDashboard from "./components/shared/RecruiterDashboard";
//
// // Lazy load everything else
// const Login = lazy(() => import("./components/auth/Login"));
// const Signup = lazy(() => import("./components/auth/Signup"));
// const CandidateSignup = lazy(() => import("./components/auth/CandidateSignup"));
// const RecruiterSignup = lazy(() => import("./components/auth/RecruiterSignup"));
// const Jobs = lazy(() => import("./components/Jobs"));
// const JobDescription = lazy(() => import("./components/JobDescription"));
// const Browse = lazy(() => import("./components/Browse"));
// const Profile = lazy(() => import("./components/Profile"));
// const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
// const Companies = lazy(() => import("./components/admin/Companies"));
// const CompanyCreaate = lazy(() => import("./components/admin/CompanyCreaate"));
// const CompanySetup = lazy(() => import("./components/admin/CompanySetup"));
// const PostJob = lazy(() => import("./components/admin/PostJob"));
// const Applicants = lazy(() => import("./components/admin/Applicants"));
// const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
// const Candidates = lazy(() => import("./components/admin/Candidates"));
// const EditJobForm = lazy(() => import("./components/admin/EditJobForm"));
//
// // Wrapping all lazy components with consistent loader
// const withLoader = (Component) => (
//   <Suspense fallback={<PageLoader />}>
//     <Component />
//   </Suspense>
// );
//
// // Wrapping protected routes
// const withProtectedLoader = (Component) => (
//   <Suspense fallback={<PageLoader />}>
//     <ProtectedRoute>
//       <Component />
//     </ProtectedRoute>
//   </Suspense>
// );
//
// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,  // This loads immediately
//   },
//   {
//     path: "/login",
//     element: withLoader(Login),
//   },
//   {
//     path: "/jobs/:companyId",
//     element: <CompanyJobs />,  // This loads immediately
//   },
//   {
//     path: "/signup/candidate",
//     element: withLoader(CandidateSignup),
//   },
//   {
//     path: "/signup/recruiter",
//     element: withLoader(RecruiterSignup),
//   },
//   {
//     path: "/signup",
//     element: withLoader(Signup),
//   },
//   {
//     path: "/jobs",
//     element: withLoader(Jobs),
//   },
//   {
//     path: "/contactUs",
//     element: withLoader(() => <ContactPage />),
//   },
//   {
//     path: "/company",
//     element: withLoader(() => <Company />),
//   },
//   {
//     path: "/description/:id",
//     element: withLoader(JobDescription),
//   },
//   {
//     path: "/browse",
//     element: withLoader(Browse),
//   },
//   {
//     path: "/profile",
//     element: withLoader(Profile),
//   },
//   {
//     path: "/admin/companies",
//     element: withProtectedLoader(Companies),
//   },
//   {
//     path: "/admin/companies/create",
//     element: withProtectedLoader(CompanyCreaate),
//   },
//   {
//     path: "/admin/companies/:id",
//     element: withProtectedLoader(CompanySetup),
//   },
//   {
//     path: "/admin/jobs",
//     element: withProtectedLoader(AdminJobs),
//   },
//   {
//     path: "/admin/jobs/post",
//     element: withProtectedLoader(PostJob),
//   },
//   {
//     path: "/admin/jobs/:id/applicants",
//     element: withProtectedLoader(Applicants),
//   },
//   {
//     path: "/admin/candidates",
//     element: withProtectedLoader(Candidates),
//   },
//   {
//     path: "/admin/jobs/edit/:id",
//     element: withProtectedLoader(EditJobForm),
//   },
//   {
//     path: "/admin/dashboard",
//     element: withProtectedLoader(() => <RecruiterDashboard />),
//   },
//
// ]);
//
// function App() {
//   return <RouterProvider router={appRouter} />;
// }
//
// export default App;
import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatBot, { WebsiteDataProvider } from "./components/ChatBot.jsx"; // Import the chatbot

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
const Layout = ({ children }) => {
  return (
      <WebsiteDataProvider>
        {children}
        <ChatBot />
      </WebsiteDataProvider>
  );
};

// Modified to use Layout component
const withLayout = (Component) => (
    <Layout>
      {Component}
    </Layout>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: withLayout(<Home />),
  },
  {
    path: "/login",
    element: withLayout(withLoader(Login)),
  },
  {
    path: "/jobs/:companyId",
    element: withLayout(<CompanyJobs />),
  },
  {
    path: "/signup",
    element: withLayout(withLoader(() => <RegisterLanding />)),
  },
  {
    path: "/signup/candidate",
    element: withLayout(withLoader(CandidateSignup)),
  },
  {
    path: "/signup/recruiter",
    element: withLayout(withLoader(RecruiterSignup)),
  },
  {
    path: "/signup",
    element: withLayout(withLoader(Signup)),
  },
  {
    path: "/jobs",
    element: withLayout(withLoader(Jobs)),
  },
  {
    path: "/contactUs",
    element: withLayout(withLoader(() => <ContactPage />)),
  },
  {
    path: "/company",
    element: withLayout(withLoader(() => <Company />)),
  },
  {
    path: "/description/:id",
    element: withLayout(withLoader(JobDescription)),
  },
  {
    path: "/browse",
    element: withLayout(withLoader(Browse)),
  },
  {
    path: "/profile",
    element: withLayout(withLoader(Profile)),
  },
  {
    path: "/admin/companies",
    element: withLayout(withProtectedLoader(Companies)),
  },
  {
    path: "/admin/companies/create",
    element: withLayout(withProtectedLoader(CompanyCreaate)),
  },
  {
    path: "/admin/companies/:id",
    element: withLayout(withProtectedLoader(CompanySetup)),
  },
  {
    path: "/admin/jobs",
    element: withLayout(withProtectedLoader(AdminJobs)),
  },
  {
    path: "/admin/jobs/post",
    element: withLayout(withProtectedLoader(PostJob)),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: withLayout(withProtectedLoader(Applicants)),
  },
  {
    path: "/admin/candidates",
    element: withLayout(withProtectedLoader(Candidates)),
  },
  {
    path: "/admin/jobs/edit/:id",
    element: withLayout(withProtectedLoader(EditJobForm)),
  },
  {
    path: "/admin/dashboard",
    element: withLayout(withProtectedLoader(() => <RecruiterDashboard />)),
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;