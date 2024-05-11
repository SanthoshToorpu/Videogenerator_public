const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongoDB = require('./db');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
connectToMongoDB();

// Define a schema for the dialogue data
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

// Create a model based on the schema
const Dialogue = mongoose.model('Dialogue', dialogueSchema, 'csvdata');

app.use(cors());


// Function to read and parse CSV file
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

    const dialogues = generateDialogues(data);

    csvData.push({
      customersName: data.Customers_Name,
      executiveName: data.Executive_Name,
      companyName: data.Company_Name,
      policyName: data.Policy_Name,
      policyId: data.Policy_ID,
      policyTenure: data.Policy_Tenure,
      policyPremium: data.Policy_Premium,
      dialogues: dialogues,
    });
  }

  return csvData;
};

// Function to generate dialogues from CSV data
const generateDialogues = (data) => {
  const dialogues = [
    `Namaskar ${data.Customers_Name}! I'm ${data.Executive_Name} from ${data.Company_Name}, your trusted insurance provider. Thank you for choosing us to protect what matters most to you.`,
    `Your ${data.Policy_Name} (Policy ID: ${data.Policy_ID}) offers comprehensive coverage tailored to your needs, with a tenure of ${data.Policy_Tenure} and a premium of ${data.Policy_Premium}, ensuring your peace of mind.`,
  `Rest assured, ${data.Customers_Name}, your ${data.Policy_Name} (Policy ID: ${data.Policy_ID}) is backed by ${data.Company_Name}'s solid reputation and expertise, fully licensed and regulated for transparency and reliability.`,
  `Our policy specializes in personalized service, addressing your unique needs, from homeowners to business owners, with tailored solutions. Your ${data.Policy_Name} (Policy ID: ${data.Policy_ID}) covers accidents, disasters, and medical expenses, with a simple claims registration process via our website or dedicated claims team.`,
  `For questions or assistance, reach us by phone, email, or visit our branches, where our friendly customer service team is ready to support you.`,
  `Thank you, ${data.Customers_Name}, for choosing us; your satisfaction is our priority. Let's ensure your ${data.Policy_Name} serves you well.`
  ];

  return dialogues;
};

// Endpoint to handle file upload
app.post('/upload', upload.single('csvFile'), async (req, res) => {
  // Check if file was provided
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Read uploaded file
  const filePath = req.file.path;

  // Parse CSV file
  const parsedData = readAndParseCSV(filePath);

  // Delete temporary file after parsing
  fs.unlinkSync(filePath);

  // Save parsed data to MongoDB
  await Dialogue.insertMany(parsedData);
  res.json({ message: 'Data saved to MongoDB' });
});

// GET endpoint to retrieve the first dialogue for a customer
app.get('/dialogues/:customersName', async (req, res) => {
  try {
    const { customersName } = req.params;
    const dialogue = await Dialogue.findOne({ customersName }, { dialogues: { $slice: 1 } });

    if (!dialogue) {
      return res.status(404).json({ error: 'Dialogue not found' });
    }

    res.json({ dialogue: dialogue.dialogues[0] });
  } catch (error) {
    console.error('Error retrieving dialogue:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all dialogues
app.get('/dialogues', async (req, res) => {
  try {
    const dialogues = await Dialogue.find();
    res.json(dialogues);
  } catch (error) {
    console.error('Error retrieving dialogues:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});