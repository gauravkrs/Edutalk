import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollButton from "./ScrollButton";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Button,
  Text,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

const product = [
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    numReviews: 34,
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 4.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 1.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 2.2,
  },
  {
    isNew: true,
    imageURL:
      "https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg",
    name: "Wayfarer Classic",
    subject: ["React", "MongoDB"],
    languages: ["english", "Hindi"],
    experiences: "5 years",
    numReviews: 34,
    rating: 1.2,
  },
];

function Rating({ rating, numReviews }) {
  return (
    <Box display={"flex"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Flex
        display={"flex"}
        flexWrap={"wrap"}
        width={"100%"}
        rowGap={"20px"}
        margin={"auto"}
      >
        {product.map((data, index) => (
          <Flex
            display={"flex"}
            margin={"auto"}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            w="31.5%"
          >
            <Box maxW="sm" width={"40%"} height={"150px"} position="relative">
              {data.isNew && (
                <Circle
                  size="10px"
                  position="absolute"
                  top={2}
                  right={2}
                  bg="red.200"
                />
              )}

              <Image
                src={data.imageURL}
                rounded={"full"}
                alt={`Picture of ${data.name}`}
                width={"100px"}
                height={"100px"}
                objectFit={"cover"}
              />
              <Flex justifyContent="space-between" alignContent="center">
                <Rating rating={data.rating} numReviews={data.numReviews} />
              </Flex>
            </Box>
            <Box width={"60%"}>
              <Box d="flex" alignItems="baseline">
                {data.isNew && (
                  <Badge rounded="full" px="2" fontSize="8px" colorScheme="red">
                    FREE
                  </Badge>
                )}
              </Box>
              <Flex
                justifyContent="space-between"
                align={"right"}
                alignContent="center"
              >
                <Box
                  fontSize="16px"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {data.name}
                  <Text fontSize="10 px">{data.subject}</Text>
                  <Text fontSize="10px">{data.languages}</Text>
                  <Text fontSize="10px">{data.experiences}</Text>
                  <Button
                    flex={1}
                    color="Green"
                    backgroundColor={"light green"}
                    border={"2px solid green"}
                    borderRadius={"10px"}
                    fontSize={"sm"}
                    _focus={{
                      bg: "gray.200",
                    }}
                  >
                    Chat
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default HomePage;
