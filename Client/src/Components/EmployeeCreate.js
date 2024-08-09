import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
    currentStatus: 1,
  });
  const navigate = useNavigate();
  const url = "http://localhost:4000/graphql";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              createEmployee(input: {
                firstname: "${employee.firstname}",
                lastname: "${employee.lastname}",
                age: ${employee.age},
                dateOfJoining: "${employee.dateOfJoining}",
                title: "${employee.title}",
                department: "${employee.department}",
                employeeType: "${employee.employeeType}",
                currentStatus: ${employee.currentStatus}
              }) {
                id
              }
            }
          `,
        }),
      });

      const { data, errors } = await response.json();
      if (errors) {
        throw new Error(errors[0].message);
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Container maxW="container.md" p={5}>
      <VStack spacing={5} align="stretch">
        <Heading as="h2" size="xl" textAlign="center" mb={5}>
          Create New Employee
        </Heading>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstname"
            value={employee.firstname}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastname"
            value={employee.lastname}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Age</FormLabel>
          <Input name="age" value={employee.age} onChange={handleInputChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Date Of Joining</FormLabel>
          <Input
            name="dateOfJoining"
            type="date"
            value={employee.dateOfJoining}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Title</FormLabel>
          <Select
            name="title"
            value={employee.title}
            onChange={handleInputChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Department</FormLabel>
          <Select
            name="department"
            value={employee.department}
            onChange={handleInputChange}
          >
            <option value="IT">IT</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Employee Type</FormLabel>
          <Select
            name="employeeType"
            value={employee.employeeType}
            onChange={handleInputChange}
          >
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Current Status</FormLabel>
          <Select
            name="currentStatus"
            value={employee.currentStatus}
            onChange={handleInputChange}
          >
            <option value={1}>Working</option>
            <option value={0}>Retired</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      </VStack>
    </Container>
  );
};

export default EmployeeCreate;
