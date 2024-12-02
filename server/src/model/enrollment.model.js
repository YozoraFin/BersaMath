import db from "../config/db";
import { DataTypes } from "sequelize";

const Enrollment = db.define(
  "enrollment",
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "student",
        key: "student_id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "course",
        key: "course_id",
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "aktif",
      validate: {
        isIn: [["aktif", "selesai", "keluar"]],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Enrollment.associate = (models) => {
  Enrollment.belongsTo(models.Student, {
    foreignKey: "student_id",
  });
  Enrollment.belongsTo(models.Course, {
    foreignKey: "course_id",
  });
  Enrollment.hasMany(models.Progress, {
    foreignKey: "enrollment_id",
    onDelete: "CASCADE",
  });
};

export {Enrollment}