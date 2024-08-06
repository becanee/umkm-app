import { Avatar, Box, Card, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'


export const Index = () => {
  return (
    <>
      <div className="-ml-9 lg:-ml-9 min-w-[26.5rem] lg:min-w-[24.5rem] grid grid-cols-1 lg:grid-cols-1">
        {
          [1, 2, 3].map(() => {
            return (
              <>
                <Card className=''>
                  <CardHeader>
                    <Flex>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                          <Heading size='sm'>Nama Produk</Heading>
                          <Text>Rating</Text>
                        </Box>
                      </Flex>
                          <Text ml={0}>14:17</Text>
                    </Flex>
                  </CardHeader>
                </Card>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Index