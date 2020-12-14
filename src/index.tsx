import React from "react";
import { render } from "react-dom";
import { setVh, getStreamerID } from "./lib/helpers";
import { Page } from "./components/page";
import { v4 as uuidv4 } from "uuid";

setVh();
const streamerID = getStreamerID();
const id = uuidv4();

const pageProps = { id, streamerID };

render(<Page {...pageProps} />, document.getElementById("root"));
