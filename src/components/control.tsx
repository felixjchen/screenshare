import { FunctionComponent } from "react";
import { TooltipIcon } from "carbon-components-react";
import { Recording20, Stop20, Copy20 } from "@carbon/icons-react";
import { copyToClipboard, getStreamerURL } from "../lib/helpers";

type ControlProps = {
  id: string;
  stream?: MediaStream;
  startStream: Function;
  stopStream: Function;
};

const Control: FunctionComponent<ControlProps> = ({
  id,
  stream,
  startStream,
  stopStream,
}) => {
  const toggleStreamHandler = stream ? stopStream : startStream;
  const toggleStreamIcon = stream ? <Stop20 /> : <Recording20 />;
  const toggleStreamProps = {
    tooltipText: stream
      ? "Stop streaming"
      : "Start streaming and copy share link",
    onClick: toggleStreamHandler,
    direction: "bottom",
    align: "end",
  };

  const copyStreamerURLProps = {
    tooltipText: "Copy streamer URL",
    direction: "bottom",
    align: "end",
    onClick: () => {
      copyToClipboard(getStreamerURL(id));
    },
  };

  console.log(copyStreamerURLProps);
  return (
    <>
      {stream ? (
        <div className="stream_button">
          <TooltipIcon {...copyStreamerURLProps}>
            <Copy20></Copy20>
          </TooltipIcon>
        </div>
      ) : (
        <> </>
      )}
      <div className="stream_button">
        <TooltipIcon {...toggleStreamProps}>{toggleStreamIcon}</TooltipIcon>
      </div>
    </>
  );
};

export { Control };
