import React from 'react'
import { Image } from "@chakra-ui/image"
import { Flex, Heading, Stack, Text, List, ListItem } from "@chakra-ui/layout"
import { Button } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { Box } from '@chakra-ui/layout';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState();
  const [dice, setDice] = useState(1);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);


  const numbers = [1, 2, 3, 4, 5, 6];

  const StartGameHandle = () => {
    setGameStarted(true);
  };
  const onNumberClicked = (value) => {
    setSelectedNumbers(value);
    setError(null);
  }

  const getRandomNumber = () => {
    if (selectedNumbers) {
      const generateNo = Math.ceil(Math.random() * 6);
      setDice(generateNo);

      if (selectedNumbers === generateNo) {
        setScore((prev) => prev + generateNo);
      } else {
        setScore((prev) => prev - 2);
      }
    } else {
      setError("Please Select Number");
    }
  };
  return (
    <>
      {gameStarted ? (
        <>
          <Stack justify="center" align="center" maxW="1300px" mx="auto" >
            <Heading as="h1" color={error ? "red" : ""}
              fontSize="6xl" mb="8">
              {error ? error : "Select Number"}
            </Heading>
            <Flex pb="10">
              {numbers.map((value) => (
                <Flex
                  justify="center"
                  align="center"
                  h="50px"
                  w="50px"
                  bg={selectedNumbers === value ? 'green' : 'black'}
                  color="white"
                  fontSize="2xl"
                  key={value}
                  mr={4}
                  borderRadius="md"
                  onClick={() => onNumberClicked(value)}
                >
                  {value}
                </Flex>
              ))}
            </Flex>
            <Box h="150px" width="150px" onClick={getRandomNumber}>
              <Image src={`/dice/dice${dice}.png`} />
            </Box>
            <Text as="p" fontSize="3xl">Click on dice to roll</Text>
            <Text color={score > 0 ? "green" : 'red'} fontSize="5xl" fontWeight="bold">{score}</Text>
            <Text fontSize="3xl" fontWeight="bold">Total Score</Text>
            <Button bg="grey"
              color="white"
              _hover={{ bg: "purple" }} onClick={() => setScore(0)}>Reset Score</Button>
          </Stack>
          <Stack maxW="900px" mx="auto">
            <Heading as="h2" color="red"> Game Rules :-
            </Heading>
            <List>
              <ListItem> 1.  Select any number</ListItem>
              <ListItem> 2.  Click on dice image to roll</ListItem>
              <ListItem> 3.  Select number is equal to obtained dice result then you will get
                same point of dice</ListItem>
              <ListItem> 4.  if You are Wrong Score will be deducted by 2 points</ListItem>
            </List>
          </Stack>
        </>
      ) : (
        <Flex justify="center" align="center" height="100vh">
          <Image width="50%" src="/dices.png" />
          <Stack>
            <Heading fontSize="6xl" as="h1">
              {" "}The Dice Game</Heading>
            <Button width="110px" justifyContent="flex-end"
              bg="black"
              color="white"
              _hover={{ bg: "blue" }}
              onClick={StartGameHandle}>
              Start Game</Button>
          </Stack>
        </Flex>
      )}
    </>
  )
}

export default App