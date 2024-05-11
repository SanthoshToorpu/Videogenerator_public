import { Composition } from "remotion";
import { HelloWorld, mySchema } from "./HelloWorld";
import { getTTSFromServer1 } from "./lib/client-utils";
import { waitForNoInput } from "./debounce";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { useEffect, useState } from "react";
import axios from "axios";



export const RemotionRoot: React.FC = () => { 
    
  const [dialoguesArray, setDialoguesArray] = useState<string[][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/dialogues');
                const fetchedDialoguesArray = response.data.map((item: any) => item.dialogues);
                setDialoguesArray(fetchedDialoguesArray);
                console.log(fetchedDialoguesArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
      }, []);


  const FPS = 30;

  return (
    <div>
      <Composition
        id="HelloWorld"
        schema={mySchema}
        // @ts-ignore
        component={HelloWorld}
        durationInFrames={300}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          dialogue: dialoguesArray[0],
          titleColor: "#2E8AEA",
          voice: "Man 1 (US)",
          pitch: 0,
          speakingRate: 1,
          audioUrls: [],
          durations: [],
          cumulativeDuration: 0,
        }}
        calculateMetadata={async ({ props, abortSignal }) => {
          await waitForNoInput(abortSignal, 1000);

          const audioUrls: string[] = [];
          const durations: number[] = [];
          let cumulativeDuration = props.cumulativeDuration;

          for (const dialogue of props.dialogue) {
            const audioUrl = await getTTSFromServer1({ ...props, dialogue });
            const audioDurationInSeconds = await getAudioDurationInSeconds(audioUrl);
            const calculatedVideoDuration = Math.ceil(audioDurationInSeconds * FPS);

            durations.push(calculatedVideoDuration);
            audioUrls.push(audioUrl);
            cumulativeDuration += calculatedVideoDuration;
          }
          return {
            props: {
              ...props,
              audioUrls,
              durations,
              cumulativeDuration,
            },
            durationInFrames: 30 + cumulativeDuration,
          };
        }}
      />
    </div>
  );
};
