import db from "../config/db";
import { DataTypes } from "sequelize";

export const Discussion = db.define(
  "discussion",
  {
    discussion_id: {
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
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "student",
        key: "student_id",
      },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [5, 200],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 2000],
      },
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    reply_count: {
      type: DataTypes.INTEGER,
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

Discussion.associate = (models) => {
  Discussion.belongsTo(models.Course, {
    foreignKey: "course_id",
  });
  Discussion.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
  Discussion.hasMany(models.Reply, {
    foreignKey: "discussion_id",
    onDelete: "CASCADE",
  });
};
