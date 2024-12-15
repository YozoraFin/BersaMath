import db from "../config/db.js";
import { DataTypes } from "sequelize";
import { Topic } from "./topic.model.js";
import { Lesson } from "./lesson.model.js";
import { Enrollment } from "./enrollment.model.js";
import { Discussion } from "./discussion.model.js";

export const Course = db.define(
  "course",
  {
    course_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
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

// relastionh here
Course.belongsTo(Topic, {
  foreignKey: "topic_id",
});
Topic.hasMany(Course, {
  foreignKey: "topic_id",
  onDelete: "CASCADE",
});
Enrollment.belongsTo(Course, {
  foreignKey: "course_id",
});
Course.hasMany(Enrollment, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});
Lesson.belongsTo(Course, {
  foreignKey: "course_id",
});
Course.hasMany(Lesson, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});
Discussion.belongsTo(Course, {
  foreignKey: "course_id"
})
Course.hasMany(Discussion, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});
