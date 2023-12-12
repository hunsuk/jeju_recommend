import React from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  ColorModeScript,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DolsiPage from "./Pages/DolsiPage";
import QuestionListPage from "./Pages/QuestionListPage";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/question" element={<QuestionListPage />} />
          <Route path="/" element={<DolsiPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
