// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file");
import multer from "multer";

// Configure memory storage
const storage = multer.memoryStorage();

// Single file upload middleware (used for registration)
export const singleUpload = multer({ storage }).single("file");

// Multiple file upload middleware (used for profile updates)
export const multipleUploads = multer({ storage }).fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);