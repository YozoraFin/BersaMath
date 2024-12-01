import db from "../config/db";
import { DataTypes } from "sequelize";

export const LessonContent = db.define(
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
      allowNull: false,
      validate: {
        len: [1, 5000],
      },
    },
    math_formula: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
    content_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

LessonContent.associate = (models) => {
  LessonContent.belongsTo(models.Lesson, {
    foreignKey: "lesson_id",
  });
};
