import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { GoStopwatch, GoLocation } from "react-icons/go";
import useLogic from "./_logic";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";

const Footer = () => {
  const {
    chatParent,
    services,
    placeOrder,
    sendMessage,
    chatHistory,
    addRating,
    loading,
  }: any = useLogic();
  const toast = useToast();
  const [inputText, setInputText] = useState("");
  const profileInfo = getUserProfile();
  const [lonLat, seLonLat]: any = useState({});
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingInput, setRatingInput] = useState({
    rating: 25,
    comment: "",
  });

  const handleAddRating = async () => {
    let res: any = await addRating({
      ...ratingInput,
      rating:
        ratingInput?.rating === 25
          ? 0
          : ratingInput?.rating === 50
          ? 1
          : ratingInput?.rating === 75
          ? 2
          : ratingInput?.rating === 100
          ? 3
          : ratingInput?.rating === 125
          ? 4
          : ratingInput?.rating === 150
          ? 5
          : null,
    });
    if (res.status) {
      console.log(res);
      toast({
        title: "Thank you for your feedback!",
        duration: 3000,
        status: "info",
        variant: "top-accent",
        position: "top",
        isClosable: true,
      });

      setTimeout(() => {
        onClose();
        navigate("/client/riwayat");
      }, 2500);
    }
  };

  const handleSendMessage = async (type?: any) => {
    if (type === "loc") {
      let res: any = await sendMessage({
        client_id: chatParent?.client_id,
        merchant_id: chatParent?.merchant_id,
        type: "location",
        position: profileInfo?.role === "user" ? "right" : "left",
        text: inputText,
        chat_id: chatParent?.id,
        role: profileInfo?.role,
        order_status: `https://maps.googleapis.com/maps/api/staticmap?center=${lonLat?.latitude},${lonLat?.longitude}&zoom=17&size=700x350&maptype=roadmap&markers=color:red%7Clabel:M%7C${lonLat?.latitude},${lonLat?.longitude}&markers=color:green%7Clabel:G%7C${lonLat?.latitude},${lonLat?.longitude}&markers=color:red%7Clabel:C%7C${lonLat?.latitude},${lonLat?.longitude}&key=AIzaSyDUOmw67gMYXe80m46m7Y8U9bDxBDnVRuM`,
        lat: lonLat?.latitude,
        lon: lonLat?.longitude,
      });

      if (res.status) {
        setInputText("");
        navigate(0);
        console.log(res);
      }
    } else {
      let res: any = await sendMessage({
        client_id: chatParent?.client_id,
        merchant_id: chatParent?.merchant_id,
        type: "text",
        position: profileInfo?.role === "user" ? "right" : "left",
        text: inputText,
        chat_id: chatParent?.id,
        role: profileInfo?.role,
      });

      if (res.status) {
        navigate(0);
        setInputText("");
        console.log(res);
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function successFunction(position?: any) {
      seLonLat(position.coords);
    }

    function errorFunction() {
      console.log("Unable to retrieve your location.");
    }
  }, [inputText, chatHistory?.length]);
  return (
    <>
      <div className="block fixed bottom-0 fixed-bottom-0">
        <Box
          height={
            chatParent?.status === "Selesai" || chatParent?.status === "Proses"
              ? "10"
              : "20"
          }
          color="white"
          className={
            chatParent?.status === "Pending"
              ? `m-auto bg-blue-100 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : chatParent?.status === "Proses"
              ? `m-auto bg-blue-300 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : chatParent?.status === "Selesai"
              ? `m-auto max-h-[2.8rem] ${chatParent?.rating ? 'bg-yellow-300' : 'bg-green-300'} mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : `m-auto bg-gray-300 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
          }
        >
          <div className="grid grid-cols-1">
            {!chatParent?.status ? (
              <>
                <div
                  className="grid grid-rows-1"
                  onClick={() => placeOrder({ status: "Pending" })}
                >
                  <p className="text-md text-black justify-self-center flex">
                    Pesan <GoStopwatch className="ml-2" size={22} />
                  </p>
                </div>
                <div
                  className="grid grid-rows-1 mt-4"
                  onClick={() => handleSendMessage("loc")}
                >
                  <p className="text-md text-black justify-self-center flex">
                    Kirim Lokasi <GoLocation className="ml-2" size={22} />
                  </p>
                </div>
              </>
            ) : chatParent?.status === "Pending" ? (
              <>
                <div className="grid grid-rows-1">
                  <p className="text-md text-black justify-self-center flex">
                    Menunggu Respon Merchant{" "}
                    <GoStopwatch className="ml-2" size={22} />
                  </p>
                </div>
                <div
                  className="grid grid-rows-1 mt-4"
                  onClick={() => handleSendMessage("loc")}
                >
                  <p className="text-md text-black justify-self-center flex">
                    Kirim Lokasi <GoLocation className="ml-2" size={22} />
                  </p>
                </div>
              </>
            ) : chatParent?.status === "Proses" ? (
              <>
                <div className="grid grid-rows-1">
                  <p className="text-xl text-black justify-self-center">
                    Pesanan Diproses Merchant
                  </p>
                </div>
              </>
            ) : chatParent?.rating ? (
              <div className="grid grid-rows-1" onClick={() => navigate("/client/riwayat")}>
                <p className="text-xl text-black justify-self-center">
                  Lihat Riwayat
                </p>
              </div>
            ) : (
              <div className="grid grid-rows-1" onClick={onOpen}>
                <p className="text-xl text-black justify-self-center">
                  Berikan Rating
                </p>
              </div>
            )}
          </div>
        </Box>

        <InputGroup size="lg">
          <Input
            width={375}
            variant="unstyled"
            className="-ml-4 mb-2"
            placeholder="Enter Message"
            onChange={(e) => setInputText(e.target.value)}
            defaultValue={inputText}
          />
          <InputRightElement>
            <Button
              className="-mt-6"
              colorScheme="whatsapp"
              size="sm"
              onClick={() => handleSendMessage()}
            >
              <HiMiniPaperAirplane size={18} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Rating Pesanan <b>{services?.name}</b>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Card maxW="lg">
              <CardBody> */}
            <Image
              src={services?.picture}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              className="mb-4"
            />
            {ratingInput?.rating === 25
              ? "Kurang Baik"
              : ratingInput?.rating === 50
              ? "Baik"
              : ratingInput?.rating === 75
              ? "Pas Banget"
              : ratingInput?.rating === 100
              ? "Sangat Baik"
              : ratingInput?.rating === 125
              ? "Speachless"
              : ratingInput?.rating === 150
              ? "Mindblowing"
              : null}
            <HStack mt="6" spacing="3" className="">
              <Slider
                defaultValue={ratingInput?.rating}
                min={25}
                max={150}
                step={25}
                onChange={(val) =>
                  setRatingInput({ ...ratingInput, rating: val })
                }
              >
                <SliderTrack bg="red.100">
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" as={FcLike} />
                </SliderThumb>
              </Slider>
            </HStack>
            {/* </CardBody>
              <CardFooter> */}
            <Textarea
              size="lg"
              className="mt-4"
              disabled={loading}
              onChange={(e) =>
                setRatingInput({ ...ratingInput, comment: e.target.value })
              }
              placeholder="Bagaimana pelayanan kami?"
            />
            {/* </CardFooter>
            </Card> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={onClose}
              isLoading={loading}
            >
              Close
            </Button>
            <Button
              isLoading={loading}
              colorScheme="whatsapp"
              onClick={() => handleAddRating()}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
