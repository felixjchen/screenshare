import { FunctionComponent } from "react";
import { Stream } from "stream";
import { TooltipIcon } from "carbon-components-react";
import { Recording20, Stop20 } from "@carbon/icons-react";

type StreamButtonProps = {
  stream?: MediaStream;
  startStream: Function;
  stopStream: Function;
};

const StreamButton: FunctionComponent<StreamButtonProps> = ({
  stream,
  startStream,
  stopStream,
}) => {
  const handler = stream ? stopStream : startStream;
  const icon = stream ? <Stop20 /> : <Recording20 />;
  const tooltipIconProps = {
    tooltipText: "Stop streaming",
    direction: "bottom",
    onClick: handler,
    align: "end",
  };
  return (
    <div id="stream_button">
      <TooltipIcon {...tooltipIconProps}>{icon}</TooltipIcon>
    </div>
  );
};

export { StreamButton };
