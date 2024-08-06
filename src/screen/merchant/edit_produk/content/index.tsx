import {useNavigate} from "react-router-dom";
import {
    Button,
    Image,
    VStack,
    Input,
    FormControl,
    FormLabel,
    Select,
    useToast,
    Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure
} from "@chakra-ui/react"
import {getUserProfile} from "../../../../utils/cookie";
import {useEffect, useState} from "react";
import useLogic from "./_logic";

export const Index = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();
    const toast = useToast();
    const {service, setLoading, loading, handleUpdatePictureMerchant, handleUpdateServiceMerchant, handleDeleteServiceMerchant}: any = useLogic();
    const profileInfo = getUserProfile();
    const [file, setFile] = useState<string | undefined>(undefined);
    const [inputData, setInputData]: any = useState({
        name: service?.name,
        category: service?.category,
        desc: service?.desc,
        price_start: service?.price_start,
        picture: service?.picture,
    });


    async function handleChange(e: any) {
        setLoading(true);
        setFile(URL.createObjectURL(e.target?.files[0]));

        let formData: any = new FormData();
        formData.append('file', e.target?.files[0]);
        formData.append('name', service?.name);
        formData.append('category', service?.category);
        formData.append('desc', service?.desc);
        formData.append('price_start', service?.price_start);

        const res: any = await handleUpdatePictureMerchant(formData);
        if (res?.status) {
            // Cookies.set('_USER', JSON.stringify(res.data));
            toast({
                title: "Picture Uploaded!",
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
        const res: any = await handleUpdateServiceMerchant(inputData);
        if (res?.status) {
            toast({
                title: "Service Updated!",
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

    const onDelete = async () => {
        setLoading(true);
        const res: any = await handleDeleteServiceMerchant();
        if (res?.status) {
            toast({
                title: "Service Deleted!",
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
            name: service?.name,
            category: service?.category,
            desc: service?.desc,
            price_start: service?.price_start,
            picture: service?.picture,
        })
    }, [service.id]);

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
                    <Input type="file" disabled={loading} variant="unstyled" opacity={100} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Nama Produk/Jasa</FormLabel>
                    <Input type='text' disabled={loading} borderRadius={15}
                           onChange={(e) => setInputData({...inputData, name: e.target.value})}
                           defaultValue={inputData?.name} boxShadow='md'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Kategori</FormLabel>
                    <Select placeholder='Pilih Kategori' disabled={loading}
                            onChange={(e) => setInputData({...inputData, category: e.target.value})}
                            _selected={inputData?.category}>
                        <option value='barang'>Produk</option>
                        <option value='jasa'>Jasa</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Harga</FormLabel>
                    <Input type='text' disabled={loading} borderRadius={15}
                           onChange={(e) => setInputData({...inputData, price_start: e.target.value})}
                           defaultValue={inputData?.price_start} boxShadow='md'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Deskripsi</FormLabel>
                    <Input type='text' borderRadius={15}
                           onChange={(e) => setInputData({...inputData, desc: e.target.value})}
                           defaultValue={inputData?.desc} boxShadow='md' height="20"/>
                </FormControl>
                <div className="mt-14 ml-8 mx-auto">
                    <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20}
                            isLoading={loading} loadingText='Please wait...' onClick={onSubmit}>Simpan
                        Perubahan</Button>
                    <Button color="white" size='lg' w={300} bgColor={['red']} className="mt-6" variant='solid'
                            borderRadius={20} isLoading={loading} loadingText='Please wait...'
                            onClick={onOpen}>Delete</Button>
                </div>
            </VStack>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent style={{margin: 10}}>
                    <ModalHeader>Delete {inputData?.name} ?</ModalHeader>
                    <ModalCloseButton/>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onDelete}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Index