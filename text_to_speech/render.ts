import { selectComposition, renderMedia } from "@remotion/renderer";
import { webpackOverride } from "./webpack-override";
import { bundle } from "@remotion/bundler";
import data from "./data-json"; 

const compositionId = "HelloWorld";


const renderfun = async () => {
  const bundleLocation = await bundle({
    entryPoint: "./src/index.ts",
    webpackOverride: webpackOverride,
  });
  
  for (const entry of data) {
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: entry,
    });
  
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: `out/${entry.name}.mp4`,
      inputProps: entry,
      onProgress: ({ progress }) => {
        console.log(`Rendering ${entry.name}: ${progress * 100}% complete`);
      },
    });
  }
}

renderfun();
