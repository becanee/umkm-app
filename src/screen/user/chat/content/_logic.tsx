import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Index = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState({});
    const [chatParent, setChatParent] = useState({});
    const [chatHistory, setChatHistory] = useState([]);

    const getServices = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/${params.service_id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setServices(response.data.data);
        setLoading(false);
    };

    const getchatParentHistory = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/chat-parent-history/${params.chat_id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setChatParent(response.data.data[0]);
        setLoading(false);
    };

    const getchatHistory = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/chat-history/${params.chat_id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setChatHistory(response.data.data);
        setLoading(false);
    };

    const placeOrder = async (formData: any) => {
        setLoading(true);
        await axios.post(`http://localhost:2000/api/new-order-message/${params.chat_id}`, formData, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        await getchatParentHistory();
        setLoading(false);
    };

    const addRating = async (formData: any) => {
        setLoading(true);
        const response: any = await axios.post(`http://localhost:2000/api/client-add-rating/${params.chat_id}`, formData, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        await getchatParentHistory();
        setLoading(false);
        return response.data.data;
    };

    const sendMessage = async (formData: any) => {
        setLoading(true);
        const response: any = await axios.post(`http://localhost:2000/api/new-message`, formData, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        await getchatHistory();
        return response.data;
        setLoading(false);
    };

    useEffect(() => {
        getServices();
        getchatParentHistory();
        setTimeout(() => {
            getchatHistory();
        }, 1500);
    }, [])

    return {
        addRating,
        getServices,
        placeOrder,
        sendMessage,
        loading,
        services,
        chatParent,
        chatHistory
    };
};

export default Index;
