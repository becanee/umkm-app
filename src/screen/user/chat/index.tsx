import Footer from "./content/Footer"
import { Index as Content } from "./content"
import { NavBar } from "./content/NavBar"
import { ChatProvider } from "../../../contexts/chat"

export const ClientChat = () => {
    return (
        <>
            <ChatProvider>
                <NavBar />
                {/* <div className="h-screen grid grid-rows-[2fr_auto]"> */}
                <div className="h-screen bg-surface-500/30 overflow-y-auto overflow-x-hidden max-h-[39rem]"><Content /></div>
                {/* <div className="bg-gray-300 p-0"><Footer /></div> */}
                {/* </div> */}
                {/* <Content /> */}
                <Footer />
            </ChatProvider>
        </>
    )
}
