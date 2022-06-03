import { Box, Button, Center, Flex, Img, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type CatsTypes = {
  breeds: [];
  categories: [];
  height: number;
  id: string;
  url: string;
  width: number;
};

const App = () => {
  const [catImgs, setCatImgs] = useState([]);

  const [page, setPage] = useState("1");
  const [category, setCategory] = useState("");
  const url1 = `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${category}`;

  const noPrev = page === "1";

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setCatImgs(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData(url1);
  }, [url1]);

  return (
    <Box
      sx={{
        ".chakra-select__icon-wrapper": { display: "none !important" },
      }}
    >
      <Select
        id="category"
        onChange={(e) => {
          setCategory(e.target.value);
          setPage("1");
        }}
        w="200px"
      >
        <option value="">All</option>
        <option value="1">Hats</option>
        <option value="2">Space</option>
        <option value="3">Funny</option>
        <option value="4">Sunglasses</option>
        <option value="5">Boxes</option>
        <option value="6">Caturday</option>
      </Select>
      <Flex
        w="800px"
        wrap="wrap"
        px="15px"
        my="25px"
        gap="15px"
        justifyContent="center"
      >
        {catImgs.map((item: CatsTypes, key) => {
          console.log(item);
          return (
            <Flex
              key={key}
              w="calc((100% - 30px) / 3)"
              h="15vw"
              alignItems="center"
              justify="center"
              overflow="hidden"
            >
              <Img
                src={item.url}
                objectFit="contain"
                minWidth="full"
                minHeight="full"
              />
            </Flex>
          );
        })}
      </Flex>
      <Center>
        <Button
          mr="5px"
          cursor={noPrev ? "initial" : "pointer"}
          disabled={noPrev}
          onClick={() => setPage((parseInt(page) - 1).toString())}
        >
          Prev
        </Button>
        <Button
          ml="5px"
          cursor="pointer"
          onClick={() => setPage((parseInt(page) + 1).toString())}
        >
          Next
        </Button>
      </Center>
    </Box>
  );
};

export default App;
