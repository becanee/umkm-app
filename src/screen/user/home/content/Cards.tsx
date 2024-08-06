import { Card, CardHeader, CardBody, Text, Image, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Cards = ({ data }: any) => {
    const navigate = useNavigate();

    const viewService = () => {
        Cookies.set('_S', data?.id)
        navigate("/client/item");
    }
    return (
        <>
            <Card
                borderRadius={20}
                className="relative grid h-[11rem] w-full max-w-[11rem] items-end justify-center overflow-hidden text-center mt-20 -mb-20"
                onClick={() => viewService()}
            >
                <CardHeader
                    boxShadow="md"
                    color="transparent"
                    className={`absolute inset-0 m-0 h-full w-full rounded-none`}
                    style={{ background: "rgba(10, 10, 10, 0.88)" }}
                >
                    <Image src={data?.picture} alt='Dan Abramov' opacity={0.5} className='absolute inset-0 m-0 h-full w-full rounded-none' />
                </CardHeader>
                <CardBody className="m-auto py-14 px-6">
                    <Text className='relative text-white text-3xl mt-10'>{data?.name}</Text>
                    <div className="flex items-stretch ">
                        <p className="text-white self-start absolute bottom-6 left-2 text-[10px]">Mulai Dari</p>
                        <p className="text-white self-start absolute bottom-2 left-2 text-[14px]">Rp.{parseInt(data?.price_start).toLocaleString('id')}</p>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Cards