import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Index = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices]: any = useState({});

    const getServices = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/${Cookies.get('_S')}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        await Cookies.set('_MRC', JSON.stringify(response.data?.data?.users));
        setServices(response.data.data);
        setLoading(false);
    };

    const newchat = async (formData: any) => {
        setLoading(true);
        await axios.post(`http://localhost:2000/api/client-new-chat`, formData, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            getServices();
        }
    }, [])

    return {
        loading,
        services,
        newchat
    };
};

export default Index;
