import { FunctionComponent } from "react";
import { TooltipIcon, HeaderGlobalAction } from "carbon-components-react";
import {
  RecordingFilledAlt20,
  StopFilledAlt20,
  Copy20,
} from "@carbon/icons-react";
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
  const toggleStreamIcon = stream ? (
    <StopFilledAlt20 />
  ) : (
    <RecordingFilledAlt20 />
  );
  // const toggleStreamProps = {
  //   tooltipText: stream
  //     ? "Stop streaming"
  //     : "Start streaming and copy share link",
  //   onClick: toggleStreamHandler,
  //   direction: "bottom",
  //   align: "end",
  // };

  // const copyStreamerURLProps = {
  //   tooltipText: "Copy streamer URL",
  //   direction: "bottom",
  //   align: "end",
  //   onClick: () => {
  //     copyToClipboard(getStreamerURL(id));
  //   },
  // };

  return (
    <>
      {stream ? (
        <HeaderGlobalAction
          aria-label="Copy"
          onClick={() => {
            copyToClipboard(getStreamerURL(id));
          }}
        >
          <Copy20 />
        </HeaderGlobalAction>
      ) : (
        <> </>
      )}

      <HeaderGlobalAction aria-label="Stream" onClick={toggleStreamHandler}>
        {toggleStreamIcon}
      </HeaderGlobalAction>

      {/* {stream ? (
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
      </div> */}
    </>
  );
};

export { Control };
