import db from "../config/db.js";
import { DataTypes } from "sequelize";
import { Submission } from "./submission.model.js";

const Practice = db.define(
  "practice",
  {
    practice_id: {
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
    question: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [3, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 2000],
      },
    },
    difficulty: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["basic", "intermediate", "advanced"]],
      },
    },
    max_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      validate: {
        min: 0,
        max: 100,
      },
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
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

Submission.belongsTo(Practice, {
  foreignKey: "practice_id"
})
Practice.hasMany(Submission, {
  foreignKey: "practice_id",
  onDelete: "CASCADE"
})

export { Practice };
