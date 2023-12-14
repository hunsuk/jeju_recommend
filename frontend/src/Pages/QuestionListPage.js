import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

//todo : 모듈화 - 파일 나누기
//todo : 페이지네이션 가운데 정렬 취소
//todo : 추천받기 버튼 클릭시 text, 버튼 없어지게

const QuestionListPage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [foodStores, setFoodStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  const questions = [
    "1. 사람 많은 곳을 좋아하십니까?",
    "2. 엑티비티를 즐기시는 편입니까?",
    "3. 자연을 즐기시는 편입니까?",
    "4. 채식주의자입니까?",
    "5. 수산물을 좋아하십니까?",
    "6. 매운 것을 좋아하십니까?",
    "7. 자가용을 이용하십니까?",
    "8. 흡연자이십니까?",
    "9. 아침을 드시는 편입니까?",
    "10. 아이와 함께 여행하실 예정입니까?",
    "11. 일행이 3인 이상입니까?",
  ];

  const handleButtonClick = (response) => {
    setAnswers((prevAnswers) => [...prevAnswers, response]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // 서버에 응답 전송 및 받기
  const sendAnswersToServer = () => {
    axios
      .post("http://localhost:9090/api/capstone/getResult/", { answers })
      .then((response) => {
        const { Destinaion, Lodging, FoodStore } = response.data;

        // 각 배열을 상태로 업데이트
        setDestinations(Destinaion);
        setLodgings(Lodging);
        setFoodStores(FoodStore);

        console.log("서버 응답:", Destinaion, Lodging, FoodStore);
      })
      .catch((error) => {
        console.error("Error sending answers to server:", error);
      });
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const renderItems = (items) => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex).map((item) => (
      <Box
        key={item.id}
        p={4}
        borderWidth="3px"
        borderRadius="lg"
        width="300px"
      >
        <Image src={item.URL} alt={item.title} mb={2} borderRadius="lg" />
        <Text mb={2}>{item.title}</Text>
        <Text>{item.intrudcution}</Text>
      </Box>
    ));
  };

  return (
    <Container centerContent justifyContent={"center"}>
      <Heading m={4}>질문에 답해주세요</Heading>
      <Text align="center" mb={4}>
        관광지, 숙소, 음식점을 차례로 추천해드립니다
      </Text>
      <VStack spacing={10} align="center">
        {questionIndex < questions.length && (
          <Box
            p={4}
            borderWidth="3px"
            borderRadius="lg"
            width="300px"
            height="70vh"
            align="center"
          >
            <Text paddingTop={40} paddingBottom={5}>
              {questions[questionIndex]}
            </Text>
            <Button
              p={5}
              colorScheme="teal"
              onClick={() => handleButtonClick("Yes")}
            >
              예
            </Button>
            <Button
              p={5}
              marginLeft={5}
              colorScheme="red"
              onClick={() => handleButtonClick("No")}
            >
              아니요
            </Button>
          </Box>
        )}

        {questionIndex === questions.length && (
          <>
            <Button
              colorScheme="teal"
              size="lg"
              mt={4}
              onClick={sendAnswersToServer()}
            >
              추천 받기
            </Button>
          </>
        )}

        <Tabs isFitted>
          <TabList mb="4">
            <Tab>관광지</Tab>
            <Tab>숙소</Tab>
            <Tab>음식점</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {destinations.length > 0 && (
                <VStack spacing={4} align="center">
                  {renderItems(destinations)}
                  <ReactPaginate
                    pageCount={Math.ceil(destinations.length / itemsPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </VStack>
              )}
            </TabPanel>
            <TabPanel>
              {lodgings.length > 0 && (
                <VStack spacing={4} align="center">
                  {renderItems(lodgings)}
                  <ReactPaginate
                    pageCount={Math.ceil(lodgings.length / itemsPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </VStack>
              )}
            </TabPanel>
            <TabPanel>
              {foodStores.length > 0 && (
                <VStack spacing={4} align="center">
                  {renderItems(foodStores)}
                  <ReactPaginate
                    pageCount={Math.ceil(foodStores.length / itemsPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </VStack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Link to="/">Go to Home Page</Link>
    </Container>
  );
};
export default QuestionListPage;
