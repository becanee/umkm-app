import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useLogic from "./_logic";
import { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";

export const Index = () => {
  const { getServicesByID, orders } = useLogic();
  const [allOrder, setAllOrder] = useState([]);

  const refactorOrders = async () => {
    let mergeOrder: any = [];

    orders?.map(async (item: any) => {
      let resService: any = await getServicesByID(item.service_id);

      mergeOrder.push({
        ...item,
        service: resService,
      });
    });

    setAllOrder(mergeOrder);
  };

  useEffect(() => {
    if (orders) {
      refactorOrders();
    }
  }, [orders?.length]);

  return (
    <>
      <div
        className="-ml-9 lg:-ml-9 min-w-[26.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"
        // onClick={() => navigate("/client/rating")}
      >
        {allOrder.map((item: any) => {
          console.log("🚀 ~ {allOrder.map ~ item:", item);
          return (
            <>
              <Card className="">
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={item?.service?.name}
                        src={item?.service?.picture}
                      />

                      <Box>
                        <Heading size="sm">{item?.service?.name}</Heading>
                        <Text display={"flex"}>
                          {item.rating ? (
                            <>
                              <IoStarSharp color="yellow" /> {item.rating}
                            </>
                          ) : <div className="color-yellow">Belum Memberi Rating</div>}
                          {/* {item?.rating !== 0
                            ? new Array(item.rating)?.map(() => {
                                return <IoStarSharp color="yellow" />;
                              })
                            : null} */}
                        </Text>
                      </Box>
                    </Flex>
                    {/* <Text ml={0}>14:17</Text> */}
                  </Flex>
                </CardHeader>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Index;
