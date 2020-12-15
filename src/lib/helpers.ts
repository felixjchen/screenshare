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

const copyToClipboard = (str: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = str;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    // const msg = successful ? "successful" : "unsuccessful";
    // console.log("Copying text command was " + msg);
  } catch (err) {
    // console.error("Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};

// URL Create/Parse
const isProduction = () => process.env.NODE_ENV === "production";
const production = isProduction();
const getStreamerURL = (id: string): string => {
  let url = "http://localhost:3000/";

  if (production) {
    url = "https://screensharedev.netlify.app/";
  }

  return `${url}?watch=${id}`;
};
const getStreamerID = (): string | null => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("watch");
};

// Peer helpers
// peer is EventEmitter https://github.com/peers/peerjs/issues/331
const removeAllListeners = (peer: any) => {
  peer.removeAllListeners();
};

// Empty track
const getEmptyAudioTrack = () => {
  let ctx = new AudioContext();
  let oscillator = ctx.createOscillator();
  let dst: any = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  let track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, {
    enabled: false,
  });
};

const getEmptyVideoTrack = (width: number, height: number) => {
  let canvas: any = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });

  canvas.getContext("2d").fillRect(0, 0, width, height);

  let stream = canvas.captureStream();
  let track = stream.getVideoTracks()[0];

  return Object.assign(track, {
    enabled: false,
  });
};

const getEmptyMediaStream = () => {
  const emptyAudioTrack = getEmptyAudioTrack();
  const emptyVideoTrack = getEmptyVideoTrack(1, 1);
  return new MediaStream([emptyVideoTrack, emptyAudioTrack]);
};

export {
  setVh,
  copyToClipboard,
  getStreamerID,
  getStreamerURL,
  getEmptyMediaStream,
  removeAllListeners,
};
