import React, { useEffect } from "react";
import { MessageBox } from "react-chat-elements";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import useLogic from "./_logic";

export const Index: React.FC<any> = () => {
  const { loading, services, chatParent, chatHistory }: any = useLogic();

  useEffect(() => {}, [chatHistory]);
  return (
    <>
      <Skeleton isLoaded={!loading}>
        {chatParent?.status ? (
          <Card maxH={70}>
            <CardHeader>
              <Flex className="-mt-2">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="Segun Adebayo"
                    borderRadius={8}
                    src={services?.picture}
                  />

                  <Box>
                    <Heading size="sm">
                      {services?.name}
                      <Tag
                        size={"sm"}
                        ml={2}
                        variant="subtle"
                        colorScheme={
                          chatParent?.status === "Pending"
                            ? `yellow`
                            : chatParent?.status === "Proses"
                            ? `blue`
                            : `green`
                        }
                      >
                        <TagLabel>{chatParent?.status}</TagLabel>
                      </Tag>
                    </Heading>
                    <Text>
                      Mulai Dari Rp{" "}
                      {services?.price_start?.toLocaleString("id")}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
          </Card>
        ) : null}

        {loading
          ? ""
          : chatHistory?.map((i: any, k: any) => {
              return (
                <MessageBox
                  key={k + 1}
                  position={i?.role === "merchant" ? "left" : "right"}
                  className={
                    i?.position === "right" ? `mt-2 -mr-2` : "mt-2 -ml-2"
                  }
                  type="text"
                  title={i?.role}
                  id={1}
                  forwarded={false}
                  replyButton={false}
                  date={new Date(i?.created_at)}
                  text={i?.text}
                />
              );
            })}
      </Skeleton>
    </>
  );
};

export default Index;
