import React from "react";
import { render } from "react-dom";
import Peer from "peerjs";
import { setVh, getStreamerID } from "./lib/helpers";
import { Page } from "./components/page";

setVh();
const streamerPeerID = getStreamerID();
console.log(streamerPeerID);

const peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});
peer.on("open", (id) => {
  const pageParams = { id } as any;
  render(<Page {...pageParams} />, document.getElementById("root"));
});

// const player = videojs("stream", {
//   controls: true,
//   autoplay: false,
//   preload: "auto",
//   liveui: true,
// });
