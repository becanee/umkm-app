import {Input, InputGroup, InputLeftElement} from '@chakra-ui/react'
import {ChatList} from 'react-chat-elements';
import {HiOutlineSearch} from 'react-icons/hi'
import {useNavigate} from 'react-router-dom';
import useLogic from "./_logic";
import {useEffect} from "react";

export const Index = () => {
    const navigate = useNavigate();
    const {chats, getUserByID}: any = useLogic();
    // const a = moment.utc(new Date()).tz("Asia/Jakarta");

    const onOpenChatRoom = async (e: any) => {
        // navigate(`/client/chat/merchant/${e.title}/service/${e.service_id}/chat/${e.id}`)
        navigate(`/merchant/chat/client/${e.title}/service/${e.service_id}/chat/${e.id}`)
    }

    const refactorChats = async () => {

        chats?.map(async (item: any, idx: any) => {
            let res: any = await getUserByID(item.client_id);
            console.log("CHT: ", res)
        })
    }

    useEffect(() => {
        refactorChats()
    }, [chats])

    return (
        <>
            <div>
                <InputGroup className="mb-8">
                    <InputLeftElement pointerEvents='none'>
                        <HiOutlineSearch size={20}/>
                    </InputLeftElement>
                    <Input type='text' placeholder='Cari kebutuhan mu!' borderRadius={15} boxShadow="md"/>
                </InputGroup>
            </div>
            {/* <div className="-ml-9 lg:-ml-9 min-w-[24.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"> */}
            <ChatList
                className='chat-list min-w-full'
                onClick={(e) => onOpenChatRoom(e)}
                dataSource={chats}/>
            {/* </div> */}
        </>
    )
}

export default Index