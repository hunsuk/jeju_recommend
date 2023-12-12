import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

//todo : 응답한 데이터를 한번에 모아 서버로 전송 후 응답받기
/*request: answers: {Yes, No, Yes, ...}
  response: { 
    "Destinaion":{
        "items":[
            {"id" : 1, "title"  : "한라산" , "URL": "sdsd" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"], "address" :"제주시"},
            {"id" : 2, "title"  : "한라산" , "URL": "" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"],"address" :"제주시"}
        ]
    },

    "FoodStore":{
        "items":[
            {"id" : 1, "title"  : "한라산" , "URL": "sdsd" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"],"address" :"제주시"},
            {"id" : 2, "title"  : "한라산" , "URL": "" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"],"address" :"제주시"}
        ]
    },

    "Lodging":{
        "items":[
             {"id" : 1, "title"  : "한라산" , "URL": "sdsd" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"],"address" :"제주시"},
            {"id" : 2, "title"  : "한라산" , "URL": "" , "intrudcution" : "ㅁㄴㅇㅁㄴㅇ", "tag":["커피"],"address" :"제주시"}
        ]
    }
}
                  */

const QuestionListPage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [destinaions, setDestinations] = useState([]);
  const [lodgings, setLodings] = useState([]);
  const [foodStores, setFoodStores] = useState([]);
  const result = 1;

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
        setLodings(Lodging);
        setFoodStores(FoodStore);

        console.log("서버 응답:", Destinaion, Lodging, FoodStore);
      })
      .catch((error) => {
        console.error("Error sending answers to server:", error);
      });
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

        {answers.length > 0 && (
          <Text>
            You selected: <strong>{answers.join(", ")}</strong>
          </Text>
        )}

        {questionIndex === questions.length && (
          //todo : 결과 추가
          <>
            <Button
              colorScheme="teal"
              size="lg"
              mt={4}
              onClick={sendAnswersToServer}
            >
              추천 받기
            </Button>
            <Link to="/">Go to Home Page</Link>
          </>
        )}

        {/* {result && (
          <Box p={4} borderWidth="3px" borderRadius="lg" width="300px" mt={4}>
            <Text mb={2}>여행 추천 결과:</Text>
            <Text>{result.lodging}</Text>
            <Text>{result.food}</Text>
            <Text>{result.place}</Text>
  
          </Box>
        )} */}
      </VStack>
    </Container>
  );
};

export default QuestionListPage;
