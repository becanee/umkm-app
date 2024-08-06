import { useNavigate } from "react-router-dom";
import { Button, VStack } from "@chakra-ui/react"

export const Index = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="mt-12">
            <div className="flex justify-center items-center -mt-[8rem]">
                <img src="/assets/images/bg-gradient.png" className='' alt="" />
            </div>

            <div className="flex justify-center items-center m-auto w-[19rem] -mt-[19rem]">
                <img src="/assets/images/user/start-user.png" className='' alt="" />
            </div>
        </div>
            <div className="m-auto">
            <p className="text-lg text-gray-900 mt-24 lg:mt-16 px-3">
                Apakah anda sudah punya akun? <br />
                Jika belum mari kita buat!
            </p>
            </div>


            <div className="flex mt-28 lg:mt-14 justify-center items-center">
                <VStack
                    spacing={4}
                >
                    <Button size='lg' w={300} colorScheme='whatsapp' variant='solid' borderRadius={30} onClick={() => navigate("/client/sign-in")}>Masuk</Button>
                    <Button size='lg' w={300} colorScheme='whatsapp' variant='solid' borderRadius={30} onClick={() => navigate("/client/sign-up")}>Daftar</Button>
                </VStack>
            </div>
        </>
    )
}
