import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const EmployeeEdit = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateEmployee(id: "${employee.id}", input: {
              title: "${employee.title}",
              department: "${employee.department}",
              currentStatus: ${employee.currentStatus}
            }) {
              id
              firstname
              lastname
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
          console.log(
            "Employee updated successfully:",
            result.data.updateEmployee
          );
          navigate("/");
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <Container maxW="container.md" p={5}>
      <VStack spacing={5} align="stretch">
        <Heading as="h2" size="xl" textAlign="center" mb={5}>
          Edit Employee
        </Heading>
        <FormControl>
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

export default EmployeeEdit;
