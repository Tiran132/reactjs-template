import { useEffect, useState, type FC } from "react";

import { PageWrapper } from "@/components/PageWrapper";
import { TransparentCard } from "@/components/Cards/TransparentCards";
import { Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { FormatNumberWithSpaces } from "@/utils";
import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { useInitData } from "@tma.js/sdk-react";
import { ISlavesRes, IUserInfo, buySlave, getAvailableSlaves, getUserInfo } from "@/apiWorks/api";

export const AvailableSlavesPage: FC = () => {
  const initData = useInitData();

  const [userData, setUserData] = useState<IUserInfo | undefined>(undefined);
  const [slavesData, setSlavesData] = useState<ISlavesRes | undefined>(undefined);

  useEffect(() => {
    const getUserData = async () => {
      if (initData?.user) {
        const res = await getUserInfo(initData.user.id.toString());

        if (res)
          setUserData(res);
      }
    };


    const getRes = async () => {
      if (initData?.user) {
        const res = await getAvailableSlaves(initData.user.id.toString());

        if (res)
          setSlavesData(res);
        
      }
    };

    getRes();
    getUserData();
  }, [initData?.user]);

  if (!initData?.user) return <>as</>;

  return (
    <PageWrapper>
      <Flex direction="column" gap="3">
        {slavesData?.length == 0 && "No slaves yet..."}
        {slavesData?.map(slave => {
            return (
<Box p="4" asChild>
          <TransparentCard>
            <Flex justify="between">
              <Heading>{slave.name}</Heading>
              <IconButton size="4" onClick={async () => {
                // @ts-ignore
                await buySlave(initData!.user.id.toString(), slave.telegram_id.toString())
              }}>
                <PlusIcon />
              </IconButton>
            </Flex>
            <Text size="4">
              Price: <b>{FormatNumberWithSpaces(slave.price)}</b>{" "}
              <Text color="gray" size="2">
                BLM
              </Text>
            </Text>
            <br />  
            <Text size="4">
              Income: <b>{FormatNumberWithSpaces(slave.price * 0.1)}</b>{" "}
              <Text color="gray" size="2">
                BLM / h
              </Text>
            </Text>
          </TransparentCard>
        </Box>
            )
        })}
      </Flex>
    </PageWrapper>
  );
};
