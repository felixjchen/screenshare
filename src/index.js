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
import styles from "./page.css";

const Page = () => (
  <div id="page">
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Platform Name">
            <HeaderMenuButton
              aria-label="Open menu"
              isCollapsible
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="Screen">
              Share
            </HeaderName>
            
            <SideNav
              aria-label="Side navigation"
              isRail
              expanded={isSideNavExpanded}
            >
              <SideNavItems>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem
                    aria-current="page"
                    href="javascript:void(0)"
                  >
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink
                  aria-current="page"
                  renderIcon={Fade16}
                  href="javascript:void(0)"
                >
                  Link
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Link
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  </div>
);
render(<Page />, document.getElementById("root"));
