import axios from "axios";

const Index = () => {
    const handleLoginAdmin = async (formData: any) => {
        const response: any = await axios.post(`http://localhost:2000/api/login`, formData);
        return response.data;
    };

    return {
        handleLoginAdmin
    };
};

export default Index;
