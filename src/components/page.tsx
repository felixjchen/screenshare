import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderContainer,
  HeaderGlobalBar,
} from "carbon-components-react";
import "./page.scss";
import { FunctionComponent, useState, useEffect } from "react";
import { Stream } from "./stream";
import { Control } from "./control";
import { Watchers } from "./watchers";
import {
  copyToClipboard,
  getStreamerURL,
  getEmptyMediaStream,
  removeAllListeners,
} from "../lib/helpers";
import Peer from "peerjs";

type PageProps = {
  id: string;
  streamerID: string | null;
};

const Page: FunctionComponent<PageProps> = ({ id, streamerID }) => {
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [watchers, setWatchers] = useState<number>(0);

  useEffect(() => {
    const peer = new Peer(id);
    setPeer(peer);
  }, [id]);

  useEffect(() => {
    if (!peer) return;

    peer.on("call", (mediaConnection) => {
      mediaConnection.answer(stream);

      mediaConnection.on("close", () => {});
      mediaConnection.on("error", () => {});
    });

    return () => {
      removeAllListeners(peer);
    };
  }, [peer, stream]);

  useEffect(() => {
    if (!peer || !streamerID) return;

    peer.on("open", () => {
      const mediaConnection = peer.call(streamerID, getEmptyMediaStream());
      mediaConnection.on("stream", (stream) => {
        setStream(stream);
      });
      mediaConnection.on("close", () => {
        setStream(undefined);
      });
    });
  }, [peer, streamerID]);

  const startStream = async () => {
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
      copyToClipboard(getStreamerURL(id));
    } catch (e) {
      console.log("Error on starting stream: ", e);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(undefined);
    }
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
              <HeaderNavigation aria-label="">
                {streamerID === null && stream !== undefined ? (
                  <>
                    <Watchers peer={peer} />
                  </>
                ) : (
                  <></>
                )}
              </HeaderNavigation>
              <HeaderGlobalBar>
                {streamerID === null ? (
                  <Control {...controlProps}></Control>
                ) : (
                  <> </>
                )}
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
