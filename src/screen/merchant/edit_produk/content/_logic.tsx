import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Index = () => {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);

    const getServiceByID = async () => {
        setLoading(true);
        const response: any = await axios.get(`http://localhost:2000/api/services/${Cookies.get('_SERV_MRC')}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });

        if (response.data?.status) {
            setService(response.data.data)
        }

        setLoading(false);
        return response.data;
    };

    const handleUpdateServiceMerchant = async (formData: any) => {
        const response: any = await axios.post(`http://localhost:2000/api/services/update/${Cookies.get('_SERV_MRC')}`, formData);
        return response.data;
    };

    const handleUpdatePictureMerchant = async (formData: any) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response: any = await axios.post(`http://localhost:2000/api/services/update-picture/${Cookies.get('_SERV_MRC')}`, formData, config);
        return response.data;
    };

    const handleDeleteServiceMerchant = async () => {
        const response: any = await axios.delete(`http://localhost:2000/api/services/delete/${Cookies.get('_SERV_MRC')}`);
        return response.data;
    };

    useEffect(() => {
        getServiceByID();
    }, [])

    return {
        setLoading,
        loading,
        service,
        setService,
        handleUpdatePictureMerchant,
        handleUpdateServiceMerchant,
        handleDeleteServiceMerchant
    };
};

export default Index;
