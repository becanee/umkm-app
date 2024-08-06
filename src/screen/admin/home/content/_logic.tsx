import axios from "axios";

const Index = () => {
  const getUserRequest = async () => {
    const response: any = await axios.get(`http://localhost:2000/api/users`);
    return response.data.data;
  };

  const handleUpdateProfileClient = async (formData: any) => {
    const response: any = await axios.post(
      `http://localhost:2000/api/user/update/${formData?.id}`,
      formData
    );
    return response.data;
  };
  return {
    getUserRequest,
    handleUpdateProfileClient,
  };
};

export default Index;
