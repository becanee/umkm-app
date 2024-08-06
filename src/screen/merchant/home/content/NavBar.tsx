import { useNavigate } from "react-router-dom";
import { Box, IconButton, Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, useToast } from "@chakra-ui/react"
import { HiMenu, HiLocationMarker, HiOutlineUser, HiOutlineSpeakerphone, HiOutlineReply, HiOutlinePlusCircle } from "react-icons/hi";
import useLogic from "./_logic";
import Cookies from "js-cookie";
import { getUserProfile } from "../../../../utils/cookie";

export const NavBar = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleLogoutMerchant } = useLogic();
    // const [loading, setLoading] = useState(false);
    const profileInfo = getUserProfile();

    const handleAddService = () => {
        if(!Cookies.get('_SERV_MRC')){
            navigate("/merchant/addproduct")
        } else {
            toast({
                title: "You Already have'an Service",
                duration: 5000,
                status: 'error',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
        }
    }


    const onSubmit = async () => {
        // setLoading(true);
        const res: any = await handleLogoutMerchant();
        if (res?.status) {
            Cookies.remove('_T')
            Cookies.remove('_UID')
            Cookies.remove('_USER')
            Cookies.remove('_S')
            Cookies.remove('_MRC')
            Cookies.remove('_SERV_MRC')
            toast({
                title: "Logout Success",
                duration: 5000,
                status: 'success',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            // setLoading(false);
            navigate("/");
        } else {
            toast({
                title: res?.message,
                duration: 5000,
                status: 'error',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            // setLoading(false);
        }
    }
    return (
        <>
            <div className="">
                <Box bg='#5DB329' p={8} color='white' className="-ml-10 -mr-10 -mt-9 flex justify-between items-center max-h-[0px]">
                    <IconButton
                        colorScheme='transparant'
                        aria-label='Search database'
                        icon={<HiMenu className="size-8 m-auto" />}
                        onClick={onOpen}
                    />
                    <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>
                                <div className="flex justify-normal">
                                    <Avatar size='lg' name='Dan Abrahmov' src={profileInfo?.profile_pict} />
                                    <div className="ml-4 grid grid-rows-2">
                                        <h1 className="text-2xl font-semibold">{profileInfo?.username}</h1>
                                        <p className="text-base">{profileInfo?.phone_number}</p>
                                    </div>
                                </div>
                            </DrawerHeader>

                            <DrawerBody>
                                <div className="grid grid-rows-2 gap-1 mt-64">
                                    <div className="flex justify-normal items-center"
                                        onClick={() => navigate(profileInfo?.role === "merchant" ? '/merchant/profile' : '/client/profile')}>
                                        <HiOutlineUser className="size-6 mr-3" />
                                        <p className="text-2xl font-semibold">Profil</p>
                                    </div>
                                    <div className="flex justify-normal items-center"
                                    onClick={()=> handleAddService()}>
                                        <HiOutlinePlusCircle
                                            className="size-6 mr-3" />
                                        <p className="text-2xl font-semibold">Tambah Produk/Jasa</p>
                                    </div>
                                    {/* <div className="flex justify-normal items-center">
                                        <HiOutlineSpeakerphone
                                            className="size-6 mr-3" />
                                        <p className="text-2xl font-semibold">Laporkan</p>
                                    </div> */}
                                    <div className="flex justify-normal items-center mt-72"
                                        onClick={() => onSubmit()}>
                                        <HiOutlineReply
                                            className="size-6 mr-3" />
                                        <p className="text-2xl ">Keluarkan Akun</p>
                                    </div>
                                </div>
                            </DrawerBody>

                            <DrawerFooter>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <div className="flex gap-1 -ml-3">
                        <HiLocationMarker className="size-6 m-auto" />
                        <p className="text-1xl font-semibold m-auto">Bandung</p>
                    </div>
                    <Avatar size="sm" name='Dan Abrahmov' src={profileInfo?.profile_pict} onClick={() => navigate("/merchant/profile")} />
                </Box>
            </div>
        </>
    )
}

export default NavBar