import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Index = () => {
    const user: any = Cookies.get('_USER');
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);


    const handleLogoutMerchant = async () => {
        const response: any = await axios.post(`http://localhost:2000/api/logout`, {}, {
            headers: {
                User_ID: Cookies.get('_UID'),
                Authorization: Cookies.get('_T')
            }
        });

        return response.data;
    };

    const getServices = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/merchant/${JSON.parse(user).username}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setServices(response.data.data);
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            getServices();
        }
    }, [])

    return {
        handleLogoutMerchant,
        loading,
        services
    };
};

export default Index;
