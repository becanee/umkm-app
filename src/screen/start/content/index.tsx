import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react"

export const Index = () => {
    const navigate = useNavigate();

    return (
        <>
            <p className="text-xl font-bold text-gray-900 pt-4">
                Siap Untuk Mendukung
            </p>
            <p className="text-xl font-bold mb-16 lg:mb-10 text-gray-900">
                Kegiatan  anda hari ini
            </p>

            <div className="flex justify-center items-center -mt-[4rem]">
                <img src="/assets/images/bg-gradient.png" className='' alt="" />
            </div>

            <div className="flex justify-center items-center m-auto w-[12rem] -mt-[19rem]">
                <img src="/assets/images/start-screen.png" className='' alt="" />
            </div>

            <p className="text-lg text-gray-900 mt-24 lg:mt-16">
                Selamat datang!
            </p>
            <p className="text-lg text-gray-900">
                Apakah anda Pedagang atau Pengguna?
            </p>


            <div className="flex mt-20 lg:mt-14 justify-center items-center">
                <ButtonGroup variant="solid" spacing={-2}>
                    <Button size='lg' colorScheme='whatsapp' variant='solid' borderLeftRadius={20} onClick={() => navigate("/merchant")}>Pedagang</Button>
                    <Button size='lg' colorScheme='whatsapp' variant='solid' borderRightRadius={20} onClick={() => navigate("/client")}>Pengguna</Button>
                </ButtonGroup>
            </div>
        </>
    )
}
