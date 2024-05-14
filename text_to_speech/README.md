```markdown
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

Watch a sample video rendered using this template
<video controls width="100%">
  <source src="https://drive.google.com/file/d/1YfNcM_H6nMaS9A2QdkIwcJwu-KZx924f/view?usp=drive_link">
  Your browser does not support the video tag.
</video>


## Getting Started

- **Root Component:** `src/Root.tsx` contains the `<Composition>` element.
- **Composition Element:** The `<Composition>` element orchestrates the video components.
- **HelloWorld Component:** `src/components/HelloWorld.tsx` is a sample component rendering a video.
- **Slides:** For now, there's a single file in `/slides/slide1`.

## Commands

#### Install Dependencies

```console
npm install
```

#### Start Remotion Studio

```console
npm start
```

#### Render Video

```console
npm run build
```

#### Bulk Video Generation

For bulk generating videos, run the `render.ts` script using `ts-node` (install from npm).

```console
ts-node render.ts
```
run the render.ts in the root of text_to_speech not the src one
#### Upgrade Remotion

```console
npm run upgrade
```

## Issues

Found a bug? [File an issue here](https://github.com/thecmdrunner/remotion-gtts-template/issues/new).

## License

Note that for some entities, a company license is needed. Read [the terms here](https://github.com/thecmdrunner/remotion-gtts-template/blob/main/LICENSE.md).

---

For more details and to contribute, check out the [Remotion GTTS Template](https://github.com/thecmdrunner/remotion-gtts-template) repository.
```
