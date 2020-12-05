import React from "react";
import { render } from "react-dom";
import Peer from "peerjs";
import { setVh, getStreamerID, getEmptyMediaStream } from "./lib/helpers";
import { Page } from "./components/page";

setVh();
const streamerID = getStreamerID();

const peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

const pageProps = { peer, watchStream: undefined } as any;

if (streamerID) {
  const mediaConnection = peer.call(streamerID, getEmptyMediaStream());
  mediaConnection.on("stream", (stream) => {
    console.log(1);
    pageProps["watchStream"] = stream;
  });
  mediaConnection.on("close", () => {});
}

render(<Page {...pageProps} />, document.getElementById("root"));
