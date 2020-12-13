import { FunctionComponent } from "react";
import { TooltipIcon } from "carbon-components-react";
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
  const toggleStreamProps = {
    className: "bx--header__action",
    tooltipText: stream ? "Stop stream" : "Start stream",
    onClick: toggleStreamHandler,
    direction: "bottom",
    align: "end",
  };

  const copyStreamerURLProps = {
    className: "bx--header__action",
    tooltipText: "Copy stream URL",
    direction: "bottom",
    align: "end",
    onClick: () => {
      copyToClipboard(getStreamerURL(id));
    },
  };

  return (
    <>
      {stream ? (
        <div>
          <TooltipIcon {...copyStreamerURLProps}>
            <Copy20></Copy20>
          </TooltipIcon>
        </div>
      ) : (
        <> </>
      )}
      <div className="data-tooltip-primary-focus">
        <TooltipIcon {...toggleStreamProps}>{toggleStreamIcon}</TooltipIcon>
      </div>
    </>
  );
};

export { Control };
