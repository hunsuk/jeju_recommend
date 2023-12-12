// JejuMap.jsx

import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const JejuMap = () => {
  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={4}>
        제주도 지도
      </Heading>
      <Flex justifyContent="center">
        <img
          src={process.env.PUBLIC_URL + "Jeju-do.svg"}
          alt="Jeju Map"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Flex>
    </Box>
  );
};

export default JejuMap;
