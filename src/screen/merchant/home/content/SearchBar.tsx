import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { HiOutlineSearch } from "react-icons/hi";
import { getUserProfile } from "../../../../utils/cookie";

const SearchBar = () => {
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
                <Input type='text' placeholder='Cari kebutuhan mu!' borderRadius={15} boxShadow="md" />
            </InputGroup>
        </>
    )
}

export default SearchBar