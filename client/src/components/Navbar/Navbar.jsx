import IMAGE from "./Edutalk.png";
import React, { useState, useEffect } from "react"
import {useNavigate,useParams} from "react-router-dom"
import {
  Box,
  Flex,
  Image,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios"
const type = JSON.parse(localStorage.getItem("designation")) || "";
var Links=[]
if (type == "student") Links = ["Dashboard", "Contact us", "Recharge Wallet"];
else Links = ["Dashboard", "Contact us"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={
      children == "Dashboard"
        ? "/"
        : children == "Contact us"
        ? "https://github.com/gauravkrs/Edutalk"
        : "/payment"
    }
  >
    {children}
  </Link>
);

function Navbar() {
  const navigate = useNavigate()
  const params = useParams()
  const { colorMode, toggleColorMode } = useColorMode();
  const [login, setLogin] = useState(false)
  const [user,setUser] = useState({})
  const handleSignup = () => {
    if (login) {
      navigate("/account")
    }
    else navigate("/auth")
  }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user")) || null;
    if (data) {
      axios.get(`http://localhost:8000/auth/${data}`).then((response) => {
        setLogin(true);
        setUser({Name: response.data.Name});
      })
    }
  }, [params]);
  return (
    <div style={{marginBottom: '20px'}}>
      <Box px={4} bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/")}
              rounded={"full"}
             objectFit={"cover"}
              height={10}
              width={20}   
              marginLeft={"30px"}                                                                              
              src={IMAGE}
            />
          </Box>
          <HStack
            as={"nav"}
            spacing={4}
            marginLeft={"-60px"}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <br />
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"rgb(102,163,187)"}
                onClick={() => handleSignup()}
                _hover={{
                  bg: "rgb(100,169,190)",
                }}
              >
                {login ? `${user.Name}` : "Sign Up"}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
export default Navbar;
