import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import React from "react";

function EmployeeTable({ employeeData, onEdit, onDelete, onMoreInfo }) {
  const toast = useToast();

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteEmployee(id: "${id}")
            }
          `,
        }),
      });

      const { data, errors } = await response.json();
      if (errors) {
        throw new Error(errors[0].message);
      }

      if (data.deleteEmployee) {
        toast({
          title: "Employee deleted.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onDelete(id);
      } else {
        throw new Error("Failed to delete employee.");
      }
    } catch (error) {
      toast({
        title: "Error deleting employee.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      overflowX="auto"
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      minH="400px"
    >
      <Table
        variant="striped"
        colorScheme="teal"
        size="md"
        w={"80vw"}
        tableLayout="fixed"
      >
        <Thead>
          <Tr>
            <Th w="150px">First Name</Th>
            <Th w="150px">Last Name</Th>
            <Th w="100px">Age</Th>
            <Th w="150px">Date Of Joining</Th>
            <Th w="150px">Title</Th>
            <Th w="150px">Department</Th>
            <Th w="150px">Employee Type</Th>
            <Th w="150px">Current Status</Th>
            <Th w="200px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employeeData?.length > 0 ? employeeData?.map((employee) => {           
           return (
            employee != null &&
            <Tr key={employee.id}>
              <Td w="150px">{employee.firstname}</Td>
              <Td w="150px">{employee.lastname}</Td>
              <Td w="100px">{employee.age}</Td>
              <Td w="150px">
                {new Date(employee.dateOfJoining).toLocaleDateString()}
              </Td>
              <Td w="150px">{employee.title}</Td>
              <Td w="150px">{employee.department}</Td>
              <Td w="150px">{employee.employeeType}</Td>
              <Td w="150px">
                {employee.currentStatus ? "Working" : "Retired"}
              </Td>
              <Td w="200px">
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => onMoreInfo(employee.id)}
                  >
                    More Info
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          )}) : []}
        </Tbody>
      </Table>
    </Box>
  );
}

export default EmployeeTable;
