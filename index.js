let peer = new Peer({
    host: "peer-server.azurewebsites.net",
    port: 443,
    path: "/myapp",
    secure: true,
});

// my screenshare stream
let stream = null;
// my video element
let watchers = 0;
let video = null;

let emptyAudioTrack = null;
let emptyVideoTrack = null;
let emptyMediaStream = null;

/////////////////////////////////////////////
// Frontend
/////////////////////////////////////////////
$(function() {
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

    $("#streamerID").keyup(function() {
        getStream();
    });
});

/////////////////////////////////////////////
// Peer Listeners
/////////////////////////////////////////////
peer.on("open", function(id) {
    $("#peerID").text(id);
    $("#loading").hide();
});

peer.on("call", function(mediaConnection) {
    mediaConnection.answer(stream);

    watchers++;

    mediaConnection.on("close", () => {
        watchers--;
    });
});

/////////////////////////////////////////////
// Actions
/////////////////////////////////////////////
let getStream = () => {
    // If not empty media stream
    if (emptyMediaStream == null) setEmptyMediaStream();

    // Get streamer ID from input field
    let streamerID = $("#streamerID").val();
    mediaConnection = peer.call(streamerID, emptyMediaStream);

    mediaConnection.on("close", () => {
        // console.log("Stream closed");
        video.style.height = "100%";
        video.srcObject = null;
        video.controls = false;
    });

    mediaConnection.on("stream", function(stream) {
        console.log("Got stream ", stream);
        watch(stream);
    });
};

let setStream = async() => {
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
    } catch (e) {
        console.log("Error on setting stream: ", e);
    }
    watch(stream);
    $("#media").css("border", "2px solid red");

    // https://stackoverflow.com/questions/25141080/how-to-listen-for-stop-sharing-click-in-chrome-desktopcapture-api
    stream.getVideoTracks()[0].onended = () => {
        stopStream();
    };
};

let stopStream = () => {
    if (stream) {
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
let watch = (stream) => {
    video.srcObject = stream;

    video.onloadeddata = () => {
        video.muted = false;
        video.controls = true;
        video.style.height = "auto";
        video.play();
    };
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