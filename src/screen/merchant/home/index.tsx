import Cards from "./content/Cards"
import Footer from "./content/Footer"
import SearchBar from "./content/SearchBar"
import { NavBar } from "./content/NavBar"
import useLogic from "./content/_logic";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const MerchantHome = () => {
    const { loading, services } = useLogic();
    const navigate = useNavigate();


    return (
        <>
            <NavBar />
            <SearchBar />
            <div className="grid grid-cols-2 gap-4 mb-auto">
                {
                    loading ? <>
                        <Skeleton mt={10} height='150px' />
                        <Skeleton mt={10} height='150px' />
                        <Skeleton mt={5} height='150px' />
                        <Skeleton mt={5} height='150px' />
                    </> : services?.length > 0 ? services.map((i, k) => {
                        return (
                            <Cards key={k + 1} data={i} />
                        )
                    }) : null
                }
            </div>

            {
                !loading && services?.length < 1 ? <>
                    <Alert
                        status='info'
                        variant='subtle'
                        flexDirection='column'
                        borderRadius={20}
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='180px'
                        mt={28}
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Belum Ada Produk/Jasa
                        </AlertTitle>
                        <AlertDescription mt={5} minWidth='lg'>
                            <Button colorScheme='telegram' variant='outline' onClick={() => navigate("/merchant/addproduct")}>
                                Tambah
                            </Button>
                        </AlertDescription>
                    </Alert>
                </> : null
            }
            <Footer />
        </>
    )
}
