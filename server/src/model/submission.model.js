import db from "../config/db";
import { DataTypes } from "sequelize";

export const Submission = db.define(
  "submission",
  {
    submission_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    practice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "practice",
        key: "practice_id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "student",
        key: "student_id",
      },
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 5000],
      },
    },
    files: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "diajukan",
      validate: {
        isIn: [["diajukan", "dinilai"]],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Submission.associate = (models) => {
  Submission.belongsTo(models.Practice, {
    foreignKey: "practice_id",
  });
  Submission.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
};
