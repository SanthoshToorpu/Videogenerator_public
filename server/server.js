const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongoDB = require('./db');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

connectToMongoDB();

const dialogueSchema = new mongoose.Schema({
  customersName: String,
  executiveName: String,
  companyName: String,
  policyName: String,
  policyId: String,
  policyTenure: String,
  policyPremium: String,
  dialogues: [String],
});

const Dialogue = mongoose.model('Dialogue', dialogueSchema, 'csvdata');

app.use(cors());

const generateDialogues = async (data) => {
  const dialogues = [];
  const openai = require('openai')(`${process.env.OPENAI_API_KEY}`);
  const prompt = `Generate a dialogues array of 6 dialogues for an insurance claim explanatory video where each dialogue should be in such a way that a digital representative is explaining the whole thing to a customer. The customer's name is ${data.Customers_Name}. The executive's name is ${data.Executive_Name}. The company's name is ${data.Company_Name}. The policy's name is ${data.Policy_Name}. The policy ID is ${data.Policy_ID}. The policy tenure is ${data.Policy_Tenure}. The policy premium is ${data.Policy_Premium}.`;

  try {
    const response = await openai.complete({
      engine: 'davinci',
      prompt,
      maxTokens: 300,
      temperature: 0.7,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      n: 6
    });

    const generatedDialogues = response.data.choices.map(choice => choice.text.trim());
    dialogues.push(...generatedDialogues);
  } catch (error) {
    console.error('Error generating dialogues:', error);
    return null;
  }

  return dialogues;
};

app.post('/upload', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;

  const parsedData = readAndParseCSV(filePath);

  for (const data of parsedData) {
    const dialogues = await generateDialogues(data);
    if (dialogues) {
      data.dialogues = dialogues;
    } else {
      return res.status(500).json({ error: 'Failed to generate dialogues' });
    }
  }

  fs.unlinkSync(filePath);

  await Dialogue.insertMany(parsedData);
  res.json({ message: 'Data saved to MongoDB' });
});

const readAndParseCSV = (filePath) => {
  const csvData = [];
  const csvFilePath = path.join(__dirname, filePath);
  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = fileContent.trim().split('\n');
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const data = {};

    for (let j = 0; j < headers.length; j++) {
      data[headers[j]] = currentLine[j];
    }

    csvData.push(data);
  }

  return csvData;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
