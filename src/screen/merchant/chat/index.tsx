import Footer from "./content/Footer"
import { Index as Content } from "./content"
import { NavBar } from "./content/NavBar"
import { ChatProvider } from "../../../contexts/chat"

export const MerchantChat = () => {
    return (
        <>
            <ChatProvider>
                <NavBar />
                <Content />
                <Footer />
            </ChatProvider>
        </>
    )
}
