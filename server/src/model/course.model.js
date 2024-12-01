import db from "../config/db";
import { DataTypes } from "sequelize";

export const Course = db.define(
  "course",
  {
    course_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "teacher",
        key: "teacher_id",
      },
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "topic",
        key: "topic_id",
      },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [5, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    thumbnail: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Course.associate = (models) => {
  Course.belongsTo(models.Teacher, {
    foreignKey: "teacher_id",
  });
  Course.belongsTo(models.Topic, {
    foreignKey: "topic_id",
  });
  Course.hasMany(models.Lesson, {
    foreignKey: "course_id",
    onDelete: "CASCADE",
  });
  Course.hasMany(models.Enrollment, {
    foreignKey: "course_id",
    onDelete: "CASCADE",
  });
  Course.hasMany(models.Discussion, {
    foreignKey: "course_id",
    onDelete: "CASCADE",
  });
};