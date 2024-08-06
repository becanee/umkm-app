import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useLogic from "./_logic";
import { useEffect, useState } from "react";

export const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUserRequest, handleUpdateProfileClient } = useLogic();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (params: any) => {
    setLoading(true);
    const res: any = await handleUpdateProfileClient(params);
    if (res?.status) {
      toast({
        title: "Merchant Approved",
        duration: 5000,
        status: "success",
        variant: "top-accent",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      onClose();
    } else {
      toast({
        title: res?.message,
        duration: 5000,
        status: "error",
        variant: "top-accent",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      let res: any = await getUserRequest();
      setUser(res?.filter((el: any) => !el.is_approve));
    };

    fetch();
  }, [loading]);

  return (
    <>
      <div
        className="-ml-9 lg:-ml-9 min-w-[26.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"
        onClick={onOpen}
      >
        {user?.length > 0
          ? user.map((item: any) => {
              return (
                <>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Meminta Persetujuan</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Nama Merchant: {item?.username} <br />
                        No telepon: {item?.phone_number} <br />
                        description: {item?.description} <br />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          isLoading={loading}
                          colorScheme="whatsapp"
                          mr={3}
                          onClick={() =>
                            onSubmit({
                              id: item.id,
                              is_approve: true,
                            })
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={onClose}
                          isLoading={loading}
                        >
                          Decline
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <Card className="">
                    <CardHeader>
                      <Flex>
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar
                            name={item?.username}
                            src={item?.profile_pict}
                          />

                          <Box>
                            <Heading size="sm">{item?.username}</Heading>
                            {/* <Text>Rating</Text> */}
                          </Box>
                        </Flex>
                        {/* <Text ml={0}>14:17</Text> */}
                      </Flex>
                    </CardHeader>
                  </Card>
                </>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Index;
