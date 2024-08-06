import axios from "axios";

const Index = () => {
    const handleLoginMerchant = async (formData: any) => {
        const response: any = await axios.post(`http://localhost:2000/api/login`, formData);
        return response.data;
    };

    return {
        handleLoginMerchant
    };
};

export default Index;
