import { useEffect, useMemo, useState, type FC } from "react";

import { Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import styled, { keyframes } from "styled-components";
import "./IndexPage.css";
import { FormatNumberWithSpaces } from "@/utils";
import { PageWrapper } from "@/components/PageWrapper";
import {
  TransparentButton,
  TransparentCard,
  TransparentCardFullRadius,
} from "@/components/Cards/TransparentCards";
import { User, useInitData, useLaunchParams } from "@tma.js/sdk-react";
import {
  DisplayData,
  DisplayDataRow,
} from "@/components/DisplayData/DisplayData";
import { IUserInfo, getUserInfo } from "@/apiWorks/api";

const PingPongAnimation = keyframes`
0% {
  transform: translateY(0px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
}  
50% {
  transform: translateY(8px);
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.6);
  }
  100% {
  transform: translateY(0px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
} 
`;

const StatusLogoImg = styled(Box)`
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);

  animation: ${PingPongAnimation} 2s ease-in-out infinite;
`;

const StatusText = styled(Heading)`
  text-shadow: 0 2px 4px #000000;
`;

export const IndexPage: FC = () => {
  const initData = useInitData();

  const [userData, setUserData] = useState<IUserInfo | undefined
  >(undefined);

  useEffect(() => {
    const getRes = async () => {
      if (initData?.user) {
        const res = await getUserInfo(initData.user.id.toString());

        if (res)
          setUserData(res);
      }
    };

    getRes();
  }, [initData?.user]);

  if (!initData?.user) return <>as</>;

  return (
    <PageWrapper>
      <Flex gap="3" direction="column">
        <Flex
          width="100%"
          align="center"
          justify="center"
          direction="column"
          gap="3"
          mt="5"
          mb="5"
        >
          <StatusLogoImg>
            <img style={{ height: "25vh" }} src="/pepe-hasl.png" />
          </StatusLogoImg>
          <Flex asChild align="center">
            <StatusText size="2">
              GigaMaster{" "}
              <Box asChild ml="1">
                <IconButton size="2" radius="full" variant="soft" color="purple">
                  ?
                </IconButton>
              </Box>
            </StatusText>
          </Flex>
          <StatusText>{userData?.balance} SS</StatusText>
        </Flex>
        <Heading size="5" className="title">
          Share link
        </Heading>
        <TransparentCardFullRadius
          onClick={() =>
            navigator.clipboard.writeText(
              "https://t.me/slavery?start="+userData?.telegram_id
            )
          }
          variant="surface"
        >
          <Flex justify="between" align="center" pr="1">
            <Box width="88%">
              <TransparentButton size="3" variant="surface">
                https://t.me/slavery?start={userData?.telegram_id}
              </TransparentButton>
            </Box>
            <IconButton variant="ghost">
              <img src="/copy.svg" />
            </IconButton>
          </Flex>
        </TransparentCardFullRadius>
        <Heading size="5" className="title">
          Overview
        </Heading>
        <Flex overflow="hidden" gap="3">
          <Box minWidth="fit-content" width="25%">
            <TransparentCard variant="surface">
              <Box p={{ initial: "2", xs: "3" }} pb="7" pt="7">
                <Heading size={{ initial: "5", xs: "8" }} align="center">
                  {FormatNumberWithSpaces(924)}
                </Heading>
              </Box>
              <Box align="center">Total slaves</Box>
            </TransparentCard>
          </Box>
          <Box width="-webkit-fill-available">
            <TransparentCard variant="surface">
              <Box p={{ initial: "2", xs: "3" }} pb="7" pt="7">
                <Heading size={{ initial: "5", xs: "8" }} align="center">
                  {FormatNumberWithSpaces(123891)}
                  <Text size="2" color="gray">
                    {" "}
                    LM / h
                  </Text>
                </Heading>
              </Box>
              <Box align="center">Total slave's fee</Box>
            </TransparentCard>
          </Box>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
