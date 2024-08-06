import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Index = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState({});

    const getServices = async () => {
        setLoading(true);
        const response: any = await axios.get(`https://bf23-103-119-141-126.ngrok-free.app/api/services/${params.service_id}`, {
            headers: {
                "ngrok-skip-browser-warning": 'true'
            }
        });
        setServices(response.data.data);
        setLoading(false);
    };

    return {
        getServices,
        loading,
        services
    };
};

export default Index;
