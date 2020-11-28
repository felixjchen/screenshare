import {
  Header,
  HeaderName,
  // HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  // HeaderMenuButton,
  HeaderContainer,
  Grid,
  Row,
  Column,
  // HeaderGlobalBar,
  // SideNav,
  // SideNavMenuItem,
  // SideNavItems,
  // SideNavLink,
  // SideNavMenu,
} from "carbon-components-react";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import "./page.scss";
import videojs from "video.js";

const Page: FunctionComponent = () => (
  <div id="page">
    <HeaderContainer
      render={() => (
        <>
          <Header aria-label="IBM Platform Name">
            <HeaderName href="#" prefix="Stream">
              Share
            </HeaderName>
          </Header>
        </>
      )}
    />

    <Grid condensed>
      <Row>
        <Column sm={{ span: 0 }} md={2} lg={3}>
          <Control></Control>
        </Column>
        <Column id="stream_container" sm={4} md={6} lg={9}>
          <Stream></Stream>
        </Column>
      </Row>
      <Row>
        <Column sm={4} md={{ span: 0 }} lg={{ span: 0 }}>
          <Control></Control>
        </Column>
      </Row>
    </Grid>
  </div>
);

const videoSrc = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
const videoJSOptions = {
  autoplay: "muted",
  controls: true,
  userActions: { hotkeys: true },
  playbackRates: [0.5, 1, 1.5, 2],
};
const Stream: FunctionComponent = () => {
  useEffect(() => {
    const player = videojs("stream", videoJSOptions, () => {
      player.src(videoSrc);
      console.log("onPlayerReady");
    });

    return () => {
      player.dispose();
    };
  });

  return (
    <div data-vjs-player>
      <video id="stream" className="video-js vjs-fill"></video>
    </div>
  );
};

const Control = () => {
  return <div id="control"> </div>;
};

export { Page };
