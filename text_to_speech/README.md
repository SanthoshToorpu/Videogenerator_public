# Remotion Text-to-Speech Template

🎬 **Generate Videos with Text-to-Speech!** 🎙️

This template leverages [Remotion](https://www.remotion.dev/) for creating videos with text-to-speech capabilities using Google Cloud Platform and Firebase Storage.

## Features

- Utilizes Remotion's Visual Editing features.
- Incorporates Google Text-to-Speech APIs for audio generation.
- Integrates Firebase Storage for storing audio files.

## Setup

1. Create a [Firebase Project](https://console.firebase.google.com/).
2. Register your app in Firebase and copy the config credentials into `.env` (rename `.env.example`).
3. Enable storage and create a storage bucket.
4. Setup security rules for the storage bucket.
5. Enable Text-to-Speech API on [Google Cloud Platform](https://console.cloud.google.com/apis/library/texttospeech.googleapis.com).
6. Create credentials (service account) and download as `serviceaccount.json`, placing it in the project root.

⚠️ **Before running the server:**
   - Ensure you have created a `.env` file and added the Firebase config credentials.
   - Place the `serviceaccount.json` file in the project root.

## Example

Watch a sample video rendered using this template:

[![Sample Video](https://img.youtube.com/vi/ujB-F2BdIJ8/0.jpg)]

Click on the image above to watch the video.

## Getting Started

- **Root Component:** `src/Root.tsx` contains the `<Composition>` element.
- **Composition Element:** The `<Composition>` element orchestrates the video components.
- **HelloWorld Component:** `src/components/HelloWorld.tsx` is a sample component rendering a video.
- **Slides:** For now, there's a single file in `/slides/slide1`.

## Commands

#### Install Dependencies

```console
npm install
