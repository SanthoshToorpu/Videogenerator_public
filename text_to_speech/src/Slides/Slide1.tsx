// Slide1.tsx
import { Audio, Video, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface Slide1Props {
  dialogue: string;
  titleColor: string;
  voice: "Man 1 (US)" | "Man 2 (US)" | "Woman 1 (US)" | "Woman 2 (US)";
  pitch: number;
  speakingRate: number;
  audioUrl: string; // Updated prop for audio URL
}

export const Slide1: React.FC<Slide1Props> = (props) => {
  const text1 = props.dialogue;
  const videoConfig = useVideoConfig();
  const realFrame = useCurrentFrame();
  const frameAdjustedForSpeakingRate = realFrame * 1;
  const videoSrc = staticFile('/myvideo.mp4');
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Audio
        id="TTS Audio"
        about="TTS Audio"
        src={props.audioUrl} // Use the provided audio URL
      />
      <div
        style={{
          width: "66.66%", // Two-thirds of the screen
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginLeft: "200px",
        }}
      >
        <h1
          style={{
            fontFamily: "SF Pro Text, Helvetica, Arial",
            fontSize: 24, // Smaller font size
            marginBottom: 20,
          }}
        >
          {text1.split(" ").map((t, i) => (
            <span
              key={t}
              style={{
                marginLeft: 10,
                marginRight: 10,
                transform: `scale(${spring({
                  fps: videoConfig.fps,
                  frame: frameAdjustedForSpeakingRate - i * 10, // Increased delay
                  config: {
                    damping: 100,
                    stiffness: 200,
                    mass: 0.5,
                  },
                })}`,
                display: "inline-block",
              }}
            >
              {t}
            </span>
          ))}
        </h1>
      </div>
      <div
        style={{
          width: "33.33%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Video loop src={videoSrc} />
      </div>
    </div>
  );
};
