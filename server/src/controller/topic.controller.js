import { Topic } from "../model/topic.model.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();

    res.status(200).json({
      success: true,
      message: "Topics fetched successfully",
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch topics",
      error: error.message,
    });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByPk(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Topic fetched successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch topic",
      error: error.message,
    });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existingTopic = await Topic.findOne({
      where: {
        title,
      },
    });

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required",
      });
    }

    if (existingTopic) {
      return res.status(400).json({
        success: false,
        message: "Topic title already exists",
      });
    }

    const topic = await Topic.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create topic",
      error: error.message,
    });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const topic = await Topic.findByPk(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    await topic.update({
      title,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update topic",
      error: error.message,
    });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findByPk(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    await topic.destroy();

    res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete topic",
      error: error.message,
    });
  }
};
