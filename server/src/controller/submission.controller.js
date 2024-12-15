import { Op } from "sequelize";
import { Practice } from "../model/practice.model.js";
import { Student } from "../model/student.model.js";
import { Submission } from "../model/submission.model.js";

export const createSubmission = async (req, res) => {
  try {
    const { practice_id } = req.params;
    const student_id = req.userId;
    const { answer } = req.body;

    const practice = await Practice.findByPk(practice_id);
    if (!practice) {
      return res.status(404).json({
        success: false,
        message: "Practice not found",
      });
    }

    if (new Date() > new Date(practice.due_date)) {
      return res.status(400).json({
        success: false,
        message: "Practice submission deadline has passed",
      });
    }

    const existingSubmission = await Submission.findOne({
      where: {
        practice_id,
        student_id,
      },
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this practice",
      });
    }

    const submission = await Submission.create({
      practice_id,
      student_id,
      answer,
      files: req.files ? req.files.map((file) => file.path) : null,
      status: "submitted",
    });

    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create submission",
      error: error.message,
    });
  }
};

export const gradeSubmission = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const { score, feedback } = req.body;

    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    if (submission.status !== "submitted") {
      return res.status(400).json({
        success: false,
        message: "This submission has already been graded",
      });
    }

    if (score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 0 and 100",
      });
    }

    await Submission.update(
      {
        score,
        feedback,
        status: "graded",
      },
      {
        where: { submission_id },
      }
    );

    const updatedSubmission = await Submission.findByPk(submission_id);

    res.status(200).json({
      success: true,
      message: "Submission graded successfully",
      data: updatedSubmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to grade submission",
      error: error.message,
    });
  }
};

export const getSubmissionsByPractice = async (req, res) => {
  try {
    const { practice_id } = req.params;
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      score_min,
      score_max,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const whereClause = {
      practice_id,
      [Op.and]: [
        status ? { status } : {},
        score_min ? { score: { [Op.gte]: score_min } } : {},
        score_max ? { score: { [Op.lte]: score_max } } : {},
        search ? {
          '$student.name$': {
            [Op.like]: `%${search}%`
          }
        } : {}
      ]
    };

    const offset = (page - 1) * limit;
    const totalSubmissions = await Submission.count({
      where: whereClause,
      include: [{
        model: Student,
        attributes: []
      }]
    });

    if (totalSubmissions === 0) {
      return res.status(200).json({
        success: true,
        message: "No submissions found with given criterials",
        data: [],
        metadata: {
          total: 0,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: 0
        }
      });
    }

    const submission = await Submission.findAll({
      where: whereClause,
      include: [{
        model: Student,
        attributes: ['name', 'email']
      }],
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submission,
      metadata: {
        total: totalSubmissions,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalSubmissions / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

export const getStudentSubmission = async (req, res) => {
  try {
    const { practice_id } = req.params;
    const student_id = req.userId;

    const submission = await Submission.findOne({
      where: {
        practice_id,
        student_id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};
