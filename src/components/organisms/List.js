// List.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, Checkbox, Text, Heading } from "@chakra-ui/react";
import { toggleCheckbox } from "../../store/store";
function List({ listNumber, items }) {
  const dispatch = useDispatch();
  const checkedLists = useSelector((state) => state.checkedLists);

  const handleCheckboxToggle = () => {
    dispatch(toggleCheckbox(listNumber));
  };

  return (
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
        <Checkbox
          isChecked={checkedLists[listNumber] || false}
          onChange={handleCheckboxToggle}
        />
        <Text fontWeight={'bold'}>List {listNumber}</Text>
      </Box>
      {items.map((item) => (
        <Card key={item.id} p={"4"}>
          <Heading size="xs">{item.name}</Heading>
          <Text pt="2" fontSize="sm">
            {item.description}
          </Text>
        </Card>
      ))}
    </Box>
  );
}

export default List;
