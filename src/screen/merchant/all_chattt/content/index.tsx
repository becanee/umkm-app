import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ChatList } from 'react-chat-elements';
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import useLogic from "./_logic";

export const Index = () => {
  const navigate = useNavigate();
  const { services }: any = useLogic();


  const onOpenChatRoom = async (e: any) => {
    Cookies.set('_MRC', JSON.stringify(e))

    navigate(`/merchant/chat/client/${services?.users?.username}/service/${e.id}`)
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
      {/* <div className="-ml-9 lg:-ml-9 min-w-[24.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"> */}
      <ChatList
        className='chat-list min-w-full'
        onClick={(e) => onOpenChatRoom(e)}
        dataSource={[
          {
            id: 1,
            avatar: 'https://i.ibb.co.com/ZgNvztB/image.png',
            alt: 'Sate',
            title: '{Mrc_Username} | Sate',
            subtitle: "Ya, betul pak, say... ",
            date: new Date(),
            unread: 3,
          },
          {
            id: 3,
            avatar: 'https://s1.bukalapak.com/img/17571371692/s-400-400/data.jpeg.webp',
            alt: 'Sol Sepatu',
            title: '{Mrc_Username} | Sol Sepatu',
            subtitle: "Ya, betul pak, say... ",
            date: new Date(),
            unread: 3,
          },
        ]} />
      {/* </div> */}
    </>
  )
}

export default Index