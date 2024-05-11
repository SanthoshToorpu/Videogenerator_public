import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Slide1 } from "./Slides/Slide1";
import { RequestMetadata } from "./lib/interfaces";
import { useState, useEffect } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { z, ZodType } from "zod";
import { zColor } from "@remotion/zod-types";
import { getTTSFromServer1 } from "./lib/client-utils";

// Define the schema for the component props
export const mySchema = z.object({
  dialogue: z.array(z.string()),
  titleColor: zColor(),
  voice: z.enum(["Man 1 (US)", "Man 2 (US)", "Woman 1 (US)", "Woman 2 (US)"]),
  pitch: z.number().min(-20).max(20),
  speakingRate: z.number().min(0.25).max(4),
  audioUrls: z.array(z.string()), // Array of audio URLs
  durations: z.array(z.number()), // Array of durations
  cumulativeDuration: z.number(), // Cumulative duration
});

// Define the type for props that HelloWorld receives
type HelloWorldProps = RequestMetadata & ZodType<typeof mySchema>;

export const HelloWorld: React.FC<HelloWorldProps> = (props) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const opacity = interpolate(
    frame,
    [videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const transitionStart = 0;

  // Calculate transition starts for each sequence
  const transitionStarts: number[] = [];
  let cumulativeDuration = transitionStart;
  for (const duration of props.durations) {
    transitionStarts.push(cumulativeDuration);
    cumulativeDuration += duration;
  }

  return (
    <AbsoluteFill
      style={{
        flex: 1,
        background: "white",
        position: "relative",
      }}
    >
      <div style={{ opacity }}>
        {props.dialogue.map((dialogue: string, index: number) => (
          <Sequence
            key={index}
            from={transitionStarts[index]}
            durationInFrames={props.durations[index]}
          >
            <Slide1
              dialogue={dialogue}
              titleColor={props.titleColor}
              voice={props.voice}
              pitch={props.pitch}
              speakingRate={props.speakingRate}
              audioUrl={props.audioUrls[index]} // Pass audio URL as prop
            />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
