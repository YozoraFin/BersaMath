import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Student = db.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    grade_level: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["7", "8", "9", "10", "11", "12"]],
      },
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
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Student.associate = (models) => {
  Student.hasMany(models.Enrollment, {
    foreignKey: "student_id",
    onDelete: "CASCADE",
  });
  Student.hasMany(models.Submission, {
    foreignKey: "student_id",
    onDelete: "CASCADE",
  });
  Student.hasMany(models.Discussion, {
    foreignKey: "student_id",
    onDelete: "CASCADE",
  });
};

export { Student };
