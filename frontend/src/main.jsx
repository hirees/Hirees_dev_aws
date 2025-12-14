import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import LoadingScreen from "./components/shared/LoadingScreen";

// Lazy load components
const App = lazy(() => import('./App.jsx'));
const Toaster = lazy(() =>
  import('./components/ui/sonner.jsx').then(module => ({
    default: module.Toaster
  }))
);

// Custom Landing Page without Aurora and Background Animations
// const LandingPage = () => (
//   <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col justify-center items-center text-white">
//     <div className="text-center py-16 px-4">
//       <h1 className="text-5xl font-extrabold mb-4">
//         Welcome to Hirees
//       </h1>
//       <p className="text-lg mb-8">
//         Your next job is just a click away. Explore opportunities, find your dream job, and connect with top employers.
//       </p>
//       <a
//         href="#explore"
//         className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-400 transform hover:scale-105"
//       >
//         Explore Opportunities
//       </a>
//     </div>

//     {/* Footer or additional information (if necessary) */}
//     <footer className="bg-gray-800 text-center text-white py-4 w-full mt-16">
//       <p>© 2025 Hirees. All Rights Reserved.</p>
//     </footer>
//   </div>
// );

const persistor = persistStore(store);

// Preload critical components
const preloadComponents = () => {
  const preloadApp = () => import("./App.jsx");
  const preloadToaster = () => import("./components/ui/sonner.jsx");

  Promise.all([preloadApp(), preloadToaster()]).catch((error) => {
    console.error("Error preloading components:", error);
  });
};

// Initialize root with lazy loading
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
        <Suspense fallback={<LoadingScreen/>}>
          <App />
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
// Preload components after initial render
if (typeof requestIdleCallback === "function") {
  requestIdleCallback(preloadComponents);
} else {
  setTimeout(preloadComponents, 1000);
}

