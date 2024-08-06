import { useNavigate } from "react-router-dom";
import { Button, Image, VStack, Input, FormControl, FormLabel, Select, useToast } from "@chakra-ui/react"
import { getUserProfile } from "../../../../utils/cookie";
import { useEffect, useState } from "react";
import useLogic from "./_logic";
import Cookies from "js-cookie";

export const Index = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { service, setLoading, loading, handleAddServiceMerchant }: any = useLogic();
    const profileInfo = getUserProfile();
    const [file, setFile] = useState<string | any>(undefined);
    const [file2, setFile2] = useState<string | any>(undefined);
    const [inputData, setInputData] = useState({
        user_id: Cookies.get('_UID'),
        name: "",
        category: "",
        desc: "",
        price_start: "",
        picture: "",
    });

    async function handleChange(e: any) {
        setLoading(true);
        setFile(URL.createObjectURL(e.target?.files[0]));
        setFile2(e.target?.files[0]);
        setLoading(false);
    }

    console.log("F: ", inputData);
    

    const onSubmit = async () => {
        setLoading(true);
        let formData: any = new FormData();
        formData.append('file', file2);
        formData.append('user_id', inputData?.user_id);
        formData.append('name', inputData?.name);
        formData.append('category', inputData?.category);
        formData.append('desc', inputData?.desc);
        formData.append('price_start', inputData?.price_start);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const res: any = await handleAddServiceMerchant(formData);
        if (res?.status) {
            toast({
                title: "Service Created!",
                duration: 5000,
                status: 'success',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            setLoading(false);
            navigate("/merchant/home");
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

    useEffect(() => {
        setInputData({
            user_id: Cookies.get('_UID'),
            name: "",
            category: "",
            desc: "",
            price_start: "",
            picture: "",
        })
    }, [Cookies.get('_UID')]);
    return (
        <>
            <div className="flex justify-center items-center">
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src={file ? file : service?.picture}
                    alt={profileInfo?.username}
                    borderRadius={10}
                />
            </div>
            <VStack spacing={4} className="mt-16">
                <FormControl>
                    <FormLabel>Upload Gambar</FormLabel>
                    <Input type="file" disabled={loading} variant="unstyled" opacity={100} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>Nama Produk/Jasa</FormLabel>
                    <Input type='text' disabled={loading} borderRadius={15} onChange={(e) => setInputData({ ...inputData, name: e.target.value })} defaultValue={service?.name} boxShadow='md' />
                </FormControl>
                <FormControl>
                    <FormLabel>Kategori</FormLabel>
                    <Select placeholder='Pilih Kategori' disabled={loading} onChange={(e) => setInputData({ ...inputData, category: e.target.value })} defaultValue={service?.category}>
                        <option value='barang'>Produk</option>
                        <option value='jasa'>Jasa</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Harga</FormLabel>
                    <Input type='text' disabled={loading} borderRadius={15} onChange={(e) => setInputData({ ...inputData, price_start: e.target.value })} defaultValue={service?.price_start} boxShadow='md' />
                </FormControl>
                <FormControl>
                    <FormLabel>Deskripsi</FormLabel>
                    <Input type='text' borderRadius={15} onChange={(e) => setInputData({ ...inputData, desc: e.target.value })} defaultValue={service?.desc} boxShadow='md' height="20" />
                </FormControl>
                <div className="mt-14">
                    <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20} isLoading={loading} loadingText='Please wait...' onClick={onSubmit}>Simpan Perubahan</Button>

                    {/* <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' isLoading={loading} loadingText='Please wait...' borderRadius={20} onClick={() => navigate("/merchant")}>Simpan Perubahan</Button> */}
                </div>
            </VStack>
        </>
    )
}

export default Index