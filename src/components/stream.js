import videojs from "video.js";
import { FunctionComponent, useState, useEffect, useRef } from "react";

const videoJSOptions = {
  autoplay: "muted",
  controls: true,
  inactivityTimeout: 0,
  userActions: { hotkeys: true },
  controlBar: {
    progressControl: false,
    remainingTimeDisplay: false,
  },
};

const Stream = () => {
  const videoPlayerRef = useRef(null);
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
        player.src("https://media.w3.org/2010/05/sintel/trailer_hd.mp4");

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
