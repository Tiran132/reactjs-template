import { HomeIcon, MagnifyingGlassIcon, PersonIcon, RowsIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, IconButton } from "@radix-ui/themes";
import { styled } from "styled-components";
import { TransparentCard } from "./Cards/TransparentCards";
import { Link, Navigate } from "react-router-dom";



const Header = styled(Box)`
  height: 4vh;
`;
const Background = styled.div`
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  // background-color: #211134;
  background: rgb(33, 17, 52);
  background: radial-gradient(
    circle at center bottom,
    rgba(24, 52, 88, 1) 10%,
    rgba(29, 27, 60, 1) 46%,
    rgba(33, 17, 52, 1) 100%
  );
`;

const BackgroundPurple = styled(Background)`
  background: rgb(196, 30, 183);
  background: radial-gradient(
    circle at 60% 60%,
    rgba(196, 30, 183, 0.3) 0%,
    rgba(174, 3, 200, 0.04870451598608194) 46%,
    rgba(33, 17, 52, 0) 100%
  );
`;

const Footer = styled(TransparentCard)`
  backgroundColor: rgba(41, 39, 130, 0.02);
  position: fixed;
  width: 100%;
  bottom: -11vh;
`;


export const PageWrapper = (props: React.PropsWithChildren) => {
  return (
    <Box style={{paddingBottom: "12vh"}}>
      <Background />
      <BackgroundPurple />
      <Header>
        <Flex justify="center" p="3">
          <Heading>SLAVERY</Heading>
        </Flex>
      </Header>
      <Box m="4" pt="4" asChild>
        {props.children}
      </Box>
      <Footer>
        <Flex justify="between" p="4" pt="3" height="20vh">
          <Link to="/">
            <IconButton size="4" radius="large" variant="soft"><HomeIcon /></IconButton>
          </Link>
          <Link to="/slaves">
            <IconButton size="4" radius="large" variant="soft"><RowsIcon /></IconButton>
          </Link>
          
          <Link to='/available-slaves'>
            <IconButton size="4" radius="large" variant="soft"><MagnifyingGlassIcon /></IconButton>
          </Link>
          <IconButton size="4" radius="large" variant="soft"><PersonIcon /></IconButton>
        </Flex>
      </Footer>
    </Box>
  );
};
