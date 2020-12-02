import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderContainer,
  Grid,
  Row,
  Column,
  HeaderGlobalBar,
  HeaderGlobalAction,
  // SideNav,
  // SideNavMenuItem,
  // SideNavItems,
  // SideNavLink,
  // SideNavMenu,
} from "carbon-components-react";
import "./page.scss";
import { FunctionComponent, useState, useEffect, useRef } from "react";
import { Recording20 } from "@carbon/icons-react";
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
            <HeaderNavigation aria-label="Stream"></HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction id="record_icon" aria-label="Logout">
                <Recording20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
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
