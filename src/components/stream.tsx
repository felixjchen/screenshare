import videojs from "video.js";
import { FunctionComponent, useState, useEffect, useRef } from "react";

const videoJSOptions = {
  autoplay: true,
  controls: true,
  inactivityTimeout: 0,
  userActions: { hotkeys: true },
  controlBar: {
    progressControl: false,
    remainingTimeDisplay: false,
  },
  bigPlayButton: false,
} as any;

type StreamProps = {
  stream: MediaStream | undefined;
};

const Stream: FunctionComponent<StreamProps> = ({ stream }) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        // const ButtonClass = videojs.getComponent("Button");
        // const RecordButtonClass = videojs.extend(ButtonClass, {
        //   constructor: function () {
        //     ButtonClass.call(this, player);
        //   }, // notice the comma

        //   handleClick: function () {
        //     // Do your stuff
        //     console.log(1);
        //   },
        // });
        // const RecordButton = player.controlBar.addChild(
        //   new RecordButtonClass()
        // );

        // RecordButton.addClass("vjs-record-button");
        // RecordButton.el_.firstChild.classList.add(
        //   "vjs-icon-circle-inner-circle"
        // );

        // Test video
        // console.log(stream);
        console.log();
        if (stream !== undefined) {
          const videoElement: any = player.tech().el();
          videoElement.srcObject = stream;
          console.log(player.tech());
        }
        console.log(player);
      });
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
