import { FunctionComponent } from "react";
import ReactPlayer from "react-player";

type StreamProps = {
  stream: MediaStream | undefined;
};

const Stream: FunctionComponent<StreamProps> = ({ stream }) => {
  const reactPlayerProps = {
    url: stream,
    controls: true,
    width: "100%",
    height: "100%",
    playing: stream !== undefined,
  };
  return <ReactPlayer {...reactPlayerProps} />;
};

export { Stream };
