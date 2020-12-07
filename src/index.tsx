import React from "react";
import { render } from "react-dom";
import Peer from "peerjs";
import { setVh, getStreamerID } from "./lib/helpers";
import { Page } from "./components/page";

setVh();
const streamerID = getStreamerID();

const peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

const pageProps = { peer, streamerID };

console.log(pageProps);

render(<Page {...pageProps} />, document.getElementById("root"));
