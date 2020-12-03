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
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};

////// URL Create/Parse
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
export { setVh, copyToClipboard, getStreamerID, getStreamerURL };
