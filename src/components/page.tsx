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
import "./page.scss";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import { Stream } from "./stream";

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

    <div id="stream_container">
      <Stream></Stream>
    </div>
  </div>
);

export { Page };
