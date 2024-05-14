```markdown
# Text-to-Speech Video Generator

## Project Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SanthoshToorpu/Videogenerator_public.git
   ```

2. **Update MongoDB and OpenAI URLs:**
   - Navigate to the `server` folder.
   - Update MongoDB URL and OpenAI key in the `server.js` file.

3. **Create a Service Account JSON:**
   - Create a `serviceaccount.json` file in the root of the `text_to_speech` directory.
   - Use the following template and replace the values with your Google Cloud Platform service account details:
     ```json
     {
       "type": "service_account",
       "project_id": "your-project-id",
       "private_key_id": "your-private-key-id",
       "private_key": "your-private-key",
       "client_email": "your-client-email",
       "client_id": "your-client-id",
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
       "client_x509_cert_url": "your-client-x509-cert-url"
     }
     ```

4. **Create `.env` File:**
   - Create a `.env` file in the root of the `text_to_speech` directory.
   - Add the following environment variables:
     ```dotenv
     SERVER_PORT=5050
     FIREBASE_API_KEY=your-firebase-api-key
     FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     FIREBASE_PROJECT_ID=your-firebase-project-id
     FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     FIREBASE_APP_ID=your-firebase-app-id
     GOOGLE_APPLICATION_CREDENTIALS="serviceaccount.json"
     ```

5. **Start the Server:**
   - Navigate to the `server` directory.
   - Run the server using Node.js:
     ```bash
     node server.js
     ```

6. **Start the Text-to-Speech App:**
   - Navigate to the `text_to_speech` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the app:
     ```bash
     npm start
     ```

7. **Bulk Video Generation:**
   - For bulk video generation, run the `render.ts` script using `ts-node` (install from npm).

## Additional Notes

- Ensure to refer to the Remotion documentation for details on the `calculateMetadata` function and the render script.
- For more information, please refer to the [Remotion GTTS Template](https://github.com/thecmdrunner/remotion-gtts-template) repository.
```
