// src/Pages/DolsiPage.jsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DolsiPage = () => {
  return (
    <Box
      p={4}
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading as="h1" fontFamily="SOYOMapleBoldTTF" paddingTop={6}>
        🍊 돌씨 여행 플래너
      </Heading>

      <Divider
        colorScheme="teal"
        my={3}
        borderWidth={"2px"}
        variant={"solid"}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={process.env.PUBLIC_URL + "/page.jpeg"}
          alt="Dolsi Image"
          boxSize={{ base: "100%", md: "50%" }}
          objectFit="cover"
          borderRadius="md"
          mb={{ base: 4, md: 0 }}
        />

        <Stack>
          <Link to="/question">
            <Button textAlign="center" colorScheme="teal" size="lg" mb={4}>
              여행 일정 만들기
            </Button>
          </Link>

          <Text fontSize={"px"}>
            여행 일정을 계획하고,<br></br> 즐거운 여행을 만들어보세요<br></br>
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default DolsiPage;
