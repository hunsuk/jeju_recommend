import React from "react";
import {
  VStack,
  TabPanel,
  TabPanels,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

const RecommendationTabs = ({
  destinations,
  lodgings,
  foodStores,
  itemsPerPage,
  renderItems,
  handlePageClick,
}) => {
  return (
    <Tabs isFitted>
      <TabList mb="4" style={{ flexDirection: "row" }}>
        {" "}
        {/* 가로로 배치되도록 수정 */}
        <Tab>관광지</Tab>
        <Tab>숙소</Tab>
        <Tab>음식점</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {destinations.length > 0 && (
            <VStack spacing={4} align="center">
              {renderItems(destinations)}
            </VStack>
          )}
        </TabPanel>
        <TabPanel>
          {lodgings.length > 0 && (
            <VStack spacing={4} align="center">
              {renderItems(lodgings)}
            </VStack>
          )}
        </TabPanel>
        <TabPanel>
          {foodStores.length > 0 && (
            <VStack spacing={4} align="center">
              {renderItems(foodStores)}
            </VStack>
          )}
        </TabPanel>
      </TabPanels>
      <ReactPaginate
        pageCount={Math.ceil(destinations.length / itemsPerPage)} // 아무 배열이나 사용 (여기서는 destinations)
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={"이전"}
        nextLabel={"다음"}
      />
    </Tabs>
  );
};
export default RecommendationTabs;
