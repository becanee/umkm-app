import axios from "axios";

const Index = () => {
    const handleRegisterMerchant = async (formData: any) => {
        const response: any = await axios.post(`http://localhost:2000/api/register`, formData);
        return response.data;
    }; 

    return {
        handleRegisterMerchant
    };
};

export default Index;
