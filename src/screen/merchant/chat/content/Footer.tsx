import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { GoStopwatch, GoLocation } from "react-icons/go";
import useLogic from "./_logic";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { HiClipboardCheck, HiOutlineX } from "react-icons/hi";

const Footer = () => {
  const { chatParent, placeOrder, sendMessage, chatHistory }: any = useLogic();
  const [inputText, setInputText] = useState("");
  const profileInfo = getUserProfile();
  const [lonLat, seLonLat]: any = useState({});
  const navigate = useNavigate();

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
            chatParent?.status === "Selesai"
              ? "0"
              : chatParent?.status === "Proses"
              ? "10"
              : chatParent?.status === "Cancel"
              ? "10"
              : "20"
          }
          //   color="white"
          className={
            chatParent?.status === "Pending"
              ? `m-auto bg-white-100 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : chatParent?.status === "Cancel"
              ? `m-auto bg-red-300 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : chatParent?.status === "Proses"
              ? `m-auto bg-green-300 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
              : `m-auto bg-slate-300 mb-12 flex justify-center items-center fixed inset-x-0 bottom-0`
          }
        >
          <div className="grid grid-cols-1">
            {chatParent?.status === "Pending" ? (
              <div className="grid grid-rows-1">
                <div className="grid grid-cols-2">
                  <p
                    className="text-md color-green justify-self-start flex"
                    onClick={() => placeOrder({ status: "Proses" })}
                  >
                    Terima <HiClipboardCheck className="ml-2" size={22} />
                  </p>
                  <p
                    className="text-md color-red justify-self-end flex"
                    onClick={() => placeOrder({ status: "Cancel" })}
                  >
                    Tolak <HiOutlineX className="ml-2" size={22} />
                  </p>
                </div>
              </div>
            ) : chatParent?.status === "Proses" ? (
              <>
                <div
                  className="grid grid-rows-1"
                  onClick={() => placeOrder({ status: "Selesai" })}
                >
                  <p className="text-xl text-black justify-self-center">
                    Selesaikan Pesanan
                  </p>
                </div>
              </>
            ) : chatParent?.status === "Cancel" ? (
              <div className="grid grid-rows-1">
                <p className="text-xl text-black justify-self-center">
                  Pesanan Dibatalkan
                </p>
              </div>
            ) : null}
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
    </>
  );
};

export default Footer;
