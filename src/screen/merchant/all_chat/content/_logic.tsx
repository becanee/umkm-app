import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../../utils/cookie";

const Index = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState({});
    const [chats, setChats] = useState([]);
    const profileInfo = getUserProfile();


    const getServices = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/${params?.service_id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setServices(response.data.data);
        setLoading(false);
    };

    const getServiceForallChat = async (param?: any) => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/${param}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setLoading(false);
        return response.data.data;
    };

    const getAllChat = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/merchant-all-chat/${profileInfo?.id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        
        setChats(response.data.data);
        setLoading(false);
    };

    const getUserByID = async (id: any) => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/user/${id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });

        setLoading(false);
        return response.data.data;
    };

    useEffect(() => {
        getAllChat();
    }, [])

    return {
        getServices,
        getServiceForallChat,
        getUserByID,
        loading,
        services,
        chats
    };
};

export default Index;
