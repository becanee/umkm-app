import { ChatProvider } from "../../../contexts/chat"
import Footer from "../home/content/Footer"
import { Index as Content } from "./content"

export const MerchantAllChat = () => {
    return (
        <>
            <ChatProvider>
                <Content />
                <Footer />
            </ChatProvider>
        </>
    )
}
