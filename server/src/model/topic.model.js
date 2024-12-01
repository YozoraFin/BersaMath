import db from "../config/db";
import { DataTypes } from "sequelize";

export const Topic = db.define(
  "topic",
  {
    topic_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [3, 100],
        }
    },
    description: {
        type: DataTypes.TEXT(500),
        allowNull: true,
        validate: {
            len: [10, 500],
        }
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Topic.associate = (models) => {
  Topic.hasMany(models.Course, {
    foreignKey: "topic_id",
    onDelete: "CASCADE",
  });
};
