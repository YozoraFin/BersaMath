import db from "../config/db.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.model.js";

const Topic = db.define(
  "topic",
  {
    topic_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.TEXT(500),
      allowNull: true,
      validate: {
        len: [10, 500],
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

// Course.belongsTo(Topic, {
//   foreignKey: "topic_id",
// });
// Topic.hasMany(Course, {
//   foreignKey: "topic_id",
//   onDelete: "CASCADE",
// });

export { Topic };