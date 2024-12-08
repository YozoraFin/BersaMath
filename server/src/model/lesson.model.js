import db from "../config/db";
import { DataTypes } from "sequelize";

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

Lesson.associate = (models) => {
  Lesson.belongsTo(models.Course, {
    foreignKey: "course_id",
  });
  Lesson.hasMany(models.Practice, {
    foreignKey: "lesson_id",
    onDelete: "CASCADE",
  });
};

export { Lesson };
