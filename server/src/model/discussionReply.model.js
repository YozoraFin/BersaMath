import db from "../config/db";
import { DataTypes } from "sequelize";

export const Reply = db.define(
  "discussion_reply",
  {
    reply_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discussion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "course_discussion",
        key: "discussion_id",
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Reply.associate = (models) => {
  Reply.belongsTo(models.Discussion, {
    foreignKey: "discussion_id",
  });
  Reply.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
};
