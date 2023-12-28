// ListCreator.js

import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Card, Heading, Button } from "@chakra-ui/react";
import List from "./List"; // Update the import path based on your project structure
import { useSelector, useDispatch } from "react-redux";
import { updateListData } from "../../store/store";
import { MaxListNumber } from "../utils/MaxListNumber";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function ListCreator({ createList, setCreateList }) {
  const dispatch = useDispatch();

  const checkedLists = useSelector((state) => state.checkedLists);
  const listData = useSelector((state) => state.listData);
  const [maxListNumber, setMaxListNumber] = useState(0);
  const [groupedListData, setGroupedListData] = useState({});
  const [selectedListNumbers, setSelectedListNumbers] = useState([]);

  useEffect(() => {
    setMaxListNumber(MaxListNumber(listData) + 1);
    const groupedData = listData.reduce((acc, item) => {
      const { list_number, ...rest } = item;
      if (!acc[list_number]) {
        acc[list_number] = [];
      }
      acc[list_number].push(rest);
      return acc;
    }, {});
    console.log(groupedData);
    setGroupedListData(groupedData);
    setSelectedListNumbers(
      Object.entries(checkedLists)
        .filter(([_, isChecked]) => isChecked)
        .map(([listNumber]) => parseInt(listNumber))
    );
  }, [listData, checkedLists]);

  const moveListItem = (itemId, fromListNumber, toListNumber) => {
    const updatedData = { ...groupedListData };
    const itemIndex = updatedData[fromListNumber].findIndex(
      (item) => item.id === itemId
    );
    const [movedItem] = updatedData[fromListNumber].splice(itemIndex, 1);
    if (!updatedData[toListNumber]) {
      updatedData[toListNumber] = [];
    }
    updatedData[toListNumber].push(movedItem);
    setGroupedListData(updatedData);
  };

  const handleUpdateListData = () => {
    const convertedData = Object.entries(groupedListData).reduce(
      (acc, [listNumber, items]) => {
        const formattedItems = items.map((item) => ({
          list_number: parseInt(listNumber),
          id: item.id,
          name: item.name,
          description: item.description,
        }));
        return acc.concat(formattedItems);
      },
      []
    );
    console.log(convertedData);
    dispatch(updateListData(convertedData));
    setCreateList(false);
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      gap={"4"}
      p={"2"}
      alignSelf={"center"}
    >
      <Flex gap={"2"} alignSelf={"start"} flexDir={"row"}>
        {Object.entries(groupedListData).map(([listNumber, items]) => {
          if (listNumber === `${selectedListNumbers[0]}`) {
            // Assuming listNumber is a string, adjust as needed
            return (
              // <List key={listNumber} listNumber={listNumber} items={items} />
              <Box
                rounded={"lg"}
                display={"flex"}
                flexDirection={"column"}
                bg={"blue.50"}
                gap={"4"}
                p={"4"}
                overflow={"auto"}
                maxHeight={"85vh"}
                minWidth={"252px"}
              >
                <Box gap={"2"} display={"flex"} flexDir={"row"}>
                  <Text fontWeight={"bold"}>
                    List {listNumber}({items.length})
                  </Text>
                </Box>
                {items.map((item) => (
                  <Card key={item.id} p={"4"}>
                    <Heading size="xs">{item.name}</Heading>
                    <Text pt="2" fontSize="sm">
                      {item.description}
                    </Text>
                    <Text
                      alignSelf={"end"}
                      pt="2"
                      fontSize="sm"
                      onClick={() =>
                        moveListItem(item.id, listNumber, maxListNumber)
                      }
                    >
                      <ArrowForwardIcon color="gray.600" />
                    </Text>
                  </Card>
                ))}
              </Box>
            );
          }
          return null; // Return null for other list numbers
        })}
        <Box
          rounded={"lg"}
          display={"flex"}
          flexDirection={"column"}
          bg={"blue.50"}
          gap={"4"}
          p={"4"}
          overflow={"auto"}
          maxHeight={"85vh"}
          minWidth={"252px"}
        >
          <Box gap={"2"} display={"flex"} flexDir={"row"}>
            <Text fontWeight={"bold"}>
              List {maxListNumber}({groupedListData[maxListNumber]?.length || 0}
              )
            </Text>
          </Box>
          {groupedListData[maxListNumber]?.map((item) => (
            <Card key={item.id} p={"4"}>
              <Heading size="xs">{item.name}</Heading>
              <Text pt="2" fontSize="sm">
                {item.description}
              </Text>
              <Text
                display={"flex"}
                justifyContent={"space-between"}
                pt="2"
                fontSize="sm"
              >
                <ArrowBackIcon
                  color="gray.600"
                  onClick={() =>
                    moveListItem(item.id, maxListNumber, selectedListNumbers[0])
                  }
                />
                <ArrowForwardIcon
                  alignSelf={"end"}
                  color="gray.600"
                  onClick={() =>
                    moveListItem(item.id, maxListNumber, selectedListNumbers[1])
                  }
                />
              </Text>
            </Card>
          ))}
        </Box>
        {Object.entries(groupedListData).map(([listNumber, items]) => {
          if (listNumber === `${selectedListNumbers[1]}`) {
            // Assuming listNumber is a string, adjust as needed
            return (
              // <List key={listNumber} listNumber={listNumber} items={items} />
              <Box
                rounded={"lg"}
                display={"flex"}
                flexDirection={"column"}
                bg={"blue.50"}
                gap={"4"}
                p={"4"}
                overflow={"auto"}
                maxHeight={"85vh"}
                minWidth={"252px"}
              >
                <Box gap={"2"} display={"flex"} flexDir={"row"}>
                  <Text fontWeight={"bold"}>
                    List {listNumber}({items.length})
                  </Text>
                </Box>
                {items.map((item) => (
                  <Card key={item.id} p={"4"}>
                    <Heading size="xs">{item.name}</Heading>
                    <Text pt="2" fontSize="sm">
                      {item.description}
                    </Text>
                    <Text
                      pt="2"
                      alignSelf={"end"}
                      fontSize="sm"
                      onClick={() =>
                        moveListItem(item.id, listNumber, maxListNumber)
                      }
                    >
                      <ArrowBackIcon color="gray.600" />
                    </Text>
                  </Card>
                ))}
              </Box>
            );
          }
          return null; // Return null for other list numbers
        })}
      </Flex>
      <Flex flexDirection={"row"} gap={"6"}>
        <Button
          border="1px"
          borderColor="gray.600"
          textColor={"gray.600"}
          onClick={() => {
            setCreateList(false);
          }}
        >
          Cancel
        </Button>{" "}
        <Button
          bg={"blue.500"}
          textColor={"white"}
          onClick={handleUpdateListData}
        >
          Update
        </Button>
      </Flex>
    </Box>
  );
}

export default ListCreator;
