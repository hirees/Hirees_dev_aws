import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDB } from "../config/aws.config.js";

// Controller functions
export const savedJobsController = {
  // Check if a job is saved
  checkSavedStatus: async (req, res) => {
    try {
      const userId = req.id;
      const { jobId } = req.params;

      if (!jobId) {
        return res.status(400).json({
          error: "Job ID is required",
          status: false,
        });
      }

      // Check if job is saved
      const existingSave = await dynamoDB.query({
        TableName: "SavedJobs_dev",
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :userId",
        FilterExpression: "jobId = :jobId",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":jobId": jobId
        }
      });

      return res.status(200).json({
        status: true,
        isSaved: existingSave.Items && existingSave.Items.length > 0
      });
    } catch (err) {
      console.error("Check saved status error:", err);
      return res.status(500).json({
        error: "Internal server error",
        details: err.message,
      });
    }
  },

  // Save a job
  saveJob: async (req, res) => {
    try {
      const userId = req.id; // From auth middleware
      const { jobId } = req.body;

      if (!jobId) {
        return res.status(400).json({
          error: "Job ID is required",
          status: false,
        });
      }

      // Check if the job exists
      const jobExists = await dynamoDB.get({
        TableName: "Jobs_dev",
        Key: { jobId }
      });

      if (!jobExists.Item) {
        return res.status(404).json({
          error: "Job not found",
          status: false,
        });
      }

      // Check if already saved
      const existingSave = await dynamoDB.query({
        TableName: "SavedJobs_dev",
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :userId",
        FilterExpression: "jobId = :jobId",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":jobId": jobId
        }
      });

      if (existingSave.Items && existingSave.Items.length > 0) {
        return res.status(400).json({
          error: "Job already saved",
          status: false,
        });
      }

      // Save the job
      const savedJob = {
        savedJobId: uuidv4(),
        userId,
        jobId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await dynamoDB.put({
        TableName: "SavedJobs_dev",
        Item: savedJob
      });

      return res.status(201).json({
        message: "Job saved successfully",
        status: true,
        savedJob
      });
    } catch (err) {
      console.error("Save job error:", err);
      return res.status(500).json({
        error: "Internal server error",
        details: err.message,
      });
    }
  },

  // Get all saved jobs for a user
  getSavedJobs: async (req, res) => {
    try {
      const userId = req.id;

      const result = await dynamoDB.query({
        TableName: "SavedJobs_dev",
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId
        }
      });

      if (!result.Items.length) {
        return res.status(200).json({
          status: true,
          savedJobs: []
        });
      }

      // Fetch full job details for each saved job
      const savedJobsWithDetails = await Promise.all(
        result.Items.map(async (savedJob) => {
          const jobResult = await dynamoDB.get({
            TableName: "Jobs_dev",
            Key: { jobId: savedJob.jobId }
          });

          if (jobResult.Item) {
            // Fetch company details
            const companyResult = await dynamoDB.get({
              TableName: "Companies_dev",
              Key: { companyId: jobResult.Item.companyId }
            });

            return {
              ...savedJob,
              jobDetails: {
                ...jobResult.Item,
                company: companyResult.Item || {}
              }
            };
          }
          return null;
        })
      );

      const validSavedJobs = savedJobsWithDetails.filter(job => job !== null);

      return res.status(200).json({
        status: true,
        savedJobs: validSavedJobs
      });
    } catch (err) {
      console.error("Get saved jobs error:", err);
      return res.status(500).json({
        error: "Internal server error",
        details: err.message,
      });
    }
  },

  // Remove a saved job using jobId
  removeSavedJob: async (req, res) => {
    try {
      const userId = req.id;
      const { jobId } = req.body;

      // Find the saved job entry
      const existingSave = await dynamoDB.query({
        TableName: "SavedJobs_dev",
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :userId",
        FilterExpression: "jobId = :jobId",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":jobId": jobId
        }
      });

      if (!existingSave.Items || existingSave.Items.length === 0) {
        return res.status(404).json({
          error: "Saved job not found",
          status: false,
        });
      }

      // Delete using the savedJobId
      await dynamoDB.delete({
        TableName: "SavedJobs_dev",
        Key: { savedJobId: existingSave.Items[0].savedJobId }
      });

      return res.status(200).json({
        message: "Saved job removed successfully",
        status: true,
      });
    } catch (err) {
      console.error("Remove saved job error:", err);
      return res.status(500).json({
        error: "Internal server error",
        details: err.message,
      });
    }
  }
};