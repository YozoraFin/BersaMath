## API Reference

### Authentication
#### Super Teacher Registration
```http
POST /api/v1/auth/register-superteacher
Content-Type: application/json
```
#### Request Body:
```json
{
    "name": "John Doe",
    "email": "superteacher.bersamath@mail.com",
    "password": "admin12345",
    "phone": "085512345678",
    "bio": "ini bio super teacher",
    "gender": "Pria",
    "registrationCode": "140234cfc5b44971af0e63d1e1e1d9329de8b45a25ae72f0aeea6554cbde3097"
}
```
#### Response (201):
```json
{
  "success": true,
  "message": "Super teacher registration successful",
  "data": {
    "teacher": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "super_teacher"
    },
    "tokens": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

#### Teacher Registration
```http
POST /api/v1/auth/teacher/register
Content-Type: application/json
```
#### Request Body:
```json
{
    "name": "John Doe",
    "email": "superteacher.bersamath@mail.com",
    "password": "admin12345",
    "phone": "085512345678",
    "bio": "ini bio super teacher",
    "gender": "Pria"
}
```
#### Response (201):
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email",
  "data": {
    "teacher": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

#### Teacher Login
```http
POST /api/v1/auth/teacher/register
Content-Type: application/json
```
#### Request Body
```json
{
    "identifier": "jane@example.com",
    "password": "Secret123!"
}
```

#### Response (200):
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email",
  "data": {
    "teacher": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

#### Teacher Logout
```http
POST /api/v1/teachers/logout
Authorization: Bearer {token}
```
#### Response 200:
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

#### Student Registration

```http
POST /api/v1/auth/student/register
Content-Type: application/json
```
#### Request Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "admin12345",
    "phone": "085512345678",
    "bio": "ini bio super teacher",
    "gender": "Pria",
    "grade_level": 11
}
```
#### Response (201):
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email",
  "data": {
    "student": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

#### Student Login
```http
POST /api/v1/auth/student/register
Content-Type: application/json
```
#### Request Body
```json
{
    "identifier": "jane@example.com",
    "password": "Secret123!"
}
```

#### Response (200):
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email",
  "data": {
    "student": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
    },
    "tokens": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

#### Student Logout
```http
POST /api/v1/student/logout
Authorization: Bearer {token}
```
#### Response 200:
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

### Teacher Management
#### Get All Teachers
```http
GET /api/v1/teachers?page=1&limit=10&search=john&role=teacher&sort=created_at&order=DESC
```
#### Response (200):
```json
{
    "success": true,
    "message": "Teachers fetched successfully",
    "data": [
        {
            "teacher_id": 1,
            "name": "John Smith",
            "email": "john@example.com",
            "gender": "male",
            "profile_pict": "uploads/profile/teacher-123.jpg"
        }
    ],
    "metadata": {
        "total": 50,
        "page": 1,
        "limit": 10,
        "pages": 5
    }
}
```

#### Get Teacher By Id
```http
GET /api/v1/teachers/{id}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Teacher fetched successfully",
    "data": {
        "teacher_id": 1,
        "name": "John Smith",
        "email": "john@example.com",
        "gender": "male",
        "profile_pict": "uploads/profile/teacher-123.jpg",
        "bio": "Math teacher with 5 years experience"
    }
}
```

#### Update Teacher Profile
```http
PUT /api/v1/teachers/update-profile
Authorization: Bearer {token}
Content-Type: multipart/form-data
```
#### Request Body:
```json
{
    "name": "John Smith",
    "phone": "081234567890",
    "bio": "Math teacher with 5 years experience",
    "gender": "male",
    "profile_pict": [File]
}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "teacher_id": 1,
        "name": "John Smith",
        "phone": "081234567890",
        "bio": "Math teacher with 5 years experience",
        "gender": "male",
        "profile_pict": "uploads/profile/teacher-123.jpg"
    }
}
```

### Student Management
#### Get All Students
```http
GET /api/v1/students?page=1&limit=10&search=john&grade_level=10&sort=created_at&order=DESC
```
#### Response (200):
```json
{
    "success": true,
    "message": "Students fetched successfully",
    "data": [
        {
            "student_id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "grade_level": "10",
            "profile_pict": "uploads/profile/student-123.jpg"
        }
    ],
    "metadata": {
        "total": 100,
        "page": 1,
        "limit": 10,
        "pages": 10
    }
}
```

#### Get Student By Id
```http
GET /api/v1/student/{id}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Student fetched successfully",
    "data": {
        "student_id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "081234567890",
        "grade_level": "10",
        "gender": "male",
        "bio": "High school student",
        "profile_pict": "uploads/profile/student-123.jpg"
    }
}
```

#### Update Student Profile
```http
PUT /api/v1/student/update-profile
Authorization: Bearer {token}
Content-Type: multipart/form-data
```
#### Request Body:
```json
{
    "name": "John Doe",
    "phone": "081234567890",
    "grade_level": "10",
    "gender": "male",
    "bio": "High school student",
    "profile_pict": [File]
}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "student_id": 1,
        "name": "John Doe",
        "phone": "081234567890",
        "grade_level": "10",
        "gender": "male",
        "bio": "High school student",
        "profile_pict": "uploads/profile/student-123.jpg"
    }
}
```

### Course Management
#### Create Topic (super teacher only)
```http
POST /api/v1/topic/create
Authorization: Bearer {token}
Content-Type: application/json
```
#### Request Body:
```json
{
    "title": "Mathematics",
    "description": "Basic mathematical concepts"
}
```
#### Response (201)
```json
{
    "success": true,
    "message": "Topic created successfully",
    "data": {
        "topic_id": 1,
        "title": "Mathematics",
        "description": "Basic mathematical concepts"
    }
}
```

#### Get All Topics
```http
GET /api/v1/topic?page=1&limit=10&search=math
Authorization: Bearer {token}
```
#### Response (200)
```json
{
    "success": true,
    "message": "Topics fetched successfully",
    "data": [
        {
            "topic_id": 1,
            "title": "Mathematics",
            "description": "Basic mathematical concepts",
            "created_at": "2024-03-20T10:00:00Z"
        }
    ],
    "metadata": {
        "total": 10,
        "page": 1,
        "limit": 10,
        "pages": 1
    }
}
```

#### Get Topic By Id
```http
GET /api/v1/topic/{id}
Authorization: Bearer {token}
```
#### Response (200)
```json
{
    "success": true,
    "message": "Topic fetched successfully",
    "data": {
        "topic_id": 1,
        "title": "Mathematics",
        "description": "Basic mathematical concepts",
        "created_at": "2024-03-20T10:00:00Z",
        "updated_at": "2024-03-20T10:00:00Z"
    }
}
```

#### Update Topic (super teacher only)
```http
PUT /api/v1/topic/update/{id}
Authorization: Bearer {token}
Content-Type: application/json
```
#### Request Body:
```json
{
    "title": "Advanced Mathematics",
    "description": "Advanced mathematical concepts"
}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Topic updated successfully",
    "data": {
        "topic_id": 1,
        "title": "Advanced Mathematics",
        "description": "Advanced mathematical concepts"
    }
}
```

#### Delete Topic (super teacher only)
```http
DELETE /api/v1/topic/delete/{id}
Authorization: Bearer {token}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Topic deleted successfully"
}
```

#### Create Course (super teacher only)
```http
POST /api/v1/course/create
Authorization: Bearer {token}
Content-Type: multipart/form-data
```
#### Request Body:
```json
{
  "title": "Course percobaan ke berapa gak tau",
  "description": "percobaan course jehehe",
  "difficulty": "basic",
  "topic_id": 1,
  "thumbnail": [file]
}
```
#### Response (201)
```json
{
    "success": true,
    "message": "Course created successfully",
    "data": {
        "course_id": 1,
        "title": "Basic Algebra",
        "description": "Introduction to algebraic concepts",
        "difficulty": "basic",
        "thumbnail": "uploads/course/thumbnail-123.jpg",
        "topic_id": 1
    }
}
```

#### Get All Courses
```http
GET /api/v1/course?page=1&limit=10&search=algebra&topic_id=1&difficulty=basic&sort=created_at&order=DESC
```
#### Response (200):
```json
{
    "success": true,
    "message": "Courses fetched successfully",
    "data": [
        {
            "course_id": 1,
            "title": "Basic Algebra",
            "description": "Introduction to algebraic concepts",
            "difficulty": "basic",
            "thumbnail": "uploads/course/thumbnail-123.jpg",
            "topic": {
                "topic_id": 1,
                "title": "Algebra"
            }
        }
    ],
    "metadata": {
        "total": 50,
        "page": 1,
        "limit": 10,
        "pages": 5
    }
}
```

#### Get Course By Id
```http
GET /api/v1/course/{id}
Authorization: Bearer {token}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Course fetched successfully",
    "data": {
        "course_id": 1,
        "title": "Basic Algebra",
        "description": "Introduction to algebraic concepts",
        "difficulty": "basic",
        "thumbnail": "uploads/course/thumbnail-123.jpg",
        "topic": {
            "topic_id": 1,
            "title": "Algebra"
        },
        "teachers": [
            {
                "teacher_id": 1,
                "name": "John Smith"
            }
        ]
    }
}
```

#### Update Course (super teacher only)
```http
POST /api/v1/course/create
Authorization: Bearer {token}
Content-Type: multipart/form-data
```
#### Request Body
```json
{
    "title": "Basic Algebra",
    "description": "Introduction to algebraic concepts",
    "difficulty": "basic",
    "topic_id": 1,
    "thumbnail": [File]
}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Course created successfully",
    "data": {
        "course_id": 1,
        "title": "Basic Algebra",
        "description": "Introduction to algebraic concepts",
        "difficulty": "basic",
        "thumbnail": "uploads/course/thumbnail-123.jpg",
        "topic_id": 1
    }
}
```

#### Delete Course (super teacher only)
```http
DELETE /api/v1/course/delete/{id}
Authorization: Bearer {token}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Course deleted successfully"
}
```

#### Add Teacher To Course (super teacher only)
```http
PUT /api/v1/course/{id}/add-teacher
Authorization: Bearer {token}
Content-Type: application/json
```
#### Request Body:
```json
{
    "teacher_id": [1, 2, 3]
}
```
#### Response (200):
```json
{
    "success": true,
    "message": "Teachers added to course successfully",
    "data": {
        "course_id": 1,
        "teachers": [
            {
                "teacher_id": 1,
                "name": "John Smith"
            }
        ]
    }
}
```

### Error Responses
#### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email"
    }
  ]
}
```

#### Authentication Error (401)
```json
{
  "success": false,
  "message": "Access token required"
}
```

#### Authorization Error (403)
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

#### Not Found Error (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details..."
}
```