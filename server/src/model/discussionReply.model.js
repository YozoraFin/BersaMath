import db from "../config/db";
import { DataTypes } from "sequelize";

const DiscussionReply = db.define(
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

Reply.associate = (models) => {
  Reply.belongsTo(models.Discussion, {
    foreignKey: "discussion_id",
  });
  Reply.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
};

export { DiscussionReply };
