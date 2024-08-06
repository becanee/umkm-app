import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import useLogic from "./_logic";

export const Index = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData]: any = useState({
        role: "user"
    });
    const { handleRegisterMerchant } = useLogic();

    const onSubmit = async () => {
        setLoading(true);
        const res: any = await handleRegisterMerchant(inputData);
        if (res?.status) {
            toast({
                title: "sign up Success",
                duration: 5000,
                status: 'success',
                variant: 'top-accent',
                position: "top",
                isClosable: true,
            });
            setLoading(false);
            navigate("/client/success");
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
            <div className="flex justify-center items-center -mt-[4rem]">
                <img src="/assets/images/bg-gradient.png" className='' alt="" />
            </div>

            <div className="flex justify-center items-center m-auto w-[20rem] -mt-[19rem]">
                <img src="/assets/images/user/signup-user.png" className='' alt="" />
            </div>

            <p className="text-lg text-center text-gray-900 mb-10 lg:mb-5 mt-24 lg:mt-32">
                Ayo daftar untuk memulai!
            </p>


            <div className="flex justify-center items-center">
            <VStack
                    spacing={4}
                >
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <HiOutlineMail size={24} />
                            {/* <PhoneIcon color='gray.300' /> */}
                        </InputLeftElement>
                        <Input type='number' name="phone_number" disabled={loading} onChange={(e) => setInputData({ ...inputData, phone_number: e.target.value })} placeholder='081xxxx' />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <HiOutlineUser size={24} />
                            {/* <PhoneIcon color='gray.300' /> */}
                        </InputLeftElement>
                        <Input type='text' name="username" disabled={loading} onChange={(e) => setInputData({ ...inputData, username: e.target.value })} placeholder='Nama Pengguna' />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <HiOutlineLockClosed size={24} />
                            {/* <PhoneIcon color='gray.300' /> */}
                        </InputLeftElement>
                        <Input type={show ? 'text' : 'password'} name="password" disabled={loading} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} placeholder='Kata Sandi' />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                                {show ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <div className="mt-10">
                        {/* <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20} onClick={() => navigate("/merchant/success")}>Daftar</Button> */}
                        <Button color="white" size='lg' w={300} bgColor={['#5DB329']} isLoading={loading} loadingText='Please wait...' onClick={onSubmit} variant='solid' borderRadius={20}>Daftar</Button>
                    </div>
                </VStack>
            </div>
        </>
    )
}
