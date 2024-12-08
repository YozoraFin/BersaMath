import db from "../config/db";
import { DataTypes } from "sequelize";

const Topic = db.define(
  "topic",
  {
    topic_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
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

Topic.associate = (models) => {
  Topic.hasMany(models.Course, {
    foreignKey: "topic_id",
    onDelete: "CASCADE",
  });
};

export { Topic };
