// QuestionForm.jsx
import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const QuestionForm = ({
  questionIndex,
  questions,
  handleButtonClick,
  sendAnswersToServer,
}) => {
  return (
    <>
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
        <Button
          colorScheme="teal"
          size="lg"
          mt={4}
          onClick={sendAnswersToServer}
        >
          추천 받기
        </Button>
      )}
    </>
  );
};

export default QuestionForm;
