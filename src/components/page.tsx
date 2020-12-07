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
import { Control } from "./control";
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
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [id, setID] = useState<string>("");

  peer.on("open", (id) => {
    setID(id);
    if (streamerID) {
      const mediaConnection = peer.call(streamerID, getEmptyMediaStream());
      mediaConnection.on("stream", (stream) => {
        setStream(stream);
        console.log(stream);
      });
      mediaConnection.on("close", () => {});
    }
  });
  peer.on("call", (mediaConnection) => {
    console.log(stream);
    mediaConnection.answer(stream);
    mediaConnection.on("close", () => {});
  });

  const startStream = async () => {
    // Audio suggestions: https://stackoverflow.com/questions/46063374/is-it-really-possible-for-webrtc-to-stream-high-quality-audio-without-noise
    const options = {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: 30,
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
  const controlProps = { id, stream, startStream, stopStream };
  return (
    <div id="page">
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="IBM Platform Name">
              <HeaderName
                href="https://github.com/felixjchen/screen-share"
                prefix="Ice"
              >
                Cream
              </HeaderName>
              <HeaderNavigation aria-label="Ice"></HeaderNavigation>
              <HeaderGlobalBar>
                {streamerID ? <> </> : <Control {...controlProps}></Control>}
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
