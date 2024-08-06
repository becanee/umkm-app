import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ChatList } from 'react-chat-elements';
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import useLogic from "./_logic";

export const Index = () => {
  const navigate = useNavigate();
  const { services, chats }: any = useLogic();
  // const a = moment.utc(new Date()).tz("Asia/Jakarta");

  const onOpenChatRoom = async (e: any) => {
    navigate(`/client/chat/merchant/${e.title}/service/${e.service_id}/chat/${e.id}`)
  }

  return (
    <>
    <div>
      <InputGroup className="mb-8">
        <InputLeftElement pointerEvents='none'>
          <HiOutlineSearch size={20} />
        </InputLeftElement>
        <Input type='text' placeholder='Cari kebutuhan mu!' borderRadius={15} boxShadow="md" />
      </InputGroup>
    </div>
    <div className="-ml-8 w-[420px] grid grid-cols-1 lg:grid-cols-1">
    <ChatList
      className=''
      onClick={(e) => onOpenChatRoom(e)}
      dataSource={chats} />
      </div>
    </>
  )
}

export default Index