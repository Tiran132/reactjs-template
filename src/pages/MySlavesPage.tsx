import { useEffect, useState, type FC } from "react";

import { PageWrapper } from "@/components/PageWrapper";
import { TransparentCard } from "@/components/Cards/TransparentCards";
import { Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { FormatNumberWithSpaces } from "@/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { useInitData } from "@tma.js/sdk-react";
import { ISlavesRes, getUserSlaves } from "@/apiWorks/api";

export const MySlavesPage: FC = () => {
  const initData = useInitData();

  const [slavesData, setSlavesData] = useState<ISlavesRes | undefined>(undefined);

  useEffect(() => {
    const getRes = async () => {
      if (initData?.user) {
        const res = await getUserSlaves(initData.user.id.toString());

        if (res)
          setSlavesData(res);
      }
    };

    getRes();
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
              <IconButton size="4">
                <PersonIcon />
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
