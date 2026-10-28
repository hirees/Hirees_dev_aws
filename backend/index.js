import express from "express";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js";
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import bodyParser from "body-parser";
import path from 'path'
import savedJobsRouter from './routes/savedJobs.routes.js'
import feedbackRoute from './routes/feedback.route.js';
import newsletterRoute from './routes/newsletter.route.js';
import templateRoute from './routes/template.route.js';
import resumeMatchRoute from './routes/resumeMatch.route.js';
import { createSeoRouter, htmlNotFound, isKnownSpaPath } from './seo/router.js';
import { getJob, listJobs } from './seo/repository.js';
import { magicLinkHtml, unsubscribe } from './controllers/resumeMatch.controller.js';
import compression from "compression";
import fs from 'fs';
import { createSavedJobsTable } from "./models/savedJobs.model.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
// app.use(bodyParser.json()); // Parse JSON
// app.use(bodyParser.urlencoded({ extended: true }));
const _dirname = path.resolve();



const allowedOrigins = [
    'http://www.hirees.com', 'https://www.hirees.com', 'https://hirees.com', 'http://hirees.com',
    'http://www.hirees.ai', 'https://www.hirees.ai', 'https://hirees.ai', 'http://hirees.ai',
    'http://3.135.232.113:5173', 'https://3.135.232.113:5173',
    'http://www.3.135.232.113:5173', 'https://www.3.135.232.113:5173',
    'https://job-portal-lavu.onrender.com', 'http://localhost:5173','https://www.hirees.com/','http://localhost:5173'
];

// Unified CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Headers allowed
};



app.use(compression());

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Simple request logger for debugging route issues
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
app.use('/api/v1/savedjobs', savedJobsRouter);
app.use('/api/v1/feedback', feedbackRoute);
app.use('/api/v1/newsletter', newsletterRoute);
app.use('/api/v1/templates', templateRoute);
app.use('/api/v1/resume-match', resumeMatchRoute);

const distDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../frontend/dist');
app.use(createSeoRouter({ listJobs, getJob }));
app.get('/auth/magic', magicLinkHtml);
app.get('/alerts/unsubscribe', unsubscribe);
if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, { index: false }));
}
app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (isKnownSpaPath(req.path) && fs.existsSync(path.join(distDir, 'index.html'))) {
        return res.status(200).sendFile(path.join(distDir, 'index.html'));
    }
    if (req.path.startsWith('/api')) return next();
    return res.status(404).type('html').send(htmlNotFound());
});




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        status: false
    });
});

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get("*", (_,res) => {
//     res.sendFile(path.resolve(_dirname, "frontend/dist/index.html"));
// });
// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found',
        status: false
    });
});
// await createSavedJobsTable();
// Start server
const startServer = async () => {
    try {
        // await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};


startServer();