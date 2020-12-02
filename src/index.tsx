import React from "react";
import { render } from "react-dom";
import Peer from "peerjs";
import { setVh } from "./lib/helpers";
import { Page } from "./components/page";

setVh();

const peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

render(<Page />, document.getElementById("root"));

// const player = videojs("stream", {
//   controls: true,
//   autoplay: false,
//   preload: "auto",
//   liveui: true,
// });
