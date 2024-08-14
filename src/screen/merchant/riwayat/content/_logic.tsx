import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders]: any = useState({});

  const getMyOrder = async () => {
    setLoading(true);
    const response: any = await axios.get(
      `http://localhost:2000/api/client-all-order/${Cookies.get("_UID")}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    setOrders(response.data.data);
    setLoading(false);
  };

  const getServicesByID = async(id: any) => {
    setLoading(true);
    const response: any = await axios.get(
      `http://localhost:2000/api/services/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    setLoading(false);
    return response.data.data;
  };

  useEffect(() => {
    return () => {
      getMyOrder();
    };
  }, []);

  return {
    getServicesByID,
    loading,
    orders,
  };
};

export default Index;
