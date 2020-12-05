import { FunctionComponent } from "react";
import { TooltipIcon } from "carbon-components-react";
import { Recording20, Stop20 } from "@carbon/icons-react";

type ControlProps = {
  stream?: MediaStream;
  startStream: Function;
  stopStream: Function;
};

const Control: FunctionComponent<ControlProps> = ({
  stream,
  startStream,
  stopStream,
}) => {
  const handler = stream ? stopStream : startStream;
  const icon = stream ? <Stop20 /> : <Recording20 />;
  const tooltipIconProps = {
    tooltipText: stream
      ? "Stop streaming"
      : "Start streaming and copy share link",
    direction: "bottom",
    onClick: handler,
    align: "end",
  };
  return (
    <div className="stream_button">
      <TooltipIcon {...tooltipIconProps}>{icon}</TooltipIcon>
    </div>
  );
};

export { Control };
