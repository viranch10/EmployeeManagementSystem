import React, { useEffect, useState } from "react";
import { VStack, Heading, Box, Grid, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";

function EmployeeDirectory() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:4000/graphql";

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              list {
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
      });

      const { data } = await response.json();
      setEmployeeData(data.list);
      setFilteredData(data.list);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    if (filter && filter !== "All") {
      const filtered = employeeData.filter(
        (employee) => employee.employeeType === filter
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(employeeData);
    }
  };

  const handleDelete = (id) => {
    setEmployeeData(employeeData.filter((employee) => employee.id !== id));
    setFilteredData(filteredData.filter((employee) => employee.id !== id));
  };

  const handleEdit = (employee) => {
    navigate(`/edit/${employee.id}`);
  };

  const handleMoreInfo = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={5} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" mb={5}>
          Employee Management System
        </Heading>
        <Box mb={5}>
          <EmployeeSearch onFilterChange={handleFilterChange} />
        </Box>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={5}>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
            <EmployeeTable
              employeeData={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMoreInfo={handleMoreInfo}
            />
          </Box>
        </Grid>
      </VStack>
    </Container>
  );
}

export default EmployeeDirectory;
