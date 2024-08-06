import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Image } from "@chakra-ui/react"
import useLogic from "./_logic";
import moment from 'moment-timezone';
import { getActiveMerchantProfile, getUserProfile } from "../../../../utils/cookie";
import Cookies from "js-cookie";

export const Index = () => {
    const navigate = useNavigate();
    const { services, newchat } = useLogic();
    const a = moment.utc(new Date()).tz("Asia/Jakarta");
    const profileInfo = getUserProfile();
    
    // console.log(profileInfo, profileInfoMrc);
    
    const handleNewChatClient = async () => {
        const profileInfoMrc: any = getActiveMerchantProfile();
        // Cookies.set('_MRC', JSON.stringify(services?.users));

       await newchat({
            avatar: services?.users?.profile_pict,
            alt: services?.name,
            title: services?.users?.username,
            subtitle: "",
            date: a.format(),
            unread: 0,
            status: "",
            client_id: profileInfo?.id,
            merchant_id: profileInfoMrc?.id,
            service_id: Cookies.get('_S'),
        });

        navigate(`/client/chat/merchant/${profileInfoMrc?.username}/service/${Cookies.get('_S')}/chat/:chat_id`)
    }

    return (
        <>
            <div className="flex justify-center items-center -mt-[8rem]">
                <img src="/assets/images/bg-gradient.png" className='' alt="" />
            </div>

            <div className="flex justify-center items-center m-auto w-[24rem] -mt-[19rem]">
                <img src="/assets/images/user/items.png" className='' alt="" />
            </div>
            <div className="-mt-10">
                <p className="text-xl font-semibold text-gray-900 mt-24 lg:mt-16 px-4">
                    Mau pesan ini? <br />
                    Ayo hubungi pedangang!
                </p>
            </div>
            <div className="flex justify-between mt-14">
                <div className="grid grid-rows-2 gap-6 w-48">
                    <div>
                        <h1 className="text-2xl font-bold text-[#3F3D56]">{services?.name}</h1>
                        <h2 className="text-lg font-semibold text-[#3F3D56]">About this product</h2>
                    </div>
                    <p className="-mt-6">{services?.desc}</p>
                </div>
                <Card
                    borderRadius={20}
                    className="relative grid h-[8rem] w-full max-w-[8rem] items-end justify-center overflow-hidden text-center"
                >
                    <CardHeader
                        boxShadow="md"
                        color="transparent"
                        className={`absolute inset-0 m-0 h-full w-full rounded-none`}
                        style={{ background: "rgba(10, 10, 10, 0.88)" }}
                    >
                        <Image src={services?.picture} alt='Dan Abramov' opacity={0.5} className='absolute inset-0 m-0 h-full w-full rounded-none' />

                    </CardHeader>
                    <CardBody className="m-auto py-14 px-6">
                    </CardBody>
                </Card>
            </div>
            <div className="flex justify-center m-12 drop-shadow-2xl shadow-2xl">
                <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={25} onClick={() => handleNewChatClient()}>Contact the seller</Button>
            </div>
        </>
    );
}

export default Index