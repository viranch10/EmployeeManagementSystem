import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          Employee Management
        </Heading>
        <Flex alignItems="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              color={"white"}
              variant="ghost"
              mr={4}
              _hover={{ color: "black" }}
            >
              Home
            </Button>
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button
              color={"white"}
              variant="ghost"
              mr={4}
              _hover={{ color: "black" }}
            >
              Create New Employee
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
