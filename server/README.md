# Prompt-Based Video Generator Server

This server powers a prompt-based video generator using Express.js, Multer, Mongoose, OpenAI's GPT, and Firebase Storage.

## Features

- Parses CSV files, generates dynamic dialogues using GPT, and stores them in MongoDB.
- Provides an endpoint for uploading CSV files and triggering dialogue generation.
- Runs on port 3001 by default.

## Usage

1. Upload a CSV file to `/upload`.
2. The server generates dialogues based on the data and stores them in MongoDB.
3. Access the dialogues via the database.

## Tech Stack

- Express.js
- Multer
- MongoDB with Mongoose
- OpenAI's GPT
- Firebase Storage

⚠️ **Before running the server:**
  - Ensure MongoDB is running and set the connection URL in `db.js`.
  - Obtain an OpenAI API key and set it in the `.env` file as `OPENAI_API_KEY`.

Developed by Santhosh and Abhijth.
