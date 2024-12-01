import db from "../config/db";
import { DataTypes } from "sequelize";

export const Practice = db.define(
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
        isIn: [["mudah", "menengah", "sulit"]],
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Practice.associate = (models) => {
  Practice.belongsTo(models.Lesson, {
    foreignKey: "lesson_id",
  });
  Practice.hasMany(models.Submission, {
    foreignKey: "practice_id",
    onDelete: "CASCADE",
  });
};
