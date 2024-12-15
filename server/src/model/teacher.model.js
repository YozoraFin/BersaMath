import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Course } from "./course.model.js";

const Teacher = db.define(
  "teacher",
  {
    teacher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "course",
        key: "course_id",
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 100],
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [10, 15],
        is: /^[0-9]+$/,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["Pria", "Wanita"]],
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM("teacher", "super_teacher"),
      allowNull: false,
      defaultValue: "teacher",
    },
    profile_pict: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// relation here
// Teacher.hasMany(Course, {
//   foreignKey: "course_id",
//   onDelete: "CASCADE",
// });
// Course.belongsTo(Teacher, {
//   foreignKey: "course_id",
// });
Teacher.belongsTo(Course, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});
Course.hasMany(Teacher, {
  foreignKey: "course_id",
});

export {Teacher};
