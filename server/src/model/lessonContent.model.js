import db from "../config/db.js";
import { DataTypes } from "sequelize";

const LessonContent = db.define(
  "lesson_content",
  {
    content_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "lesson",
        key: "lesson_id",
      },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [3, 200],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 2000],
      },
    },
    math_formula: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
    content_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["text", "video", "file"]],
      },
    },
    content_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

LessonContent.associate = (models) => {
  LessonContent.belongsTo(models.Lesson, {
    foreignKey: "lesson_id",
  });
};

export { LessonContent };
