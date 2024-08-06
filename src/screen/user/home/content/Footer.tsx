import { Box } from '@chakra-ui/react'
import { HiChatAlt2, HiClipboardList, HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box bg='#5DB329' height="16" color='white' className="m-auto mt-36 flex justify-center items-center fixed 
             inset-x-0 
             bottom-0 
             p-4">
                <div className='ml-2.5 grid grid-cols-3 pt-6 gap-20'>
                    <div className='grid grid-rows-2' onClick={() => navigate("/client/home")}>
                        <HiHome className='m-auto size-8'/>
                        <p className='text-[12px] justify-self-center'>Beranda</p>
                    </div>
                    <div className='grid grid-rows-2 ' onClick={() => navigate("/client/allchat")}>
                        <HiChatAlt2 className='m-auto size-8'/>
                        <p className='text-[12px] justify-self-center'>Pesan</p>
                    </div>
                    <div className='grid grid-rows-2 ' onClick={() => navigate("/client/riwayat")}>
                        <HiClipboardList className='m-auto size-8'/>
                        <p className='text-[12px] justify-self-center'>Riwayat</p>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Footer