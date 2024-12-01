import db from "../config/db";
import { DataTypes } from "sequelize";

export const Progress = db.define(
  "progress",
  {
    progress_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "enrollment",
        key: "enrollment_id",
      },
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "lesson",
        key: "lesson_id",
      },
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    time_spent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    last_accessed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Progress.associate = (models) => {
  Progress.belongsTo(models.Enrollment, {
    foreignKey: "enrollment_id",
  });
  Progress.belongsTo(models.Lesson, {
    foreignKey: "lesson_id",
  });
};
