import { Button, ButtonGroup, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../../utils/cookie";

const SearchBar = ({ handleSearch, handleFilter }: any) => {
    // const navigate = useNavigate();
    const profileInfo = getUserProfile();
    return (
        <>
            <div className="mt-10">
                <p className="text-2xl font-semibold">Hai {profileInfo?.username}</p>
                <p className="text-lg text-secondary font-semibold">Mari kita cari pesanan Anda</p>
            </div>
            <InputGroup className="mt-10">
                <InputLeftElement pointerEvents='none'>
                    <HiOutlineSearch size={20} />
                </InputLeftElement>
                <Input type='text' placeholder='Cari kebutuhan mu!' borderRadius={15} boxShadow="md" onChange={(e) => handleSearch(e.target.value)} />
            </InputGroup>
            <div className="flex mt-8 lg:mt-14 justify-center items-center">
                <ButtonGroup variant="solid" spacing={-2}  >
                    <Button className="w-[30vw]" size='lg' colorScheme='whatsapp' variant='solid' borderLeftRadius={20} onClick={() => handleFilter('all')}>Semua</Button>
                    <Button className="w-[30vw] border-l-2 border-solid border-gray-200" size='lg' colorScheme='whatsapp' variant='solid' borderLeftRadius={0} borderRightRadius={0} onClick={() => handleFilter("barang")}>Barang</Button>
                    <Button className="w-[30vw] border-l-2 border-solid border-gray-200" size='lg' colorScheme='whatsapp' variant='solid' borderLeftRadius={0} borderRightRadius={20} onClick={() => handleFilter("jasa")}>Jasa</Button>
                </ButtonGroup>
            </div>
        </>
    )
}

export default SearchBar