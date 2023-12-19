import React, { useState } from "react";
import { VStack, TabPanels, Tabs, TabList, Tab, Box } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const RecommendationTabs = ({
  destinations,
  lodgings,
  foodStores,
  itemsPerPage,
  renderItems,
  handlePageClick,
}) => {
  const [activeTab, setActiveTab] = useState("destinations");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "lodgings":
        return lodgings;
      case "foodStores":
        return foodStores;
      default:
        return destinations;
    }
  };

  const activeData = getActiveData();
  const pageCount =
    activeTab === "lodgings"
      ? Math.ceil(lodgings.length / itemsPerPage)
      : activeTab === "foodStores"
      ? Math.ceil(foodStores.length / itemsPerPage)
      : Math.ceil(activeData.length / itemsPerPage);

  const handlePageChange = (selected) => {
    handlePageClick(selected);
  };

  return (
    <Tabs isFitted>
      <TabList mb="4" style={{ flexDirection: "row" }}>
        <Tab onClick={() => handleTabChange("destinations")}>관광지</Tab>
        <Tab onClick={() => handleTabChange("lodgings")}>숙소</Tab>
        <Tab onClick={() => handleTabChange("foodStores")}>음식점</Tab>
      </TabList>
      <TabPanels>
        {activeData.length > 0 && (
          <VStack spacing={4} align="center">
            {activeTab === "lodgings" && renderItems(lodgings)}
            {activeTab === "destinations" && renderItems(destinations)}
            {activeTab === "foodStores" && renderItems(foodStores)}
          </VStack>
        )}
      </TabPanels>
      <Box mt={4} display="flex" justifyContent="center" alignItems="center">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"<"}
          nextLabel={">"}
        />
      </Box>
    </Tabs>
  );
};

export default RecommendationTabs;
