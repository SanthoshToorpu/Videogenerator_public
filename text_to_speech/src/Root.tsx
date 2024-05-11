import { Composition } from "remotion";
import { HelloWorld, mySchema } from "./HelloWorld";
import { getTTSFromServer1 } from "./lib/client-utils";
import { waitForNoInput } from "./debounce";
// import axios from "axios";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const RemotionRoot: React.FC = () => {
  const FPS = 30;

  let dialogue = [
    `Namaskar {Customers_Name}! I'm {Executive_Name} from {{_Name}, your trusted insurance provider. Thank you for choosing us to protect what matters most to you.`,
    `Your {Policy_Name} (Policy ID: {Policy_ID}) offers comprehensive coverage tailored to your needs, with a tenure of {Policy_Tenure} and a premium of {Policy_Premium}, ensuring your peace of mind.`,
    `Rest assured, {Customers_Name}, your {Policy_Name} (Policy ID: {Policy_ID}) is backed by {Company_Name}'s solid reputation and expertise, fully licensed and regulated for transparency and reliability.`,
    `Our policy specializes in personalized service, addressing your unique needs, from homeowners to business owners, with tailored solutions. Your {Policy_Name} (Policy ID: {Policy_ID}) covers accidents, disasters, and medical expenses, with a simple claims registration process via our website or dedicated claims team.`,
    `For questions or assistance, reach us by phone, email, or visit our branches, where our friendly customer service team is ready to support you.`,
    `Thank you, {Customers_Name}, for choosing us; your satisfaction is our priority. Let's ensure your {Policy_Name} serves you well.`,
  ];

  return (
    <div>
      @ts-ignore
      <Composition
        id="HelloWorld"
        schema={mySchema}
        component={HelloWorld}
        durationInFrames={300}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          dialogue: dialogue,
          titleColor: "#2E8AEA",
          voice: "Woman 1 (US)",
          pitch: 0,
          speakingRate: 1,
          audioUrls: [],
          durations: [],
          cumulativeDuration: 0,
        }}
        calculateMetadata={async ({ props, abortSignal }) => {
          await waitForNoInput(abortSignal, 1000);
          // const dialogueresponse = await axios.get(
          //   "http://localhost:3001/dialogues"
          // );
          // const firstDialoguesArray = dialogueresponse.data[1].dialogues;

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
              // dialogue: firstDialoguesArray,
            },
            durationInFrames: 30 + cumulativeDuration,
          };
        }}
      />
    </div>
  );
};
