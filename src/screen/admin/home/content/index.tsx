import { Avatar, Box, Button, Card, CardHeader, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


export const Index = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <div className="-ml-9 lg:-ml-9 min-w-[26.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"
                onClick={onOpen}>
                {
                    [1, 2, 3].map(() => {
                        return (
                            <>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Meminta Persetujuan</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            Nama Merchant <br/>
                                            No telepon <br/>
                                            alamat <br/>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme='whatsapp' mr={3}>
                                                Accept
                                            </Button>
                                            <Button colorScheme='red'>Decline</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <Card className=''>
                                    <CardHeader>
                                        <Flex>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                                <Box>
                                                    <Heading size='sm'>Nama Produk</Heading>
                                                    <Text>Rating</Text>
                                                </Box>
                                            </Flex>
                                            <Text ml={0}>14:17</Text>
                                        </Flex>
                                    </CardHeader>
                                </Card>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Index