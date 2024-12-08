import db from "../config/db";
import { DataTypes } from "sequelize";

const Submission = db.define(
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

Submission.associate = (models) => {
  Submission.belongsTo(models.Practice, {
    foreignKey: "practice_id",
  });
  Submission.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
};

export { Submission };
