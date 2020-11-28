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

const Page = () => (
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
        <Column sm={{ span: 0 }} md={2} lg={2}>
          <Control></Control>
        </Column>
        <Column sm={4} md={6} lg={10}>
          <Stream></Stream>
        </Column>
      </Row>
      <Row>
        <Column sm={4} md={{ span: 0 }} lg={{ span: 0 }}>
          <MobileControl></MobileControl>
        </Column>
      </Row>
    </Grid>
  </div>
);

const Stream = () => {
  return <> </>;
};

const Control = () => {
  return <div id="control"></div>;
};

const MobileControl = () => {
  return (
    <div id="mobile_control">
      <Control></Control>
    </div>
  );
};

export { Page };
