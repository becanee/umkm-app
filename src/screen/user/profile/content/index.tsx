import { useNavigate } from "react-router-dom";
import { Button, Image, VStack, Input, FormControl, Select, FormLabel, useToast } from "@chakra-ui/react"
import { getUserProfile } from "../../../../utils/cookie";
import { useState } from "react";
import useLogic from "./_logic";
import Cookies from "js-cookie";

export const Index = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const profileInfo = getUserProfile();
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        username: profileInfo?.username,
        phone_number: profileInfo?.phone_number,
        address: profileInfo?.address,
        profile_pict: profileInfo?.profile_pict,
    });
    const { handleUpdateProfileClient, handleUpdateAvatarClient } = useLogic();
    const [file, setFile] = useState<string | undefined>(undefined);

    async function handleChange(e: any) {
        setLoading(true);
        setFile(URL.createObjectURL(e.target?.files[0]));
        
        let formData: any = new FormData();
        formData.append('file', e.target?.files[0]);
        formData.append('username', profileInfo?.username);
        formData.append('phone_number', profileInfo?.phone_number);
        formData.append('address', profileInfo?.address);
        
        const res: any = await handleUpdateAvatarClient(formData);
        if (res?.status) {
            Cookies.set('_USER', JSON.stringify(res.data));
            toast({
                title: "Avatar Uploaded!",
                duration: 3000,
                status: 'info',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            setLoading(false);
        }
    }

    const onSubmit = async () => {
        setLoading(true);
        const res: any = await handleUpdateProfileClient(inputData);
        if (res?.status) {
            Cookies.set('_USER', JSON.stringify(res.data))

            toast({
                title: "Profile Updated!",
                duration: 5000,
                status: 'success',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            setLoading(false);
            navigate("/client/home");
        } else {
            toast({
                title: res?.message,
                duration: 5000,
                status: 'error',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src={file}
                    alt={profileInfo?.username}
                    borderRadius={10}
                />
            </div>
            <VStack spacing={4} className="mt-16">
                <FormControl>
                    <FormLabel>Upload Gambar</FormLabel>
                    <Input type="file" variant="unstyled" opacity={100} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>Nama Pengguna</FormLabel>
                    <Input type='text' borderRadius={15} onChange={(e) => setInputData({ ...inputData, username: e.target.value })} defaultValue={profileInfo?.username} boxShadow='md' />
                </FormControl>
                {/* <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password'borderRadius={15} boxShadow='md'/>
                </FormControl> */}
                <FormControl>
                    <FormLabel>Nomor Telefon</FormLabel>
                    <Input type='text' borderRadius={15} onChange={(e) => setInputData({ ...inputData, phone_number: e.target.value })} defaultValue={profileInfo?.phone_number} boxShadow='md' />
                </FormControl>
                <FormControl >
                    <FormLabel>Kota</FormLabel>
                    <Select disabled borderRadius={15} boxShadow='md'>
                        <option>Bandung</option>
                        <option>Kepo</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Alamat</FormLabel>
                    <Input type='text' borderRadius={15} onChange={(e) => setInputData({ ...inputData, address: e.target.value })} defaultValue={profileInfo?.address} boxShadow='md' height="20" />
                </FormControl>
                <div className="mt-14">
                    <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20} isLoading={loading} loadingText='Please wait...' onClick={onSubmit}>Simpan Perubahan</Button>
                </div>
            </VStack>
        </>
    )
}

export default Index