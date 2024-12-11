import db from "../config/db.js";
import { DataTypes } from "sequelize";
import { Practice } from "./practice.model.js";

const Lesson = db.define(
  "lesson",
  {
    lesson_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "course",
        key: "course_id",
      },
    },
    title: {
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
    lesson_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["teori", "kuis"]],
      },
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

Practice.belongsTo(Lesson, {
  foreignKey: "lesson_id"
})
Lesson.hasMany(Practice, {
  foreignKey: "lesson_id",
  onDelete: "CASCADE"
})

export { Lesson };
