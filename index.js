let peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

let stream = null;
let video = null;

let emptyAudioTrack = null;
let emptyVideoTrack = null;
let emptyMediaStream = null;

/////////////////////////////////////////////
// Frontend
/////////////////////////////////////////////
$(function () {
  video = document.getElementById("media");

  $("#peerIDCopy").click(() => {
    let peerID = document.getElementById("peerID");
    text = peerID.textContent;

    let e = document.createElement("textarea");
    e.value = text;

    document.body.appendChild(e);
    e.select();
    document.execCommand("copy");
    document.body.removeChild(e);
  });

  $("#startWatching").click(() => {
    let streamerID = $("#streamerID").val();
    getStream(streamerID);
  });
});

/////////////////////////////////////////////
// Peers
/////////////////////////////////////////////
peer.on("open", function (id) {
  $("#peerID").text(id);
  $("#loading").hide();
});

peer.on("call", function (call) {
  call.answer(stream);
});

/////////////////////////////////////////////
// Actions
/////////////////////////////////////////////
let getStream = (peerID) => {
  // Connect with empty media stream
  if (emptyMediaStream == null) setEmptyMediaStream();

  call = peer.call(peerID, emptyMediaStream);
  call.on("stream", function (stream) {
    console.log("Got stream ", stream);
    video.srcObject = stream;
    $("#loading").show();

    video.onloadeddata = function () {
      video.muted = false;
      // video.controls = true;
      video.style.height = "auto";
      $("#loading").hide();
      video.play();
    };
  });
};

/////////////////////////////////////////////
// Helpers
/////////////////////////////////////////////
let setStream = async () => {
  if (stream != null) stopStream();

  let options = {
    video: {
      frameRate: 60,
    },
    audio: {
      autoGainControl: false,
      googAutoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
      sampleRate: 44100,
    },
  };

  try {
    stream = await navigator.mediaDevices.getDisplayMedia(options);
  } catch (e) {
    console.log("Error on setting stream: ", e);
  }
};

let stopStream = () => {
  stream.getTracks().forEach((mediaStreamTrack) => {
    mediaStreamTrack.stop();
  });
};

/////////////////////////////////////////////
// Empty Streams
/////////////////////////////////////////////
let createEmptyAudioTrack = () => {
  let ctx = new AudioContext();
  let oscillator = ctx.createOscillator();
  let dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  let track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, {
    enabled: false,
  });
};

let createEmptyVideoTrack = ({ width, height }) => {
  let canvas = Object.assign(document.createElement("canvas"), {
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

let setEmptyMediaStream = () => {
  emptyAudioTrack = createEmptyAudioTrack();
  emptyVideoTrack = createEmptyVideoTrack({
    width: 600,
    height: 400,
  });
  emptyMediaStream = new MediaStream([emptyAudioTrack, emptyVideoTrack]);
};
