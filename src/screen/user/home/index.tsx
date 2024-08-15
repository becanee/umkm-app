import Cards from "./content/Cards"
import Footer from "./content/Footer"
import SearchBar from "./content/SearchBar"
import { NavBar } from "./content/NavBar"
import useLogic from "./content/_logic";
import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ClientHome = () => {
    const { setLoading, loading, services }: any = useLogic();
    const [serviceFiltered, setServiceFiltered]: any = useState([]);

    const handleSearch = async (e: any) => {
        setLoading(true);
        const filteredData = services.filter((el: any) => {
            if (e === '') {
                return el;
            }
            else {
                return el.name.toLowerCase().includes(e)
            }
        })

        setServiceFiltered(filteredData);
        setLoading(false);
    }

    const handleFilter = async (e: any) => {
        setLoading(true);
        const filteredData: any = services.filter((el: any) => {
            if (e === 'all') {
                return el;
            }
            else {
                return el.category.toLowerCase().includes(e)
            }
        })

        setServiceFiltered(filteredData);
        setLoading(false);
    }
    return (
        <>
            <NavBar />
            <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />
            <div className="grid grid-cols-2 gap-4 mt-auto h-96 overflow-y-scroll ">
                {
                    loading ? <>
                        <Skeleton mt={10} height='150px' />
                        <Skeleton mt={10} height='150px' />
                        <Skeleton mt={5} height='150px' />
                        <Skeleton mt={5} height='150px' />
                    </> : serviceFiltered?.length > 0 ? serviceFiltered.map((i: any, k: any) => {
                        return (<Cards key={k + 1} data={i} />)
                    }) : services?.map((item: any, key: any) => {
                        return (<Cards key={key + 1} data={item} />)
                    })
                }
            </div>
            <Footer />
        </>
    )
}
