import { FunctionComponent, useState, useEffect } from "react";
import Peer from "peerjs";
import { ViewFilled20 } from "@carbon/icons-react";

type WatchersProps = {
  peer: Peer | undefined;
};
const Watchers: FunctionComponent<WatchersProps> = ({ peer }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!peer) return <> </>;

  let watchers = 0;
  for (let peerID in peer.connections) {
    let connections = peer.connections[peerID];

    for (let i = 0; i < connections.length; i++) {
      if (connections[i].peerConnection.connectionState === "connected") {
        watchers++;
        break;
      } else {
        connections[i].close();
      }
    }
  }
  return (
    <>
      <ViewFilled20 />
      <div>{watchers}</div>
    </>
  );
};

export { Watchers };
