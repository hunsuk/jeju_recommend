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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DolsiPage = () => {
  return (
    <Box
      p={8}
      textAlign="center"
      height="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading as="h1" size="2xl" mb={150}>
        돌씨 여행 플래너
      </Heading>

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

        <Stack flex="1" textAlign="left">
          <Text fontSize="xl" mb={4}>
            돌씨 여행 플래너를 통해 제주도의 아름다운 풍경과 다양한 명소를
            탐험하세요. 여행 일정을 계획하고 즐거운 여행을 만들어보세요!
          </Text>
          <Link to="/question">
            <Button colorScheme="teal" size="lg" mb={4}>
              여행 일정 만들기
            </Button>
          </Link>
          <Text fontSize="md">
            돌씨 여행 플래너는 제주도 여행을 계획하는 데 필요한 모든 정보를
            제공합니다. 즐거운 여행이 되길 바랍니다!
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default DolsiPage;
