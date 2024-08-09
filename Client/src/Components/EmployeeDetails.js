import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Divider,
  HStack,
  Stack,
} from "@chakra-ui/react";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:4000/graphql";

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getEmployee(id: "${id}") {
              id
              firstname
              lastname
              dateOfBirth
              age
              dateOfJoining
              title
              department
              employeeType
              currentStatus
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.error(result.errors[0].message);
        } else {
          setEmployee(result.data.getEmployee);
        }
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id, url]);

  if (!employee) return <div>Loading...</div>;

  return (
    <Container maxW="container.md" p={5}>
      <Box p={6} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
        <VStack spacing={5} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" mb={5}>
            Employee Details
          </Heading>
          <Divider />
          <VStack spacing={3} align="start">
            <HStack>
              <Text fontWeight="bold">First Name:</Text>
              <Text>{employee.firstname}</Text>
              {console.log('employee: ', employee)}
            </HStack>
            <HStack>
              <Text fontWeight="bold">Last Name:</Text>
              <Text>{employee.lastname}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Date Of Birth</Text>
              <Text>{new Date(employee.dateOfBirth).toLocaleDateString()}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Age:</Text>
              <Text>{employee.age}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Date Of Joining:</Text>
              <Text>
                {new Date(employee.dateOfJoining).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Title:</Text>
              <Text>{employee.title}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Department:</Text>
              <Text>{employee.department}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Employee Type:</Text>
              <Text>{employee.employeeType}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Current Status:</Text>
              <Text>
                {employee.currentStatus === 1 ? "Working" : "Retired"}
              </Text>
            </HStack>
          </VStack>
          <Divider />
          <Box textAlign="center">
            <Button colorScheme="teal" onClick={() => navigate("/")}>
              Back
            </Button>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default EmployeeDetails;
