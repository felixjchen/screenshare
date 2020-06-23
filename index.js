let peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

let screenStream = null;

let emptyAudioTrack = null;
let emptyVideoTrack = null;
let emptyMediaStream = null;

let video = null;

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
    getScreenStream(streamerID);
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
  call.answer(screenStream);
});

/////////////////////////////////////////////
// Actions
/////////////////////////////////////////////
function getScreenStream(peerID) {
  // Connect with empty media stream
  if (emptyMediaStream == null) {
    emptyAudioTrack = createEmptyAudioTrack();
    emptyVideoTrack = createEmptyVideoTrack({
      width: 600,
      height: 400,
    });
    emptyMediaStream = new MediaStream([emptyAudioTrack, emptyVideoTrack]);
  }

  call = peer.call(peerID, emptyMediaStream);
  call.on("stream", function (stream) {
    console.log("Got stream ", stream);
    video.srcObject = stream;
    $("#loading").show();

    video.onloadeddata = function () {
      video.muted = false;
      video.controls = true;
      video.style.height = "auto";
      $("#loading").hide();
      video.play();
    };
  });
}

/////////////////////////////////////////////
// Helpers
/////////////////////////////////////////////
function createEmptyAudioTrack() {
  let ctx = new AudioContext();
  let oscillator = ctx.createOscillator();
  let dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  let track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, {
    enabled: false,
  });
}

function createEmptyVideoTrack({ width, height }) {
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
}

function setScreenStream() {
  if (screenStream != null) {
    screenStream.getTracks().forEach((mediaStreamTrack) => {
      mediaStreamTrack.stop();
    });
  }

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

  navigator.mediaDevices
    .getDisplayMedia(options)
    .then(function (stream) {
      console.log("Created display media", stream.get);
      screenStream = stream;
    })
    .catch(function (err) {
      console.log("Error when calling with screen media stream");
    });
}
