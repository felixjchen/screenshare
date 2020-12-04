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
  return stream ? (
    <TooltipIcon
      tooltipText="Stop streaming"
      direction="bottom"
      align="end"
      onClick={stopStream}
    >
      <Stop20 id="record_icon" />
    </TooltipIcon>
  ) : (
    <TooltipIcon
      tooltipText="Stream and copy sharing link"
      direction="bottom"
      align="end"
      onClick={startStream}
    >
      <Recording20 id="record_icon" />
    </TooltipIcon>
  );
};

export { StreamButton };
