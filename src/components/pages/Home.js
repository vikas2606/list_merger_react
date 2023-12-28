import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Heading, useEditable, Flex } from '@chakra-ui/react';
import fetchData from '../apis/api';
import List from '../organisms/List';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox, updateListData } from '../../store/store'; 
import ListCreator from '../organisms/ListCreator';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

function Home() {
    const [error, setError] = useState(false);
    const [createList, setCreateList] = useState(false)
    const [createListError, setCreateListError] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const checkedLists = useSelector((state) => state.checkedLists);
    const listData = useSelector((state) => state.listData); // Get listData from Redux store

    const fetchListData = async () => {
        try {
            const data = await fetchData();
            dispatch(updateListData(data.lists)); // Dispatch the action to update listData
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListData();
    }, []);

    const handleRestart = () => {
        setLoading(true);
        setError(null);
        fetchListData();
    };

    const handleCreateList = () => {
        const selectedListsCount = Object.values(checkedLists).filter((isChecked) => isChecked).length;

        if (selectedListsCount !== 2) {
            setCreateListError('You should select exactly 2 lists to create a new list');
            return;
        }

        setCreateList(true)
        setError(null);
        
    };

    if (loading) {
        return(
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'4'} p={'2'} w={'100vh'} height={'100vh'}>
             <CircularProgress isIndeterminate color='blue.500'  alignSelf={'center'} justifySelf={'center'}/>;
    </Box>
        )
    }

    if (error) {
        return (
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'4'} p={'2'} >
                <Text>Something went wrong please try again.</Text>
          
          <Button bg={'blue.500'} textColor={'white'} onClick={handleRestart}>
                    Try again
                </Button>
        </Box>
        );
    }

    const groupedListData = listData.reduce((acc, item) => {
        const { list_number, ...rest } = item;
        if (!acc[list_number]) {
            acc[list_number] = [];
        }
        acc[list_number].push(rest);
        return acc;
    }, {});

    return (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'4'} p={'2'} >
           {!createList && <> <Heading>List Creation</Heading>
                <Button bg={'blue.500'} textColor={'white'} onClick={handleCreateList}>
                    Create a new list
                </Button>
                {createListError && <Text textColor={'red'}>{createListError}</Text>}</>}
            <Flex gap={'2'} alignSelf={'center'} flexDir={'row'} alignItems={'start'} width={'contain'}>
                {createList ? (<ListCreator createList={checkedLists} setCreateList={setCreateList}/>) : (
                    Object.entries(groupedListData).map(([listNumber, items]) => (
                        <List key={listNumber} listNumber={listNumber} items={items} />
                    ))
                )}
            </Flex>
         
        </Box>
    );
}

export default Home;
