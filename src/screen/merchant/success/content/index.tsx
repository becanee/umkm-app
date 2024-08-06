import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react"

export const Index = () => {

    const navigate = useNavigate();
    return(
        <>
        <div className="flex justify-center items-center -mt-[4.5rem]">
                <img src="/assets/images/bg-gradient.png" className='' alt="" />
            </div>
            <div className="flex justify-center items-center ml-9 w-[18rem] -mt-[20rem] lg:w-[12rem] lg:-mt-[22rem]">
                <img src="/assets/images/merchant/success.png" className='' alt="" />
            </div>

            <div className="flex justify-center items-center w-[22rem] pt-16 lg:w-[12rem] lg:-mt-[22rem]">
                <img src="/assets/images/merchant/chat-success.png" className='' alt="" />
            </div>


            <p className="text-base font-medium text-center text-gray-900 mb-5 mt-14 lg:mt-20">
                Ayo lanjutkan untuk memulai!
            </p>
            <div className="flex justify-center items-center">
            <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20} onClick={() => navigate("/merchant/waiting")}>Lanjutkan</Button>
            </div>
        </>
    );
}