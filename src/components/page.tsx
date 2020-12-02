import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";
import "./page.scss";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import { Recording20 } from "@carbon/icons-react";
import { Stream } from "./stream";
import { copyToClipboard, getStreamerURL } from "../lib/helpers";

const Page: FunctionComponent = (props: any) => {
  const { id } = props;
  const [stream, setStream] = useState(undefined);

  const startStream = async () => {
    // Audio suggestions: https://stackoverflow.com/questions/46063374/is-it-really-possible-for-webrtc-to-stream-high-quality-audio-without-noise
    const options = {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: 60,
      },
      audio: {
        autoGainControl: false,
        channelCount: 2,
        echoCancellation: false,
        latency: 0,
        noiseSuppression: false,
        sampleRate: 48000,
        sampleSize: 16,
      },
    };

    try {
      const mediaDevices = navigator.mediaDevices as any;
      const stream = await mediaDevices.getDisplayMedia(options);
      setStream(stream);
      const streamerURL = getStreamerURL(id);
      console.log(streamerURL);
      copyToClipboard(streamerURL);
    } catch (e) {
      console.log("Error on starting stream: ", e);
    }
  };

  return (
    <div id="page">
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="IBM Platform Name">
              <HeaderName href="#" prefix="Stream">
                Share
              </HeaderName>
              <HeaderNavigation aria-label="Stream"></HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  id="record_icon"
                  aria-label="Logout"
                  onClick={startStream}
                >
                  <Recording20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          </>
        )}
      />

      <div id="stream_container">
        <Stream></Stream>
      </div>
    </div>
  );
};

export { Page };
