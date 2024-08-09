import { Select, Box } from "@chakra-ui/react";
import React, { useState } from "react";

function EmployeeSearch({ onFilterChange }) {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <Select
        placeholder="Select employee type"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
        <option value="Upcoming Retirements">Upcoming Retirements</option>
      </Select>
    </Box>
  );
}

export default EmployeeSearch;
