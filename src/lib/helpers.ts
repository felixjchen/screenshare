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
  navigator.clipboard.writeText(str).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};

////// URL Create/Parse
const isProduction = () => process.env.NODE_ENV === "production";
const production = isProduction();
const getStreamerURL = (peerID: string): string => {
  let url = "http://localhost:3000/";

  if (production) {
    url = "https://screensharedev.netlify.app/";
  }

  return `${url}?watch=${peerID}`;
};
const getStreamerPeerID = (): string | null => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("watch");
};
export { setVh, copyToClipboard, getStreamerPeerID, getStreamerURL };
