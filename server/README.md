# BersaMath - Education Platform

An online learning platform focused on mathematics education, connecting teachers and students.

## Features

- Teacher and student authentication
- Course management
- Lesson creation with various content types
- Practice assignments and grading
- Real-time discussions
- Progress tracking

## Tech Stack

- Node.js
- Express.js
- MySQL with Sequelize ORM
- JWT Authentication
- Nodemailer

## Installation

```bash
# Clone repository
git clone https://github.com/YozoraFin/BersaMath.git

# Install dependencies
cd bersamath
npm install

# Configure environment variables
cp .env.example .env 
```

## Environment Variables
`NODE_ENV=development`

`PORT=5000`

`SUPER_TEACHER_SECURE_CODE=your_secret_key`

`ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com`

### Database

`DB=bersamath`

`DB_USERNAME=your_username`

`DB_PASSWORD=your_password`

`DB_HOST=localhost`

`DB_PORT=3306`

### JWT

`JWT_SECRET_KEY=your_jwt_secret`

`JWT_REFRESH_SECRET_KEY=your_refresh_secret`

`EMAIL_SECRET_KEY=your_email_secret`

`RESET_SECRET_KEY=your_reset_secret`

### Email

`EMAIL_USER=your_email@gmail.com`

`EMAIL_APP_PASSWORD=your_app_password`

`CLIENT_URL=http://localhost:3000`

### Testing Email
- All emails will be captured by Ethereal
- View them at https://ethereal.email/messages
- Login using your Ethereal credentials
### Troubleshooting
- Make sure SMTP credentials are correct
- Check spam folder for verification emails
- Enable "Less secure app access" if using Gmail

```bash
# Generate secret keys (in terminal)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Development
```bash
# Run development server
npm run dev

# Run tests
npm test
```

## API Documentation
Detailed API documentation can be found in API.md