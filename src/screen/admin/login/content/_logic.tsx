import axios from "axios";

const Index = () => {
    const handleLoginAdmin = async (formData: any) => {
        const response: any = await axios.post(`https://bf23-103-119-141-126.ngrok-free.app/api/login`, formData);
        return response.data;
    };

    return {
        handleLoginAdmin
    };
};

export default Index;
