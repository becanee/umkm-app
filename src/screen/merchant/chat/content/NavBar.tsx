import { useNavigate } from "react-router-dom";
import { Box, IconButton, Avatar } from "@chakra-ui/react"
import { HiMenu, HiOutlineArrowNarrowLeft, HiOutlinePhone } from "react-icons/hi";
import useLogic from "./_logic";

export const NavBar = () => {
    const { services }: any = useLogic();
    const navigate = useNavigate();

    return (
        <>
            <div className="mb-5">
                <Box bg='#FFFFFF' p={8} color='white' className="-ml-10 -mr-10 -mt-9 flex text-dark justify-between items-center max-h-[0px]">
                    <div className="flex flex-between center">
                        <IconButton
                            colorScheme='transparant'
                            aria-label='Search database'
                            icon={<HiMenu className="size-8 m-auto" />}
                            onClick={() => navigate("/merchant/allchat")}
                        />
                        <HiOutlineArrowNarrowLeft size={20} color="black" className="-ml-10 mr-5 mt-3" />
                        <Avatar size="sm" name='Dan Abrahmov' className="mt-2" src={services?.users?.profile_pict} />
                        <div className="flex gap-1 ml-3 mt-1 text-black">
                            <p className="text-1xl mt-2 font-semibold m-auto">{services?.users?.username}</p>
                        </div>
                    </div>
                    <HiOutlinePhone size={20} color="black" className="mt-2" />
                </Box>
            </div>
        </>
    )
}

export default NavBar