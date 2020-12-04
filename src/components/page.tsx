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
import { Stream } from "./stream";
import { StreamButton } from "./stream_button";
import {
  copyToClipboard,
  getStreamerURL,
  getEmptyMediaStream,
} from "../lib/helpers";
import Peer from "peerjs";

type PageProps = {
  peer: Peer;
  streamerID: string | null;
};

const Page: FunctionComponent<PageProps> = ({ peer, streamerID }) => {
  const { id } = peer;
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  console.log(id, streamerID);

  peer.on("call", (mediaConnection) => {
    mediaConnection.answer(stream);
    mediaConnection.on("close", () => {});
  });

  useEffect(() => {
    if (streamerID) {
      const mediaConnection = peer.call(streamerID, getEmptyMediaStream());
      mediaConnection.on("stream", (stream) => {
        setStream(stream);
      });
      mediaConnection.on("close", () => {
        stopStream();
      });
    }
  }, [peer, streamerID]);

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
  const streamButtonProps = { stream, startStream, stopStream };
  return (
    <div id="page">
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="IBM Platform Name">
              <HeaderName href="#" prefix="Ice">
                Cream
              </HeaderName>
              <HeaderNavigation aria-label="Ice"></HeaderNavigation>
              <HeaderGlobalBar>
                <StreamButton {...streamButtonProps}></StreamButton>
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
