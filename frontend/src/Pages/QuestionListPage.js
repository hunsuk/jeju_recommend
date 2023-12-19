import React, { useState } from "react";
import { Container, Heading, VStack, Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecommendationTabs from "../Components/RecommendationTabs";
import QuestionForm from "../Components/QuestionForm";

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
  const [hasSentAnswers, setHasSentAnswers] = useState(false); // 새로운 상태 추가

  const itemsPerPage = 4;

  const questions = [
    "1. 인스타 그램을 하시나요?",
    "2. 당신은 동물을 싫어 하시나요?",
    "3. 새로운 도전을 하는 것을 좋아한다?",
    "4. 현생에 지쳐있는 상태 이시나요?",
  ];

  const handleButtonClick = (response) => {
    setAnswers((prevAnswers) => [...prevAnswers, response]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // 서버에 응답 전송 및 받기
  const sendAnswersToServer = () => {
    axios
      .post("http://52.78.163.252:9090/api/capstone/getResult/", { answers })
      .then((response) => {
        const { Destinaion, Lodging, FoodStore } = response.data;
        console.log("click Button");
        // 각 배열을 상태로 업데이트
        setDestinations(Destinaion);
        setLodgings(Lodging);
        setFoodStores(FoodStore);
        setHasSentAnswers(true); // 응답을 보냈음을 나타내는 상태 업데이트
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
        <QuestionForm
          questionIndex={questionIndex}
          questions={questions}
          handleButtonClick={handleButtonClick}
          sendAnswersToServer={sendAnswersToServer}
        />
        {hasSentAnswers && (
          <RecommendationTabs
            destinations={destinations}
            lodgings={lodgings}
            foodStores={foodStores}
            itemsPerPage={itemsPerPage}
            renderItems={renderItems}
            handlePageClick={handlePageClick}
          />
        )}
      </VStack>
      <Link to="/">Go to Home Page</Link>
    </Container>
  );
};

export default QuestionListPage;
