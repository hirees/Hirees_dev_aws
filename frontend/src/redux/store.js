// // // // import { configureStore } from "@reduxjs/toolkit";
// // // // import authSlice from "./authSlice.js";
// // // // import jobSlice from "./jobSlice.js";
// // // // import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// // // // import storage from "redux-persist/lib/storage";
// // // // import { combineReducers } from "redux";
// // // // import companySlice from "./companySlice.js"
// // // // import applicationSlice from "./application.js"

// // // // const persistConfig = {
// // // //   key: "root",
// // // //   version: 1,
// // // //   storage,
// // // // };

// // // // // Combine reducers
// // // // const rootReducer = combineReducers({
// // // //   auth: authSlice,
// // // //   job: jobSlice,
// // // //   company:companySlice,
// // // //   application:applicationSlice,
// // // // });

// // // // // Apply persistReducer to the combined reducer
// // // // const persistedReducer = persistReducer(persistConfig, rootReducer);

// // // // const store = configureStore({
// // // //   reducer: persistedReducer,
// // // //   middleware: (getDefaultMiddleware) =>
// // // //     getDefaultMiddleware({
// // // //       serializableCheck: {
// // // //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// // // //       },
// // // //     }),
// // // // });



// // // // export const persistor = persistStore(store);
// // // // export default store;
// // // import { configureStore } from "@reduxjs/toolkit";
// // // import authSlice from "./authSlice.js";
// // // import jobSlice from "./jobSlice.js";
// // // import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// // // import storage from "redux-persist/lib/storage";
// // // import { combineReducers } from "redux";
// // // import companySlice from "./companySlice.js"
// // // import applicationSlice from "./application.js"

// // // // Only persist authentication data
// // // const authPersistConfig = {
// // //   key: "auth",
// // //   version: 1,
// // //   storage,
// // //   whitelist: ['user', 'token'] // only persist these fields from auth
// // // };

// // // const rootReducer = combineReducers({
// // //   auth: persistReducer(authPersistConfig, authSlice),
// // //   job: jobSlice,
// // //   company: companySlice,
// // //   application: applicationSlice,
// // // });

// // // const store = configureStore({
// // //   reducer: rootReducer,
// // //   middleware: (getDefaultMiddleware) =>
// // //     getDefaultMiddleware({
// // //       serializableCheck: {
// // //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// // //       },
// // //     }),
// // // });

// // // export const persistor = persistStore(store);
// // // export default store;
// // // import { configureStore } from "@reduxjs/toolkit";
// // // import authSlice from "./authSlice.js";
// // // import jobSlice from "./jobSlice.js";
// // // import companySlice from "./companySlice.js"
// // // import applicationSlice from "./application.js"
// // // import { persistReducer } from "redux-persist";
// // // import storage from "redux-persist/lib/storage";
// // // import { combineReducers } from "redux";

// // // // Separate persist configs for each slice that needs persistence
// // // const authPersistConfig = {
// // //   key: "auth",
// // //   storage,
// // //   blacklist: ['loading', 'error'] // Don't persist these fields
// // // };

// // // const rootReducer = combineReducers({
// // //   auth: persistReducer(authPersistConfig, authSlice),
// // //   job: jobSlice,
// // //   company: companySlice,
// // //   application: applicationSlice
// // // });

// // // const store = configureStore({
// // //   reducer: rootReducer,
// // //   middleware: (getDefaultMiddleware) =>
// // //     getDefaultMiddleware({
// // //       serializableCheck: false // Temporarily disable for debugging
// // //     }),
// // // });

// // // export default store;

// // import { configureStore } from "@reduxjs/toolkit";
// // import authSlice from "./authSlice.js";
// // import jobSlice from "./jobSlice.js";
// // import companySlice from "./companySlice.js";
// // import applicationSlice from "./application.js";
// // import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// // import storage from "redux-persist/lib/storage";
// // import { combineReducers } from "redux";

// // const authPersistConfig = {
// //   key: "auth",
// //   storage,
// //   blacklist: ['loading', 'error'],
// //   // Add security measures
// //   serialize: true, // Ensure data is properly serialized
// //   timeout: 2000, // Add timeout for storage operations
// // };

// // const rootReducer = combineReducers({
// //   auth: persistReducer(authPersistConfig, authSlice),
// //   job: jobSlice,
// //   company: companySlice,
// //   application: applicationSlice
// // });

// // const store = configureStore({
// //   reducer: rootReducer,
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         // Only ignore redux-persist actions instead of disabling completely
// //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// //         // Add specific paths to ignore if needed
// //         ignoredPaths: ['auth.someSpecificPath']
// //       },
// //     }),
// //   devTools: process.env.NODE_ENV !== 'production', // Disable Redux DevTools in production
// // });

// // export default store;

// // ... existing code ...
// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice.js";
// import jobSlice from "./jobSlice.js";
// import companySlice from "./companySlice.js";
// import applicationSlice from "./application.js";
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";


// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ['user', 'token'], // Only persist these fields
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authSlice),
//   job: jobSlice,
//   company: companySlice,
//   application: applicationSlice
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   devTools: true, // Set to false in production
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import jobSlice from "./jobSlice.js";
import companySlice from "./companySlice.js";
import applicationSlice from "./application.js";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ['loading', 'error'],
  // Add security measures
  serialize: true, // Ensure data is properly serialized
  timeout: 2000, // Add timeout for storage operations
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  job: jobSlice,
  company: companySlice,
  application: applicationSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Only ignore redux-persist actions instead of disabling completely
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Add specific paths to ignore if needed
        ignoredPaths: ['auth.someSpecificPath']
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Disable Redux DevTools in production
});

export default store;