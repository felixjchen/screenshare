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
  TooltipIcon,
} from "carbon-components-react";
import "./page.scss";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import { Recording20 } from "@carbon/icons-react";
import { Stream } from "./stream";
import { copyToClipboard, getStreamerURL } from "../lib/helpers";

type PageProps = {
  id: string;
  streamerID: string | null;
};

const Page: FunctionComponent<PageProps> = ({ id, streamerID }) => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

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
      const mediaDevices: any = navigator.mediaDevices;
      const stream: MediaStream = await mediaDevices.getDisplayMedia(options);
      setStream(stream);

      // On stream finish listener
      stream.getVideoTracks()[0].onended = () => {
        stopStream();
      };

      // Copy sharing link
      const streamerURL = getStreamerURL(id);
      copyToClipboard(streamerURL);
    } catch (e) {
      console.log("Error on starting stream: ", e);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
    setStream(undefined);
  };

  const streamProps = { stream };

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
                <TooltipIcon
                  tooltipText="Record and copy sharing link"
                  direction="bottom"
                  align="end"
                  onClick={startStream}
                >
                  <Recording20 id="record_icon" />
                </TooltipIcon>
              </HeaderGlobalBar>
            </Header>
          </>
        )}
      />

      <div id="stream_container">
        <Stream {...streamProps}></Stream>
      </div>
    </div>
  );
};

export { Page };
