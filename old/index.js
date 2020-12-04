let peer = new Peer({
  host: "peer-server.azurewebsites.net",
  port: 443,
  path: "/myapp",
  secure: true,
});

// my screenshare stream
let stream = null;
// my video element
let video = null;

let emptyVideoTrack = null;
let emptyMediaStream = null;

/////////////////////////////////////////////
// Empty Streams
/////////////////////////////////////////////

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
  emptyVideoTrack = createEmptyVideoTrack({
    width: 1,
    height: 1,
  });
  emptyMediaStream = new MediaStream([emptyVideoTrack]);
};

setEmptyMediaStream();

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

  $("#streamerID").keyup(function () {
    watchStream();
  });

  // setTimeout(function () {
  //   watchStream("bcdf97dc-919b-4643-8261-e15dc8ddcea5");
  // }, 1000);
});

/////////////////////////////////////////////
// Peer Listeners
/////////////////////////////////////////////
peer.on("open", (id) => {
  $("#peerID").text(id);
  $("#loading").hide();
});

peer.on("call", (mediaConnection) => {
  mediaConnection.answer(stream);
  setWatcherCounter();

  mediaConnection.on("close", () => {
    setWatcherCounter();
  });
});

/////////////////////////////////////////////
// Actions
/////////////////////////////////////////////
let watchStream = (streamerID) => {
  // Get streamer ID from input field
  // let streamerID = $("#streamerID").val();

  mediaConnection = peer.call(streamerID, emptyMediaStream);
  console.log(streamerID);
  // console.log(mediaConnection);
  // mediaConnection.open();
  mediaConnection.on("stream", (stream) => {
    startVideo(stream);
  });
  mediaConnection.on("close", () => {
    stopVideo();
  });
};

let startStreaming = async () => {
  // Audio suggestions: https://stackoverflow.com/questions/46063374/is-it-really-possible-for-webrtc-to-stream-high-quality-audio-without-noise
  let options = {
    video: {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      frameRate: 60,
    },
    audio: {
      autoGainControl: false,
      channelCount: 2,
      echoCancellation: false,
      latency: 0,
      noiseSuppression: false,
      sampleRate: 48000,
      sampleSize: 16,
    },
  };

  try {
    stream = await navigator.mediaDevices.getDisplayMedia(options);

    startStreamVideo(stream);
    setWatcherCounter();

    // I've stopped streaming, attach listener to the stream
    // https://stackoverflow.com/questions/25141080/how-to-listen-for-stop-sharing-click-in-chrome-desktopcapture-api
    stream.getVideoTracks()[0].onended = () => {
      stopStreaming();
    };
  } catch (e) {
    console.log("Error on starting stream: ", e);
  }
};

let stopStreaming = () => {
  if (stream) {
    // Stop showing my stream
    stopVideo();

    // Stop stream, then dereference it
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    stream = null;

    // Stop all connections watching this stream
    for (let peerID in peer.connections) {
      conns = peer.connections[peerID];
      conns.forEach((i) => {
        i.close();
      });
    }
  }
};

/////////////////////////////////////////////
// Helpers
/////////////////////////////////////////////
let startStreamVideo = (stream) => {
  video.srcObject = stream;

  video.onloadeddata = () => {
    video.style.border = "3px solid red";
    video.style.height = "auto";
    video.play();
  };
};
let startVideo = (stream) => {
  video.srcObject = stream;

  video.onloadeddata = () => {
    video.muted = true;
    video.controls = true;
    video.style.height = "auto";
    video.play();
  };
};
let stopVideo = () => {
  video.srcObject = null;
  video.controls = false;
  video.style = null;
  video.muted = true;
};
let countWatchers = () => {
  let r = 0;
  for (var i in peer.connections) {
    let connections = peer.connections[i];

    for (let i = 0; i < connections.length; i++) {
      if (connections[i].open) {
        r++;
        break;
      }
    }
  }
  return r;
};
let setWatcherCounter = () => {
  count = countWatchers();
  $(".watchers").css("display", "block");
  $("#watcherCounter").html(count);
};