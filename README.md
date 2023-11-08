# Varthak_Technology_Assignment

It is a user management and book tracking system with user registration, authentication, and book creation/viewing. It uses TypeScript, Express.js and MongoDB. Middleware components ensure secure access and logging.

## Features

- **Description**: Allows users to register an account with their username, email, and password. Users can also specify their roles (default is 'CREATOR') during registration.
- **Authentication**: Registration requires an authenticated user to have the 'CREATOR' role.
- **Validation**: Validates input data using Joi to ensure correctness.
- **Hashing**: The user's password is securely hashed using bcrypt.
- **Existing User Check**: Verifies if the email already exists in the database to prevent duplicates.
- **Response**: Returns a success message for successful registration and appropriate error messages for invalid or duplicate registration.
- **Request Logging**: All incoming requests are logged, including method, URL, and response time. These logs are written to a file for auditing and monitoring purposes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**: Make sure you have Node.js and npm (Node Package Manager) installed. You can download them from [nodejs.org](https://nodejs.org/).

- **MongoDB**: You should have a MongoDB database instance set up. You can install MongoDB locally or use a cloud-based solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/Ashik0101/Varthak_Technology_Assignment
   ```

2. **Change your working directory to the project folder:**

   ```shell
   cd Varthak_Technology_Assignment
   ```

3. **Install the required dependencies:**

   ```shell
   npm install
   ```

4. **Environment Variables:**
   Create an `.env` file in your project's root directory and add the following environment variables:

   ```shell
    PORT=4002
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the application:**

   ```shell
   npm start
   or
   npm run dev
   ```

## DEPLOYED LINK

```shell
https://alive-bracelet-worm.cyclic.app/
```

**Registration**

```shell
Method : POST
https://alive-bracelet-worm.cyclic.app/auth/register
```

**Login**

```shell
Method : POST
https://alive-bracelet-worm.cyclic.app/auth/login
```

**Create Book**

```shell
Method : POST
https://alive-bracelet-worm.cyclic.app/books
```

**Get All Books of a particular user**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books
```

**Get All Books (Admin)**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books/all
```

**Get all books created by a particular user more than 10 minutes ago**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books?old=1
```

**Get all books created by a particular user in the last 10 minutes**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books?new=1
```

**Get all books created more than 10 minutes ago**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books/all?old=1
```

**Get all books created in the last 10 minutes**

```shell
Method : GET
https://alive-bracelet-worm.cyclic.app/books/all?new=1
```

## POSTMAN DOCUMENTATION

Check the APIs using Postman Agent by clicking the link below

***https://documenter.getpostman.com/view/24841434/2s9YXh4h1W#8135cd89-1c72-40cc-8599-aa7f60534878***
