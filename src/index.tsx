import React from "react";
import { render } from "react-dom";
// import { Fade16 } from "@carbon/icons-react";
import { Page } from "./components/page";
import Peer from "peerjs";

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
};

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
