import axios from "axios";
import Cookies from "js-cookie";

const Index = () => {
    const handleUpdateProfileClient = async (formData: any) => {
        const response: any = await axios.post(`http://localhost:2000/api/user/update/${Cookies.get('_UID')}`, formData);
        return response.data;
    };

    const handleUpdateAvatarClient = async (formData: any) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response: any = await axios.post(`http://localhost:2000/api/user/update-avatar/${Cookies.get('_UID')}`, formData, config);
        return response.data;
    };

    return {
        handleUpdateAvatarClient,
        handleUpdateProfileClient
    };
};

export default Index;
