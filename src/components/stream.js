import videojs from "video.js";
import { FunctionComponent, useState, useEffect, useRef } from "react";

const videoSrc = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
const videoJSOptions = {
  autoplay: "muted",
  controls: true,
  userActions: { hotkeys: true },
  controlBar: {
    // fullscreenToggle: false,
    progressControl: false,
    remainingTimeDisplay: false,
  },
};

const Stream = () => {
  const videoPlayerRef = useRef(null); // Instead of ID
  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc);
        console.log(player);
      });

      return () => {
        player.dispose();
      };
    }

    return () => {};
  });

  return (
    <div data-vjs-player>
      <video ref={videoPlayerRef} className="video-js vjs-fill"></video>
    </div>
  );
};

export { Stream };
