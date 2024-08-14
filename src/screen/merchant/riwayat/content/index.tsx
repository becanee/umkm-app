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
  const navigate = useNavigate();
  const { getServicesByID, orders } = useLogic();
  const [allOrder, setAllOrder] = useState([]);

  const refactorOrders = async () => {
    let mergeOrder: any = [];
    orders?.map(async (item: any) => {
      let resService: any = await getServicesByID(item.service_id);
      const filterData = resService.filter((el: any) => el.rating !== null)
      
      filterData.push({
        ...item,
        service: resService,
      });
    });

    setAllOrder(mergeOrder);
  };

  useEffect(() => {
    refactorOrders();
  }, [orders]);

  return (
    <>
      <div
        className="-ml-9 lg:-ml-9 min-w-[26.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1"
        onClick={() => navigate("/client/rating")}
      >
        {allOrder.map((item: any) => {
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
                        <Text display={'flex'}>
                        <IoStarSharp color="yellow" /> {item.rating}
                          {/* {item?.rating !== 0
                            ? new Array(item.rating)?.map(() => {
                                return <IoStarSharp color="yellow" />;
                              })
                            : null} */}
                        </Text>
                      </Box>
                    </Flex>
                    <Text ml={0}>14:17</Text>
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
