import React from "react";
import { render } from "react-dom";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderContainer,
  HeaderGlobalBar,
  SideNav,
  SideNavMenuItem,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
} from "carbon-components-react";
import { Fade16 } from "@carbon/icons-react";
import styles from "./page.scss";

const Page = () => (
  <div id="page">
    <HeaderContainer
      render={() => (
        <>
          <Header aria-label="IBM Platform Name">
            <HeaderName href="#" prefix="Screen">
              Share
            </HeaderName>
          </Header>
        </>
      )}
    />
  </div>
);
render(<Page />, document.getElementById("root"));
