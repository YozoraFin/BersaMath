## API Reference

### Authentication
#### Teacher Registration

```http
POST /api/v1/auth/register-superteacher
Content-Type: application/json
```

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name value |
| `email` | `string` | **Required**. Your email value |
| `password` | `string` | **Required**. Your password value |
| `phone` | `string` | **Required**. Your phone value |
| `bio` | `string` | **Required**. Your bio value |
| `gender` | `string` | **Required**. Your gender value |
| `registrationCode` | `string` | **Required**. Your registrationCode value |

```headers
Response (201):
```
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

```http
POST /api/v1/auth/teacher/register
Content-Type: application/json
```

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name value |
| `email` | `string` | **Required**. Your email value |
| `password` | `string` | **Required**. Your password value |
| `phone` | `string` | **Required**. Your phone value |
| `bio` | `string` | **Required**. Your bio value |
| `gender` | `string` | **Required**. Your gender value |

```json
Response (201):
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

#### Student Registration

```http
POST /api/v1/auth/student/register
Content-Type: application/json
```

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name value |
| `email` | `string` | **Required**. Your email value |
| `password` | `string` | **Required**. Your password value |
| `phone` | `string` | **Required**. Your phone value |
| `bio` | `string` | **Required**. Your bio value |
| `gender` | `string` | **Required**. Your gender value |
| `grade_level` | `string` | **Required**. Your grade_level value |

```json
Response (201):
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

### Course Management
#### Create Course

```http
POST /api/v1/auth/course/create
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Your title value |
| `description` | `string` | **Required**. Your description value |
| `difficulty` | `string` | **Required**. Your difficulty value |
| `topic_id` | `int` | **Required**. Your topic_id value |
| `thumbnail` | `json` | **Required**. Your thumbnail value |

```json
Response (201):
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "course_id": 1,
    "title": "Aljabar Dasar",
    "description": "Pembelajaran dasar aljabar",
    "difficulty": "basic",
    "thumbnail": "path/to/thumbnail.jpg"
  }
}
```

#### Create Lesson

```http
POST /api/v1/course/{course_id}/lesson/create
Authorization: Bearer {accessToken}
```
| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `int` | **Required**. Your course_id value |

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Your title value |
| `description` | `string` | **Required**. Your description value |
| `lesson_type` | `string` | **Required**. Your lesson_type value |

```json
Response (201):
{
  "success": true,
  "message": "Lesson created successfully",
  "data": {
    "lesson_id": 1,
    "title": "Pengenalan Variabel",
    "description": "Memahami konsep variabel dalam aljabar",
    "lesson_type": "teori",
    "sequence": 1
  }
}
```

#### Create Practice

```http
POST /api/v1/course/{course_id}/lesson/{lesson_id}/practice/create
Authorization: Bearer {accessToken}
```
| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `int` | **Required**. Your course_id value |
| `lesson_id` | `int` | **Required**. Your lesson_id value |

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `question` | `string` | **Required**. Your question value |
| `description` | `string` | **Required**. Your description value |
| `difficulty` | `string` | **Required**. Your difficulty value |
| `max_score` | `int` | **Required**. Your max_score value |
| `due_date` | `date` | **Required**. Your due_date value |

```json
Response (201):
{
  "success": true,
  "message": "Practice created successfully",
  "data": {
    "practice_id": 1,
    "question": "Selesaikan persamaan: 2x + 5 = 15",
    "difficulty": "basic",
    "max_score": 100,
    "due_date": "2024-04-01T23:59:59.999Z"
  }
}
```

#### Submit Practice

```http
POST /api/v1/course/{course_id}/lesson/{lesson_id}/practice/{practice_id}/submit
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```
| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `int` | **Required**. Your course_id value |
| `lesson_id` | `int` | **Required**. Your lesson_id value |
| `practice_id` | `int` | **Required**. Your practice_id value |

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `answer` | `string` | **Required**. Your answer value |
| `files` | `json` | **Required**. Your submission files value |

```json
Response (201):
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "submission_id": 1,
    "answer": "Langkah penyelesaian: ...",
    "files": ["path/to/file1.pdf", "path/to/file2.jpg"],
    "status": "submitted"
  }
}
```

#### Grade Submission

```http
PUT /api/v1/course/{course_id}/lesson/{lesson_id}/practice/{practice_id}/submission/{submission_id}/grade
Authorization: Bearer {accessToken}
```
| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `int` | **Required**. Your course_id value |
| `lesson_id` | `int` | **Required**. Your lesson_id value |
| `practice_id` | `int` | **Required**. Your practice_id value |
| `submission_id` | `int` | **Required**. Your submission_id value |

| Variabel | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `score` | `int` | **Required**. Your score value |
| `feedback` | `string` | **Required**. Your feedback value |

```json
Response (200):
{
  "success": true,
  "message": "Submission graded successfully",
  "data": {
    "submission_id": 1,
    "score": 85,
    "feedback": "Jawaban sudah baik dan lengkap...",
    "status": "graded"
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