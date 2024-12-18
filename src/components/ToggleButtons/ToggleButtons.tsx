import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleButtonsProps {
  alignment: string;
  itemIndex: number;
  handleChangeAlignment: (newAlignment: string, itemIndex: number) => void;
}

export function ToggleButtons({
  alignment,
  itemIndex,
  handleChangeAlignment,
}: ToggleButtonsProps) {
  //   const newAlignment = alignment === "equal" ? "unequal" : "equal";
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(_, newAlignment) => {
        if (newAlignment !== null) {
          handleChangeAlignment(newAlignment, itemIndex);
        }
      }}
      aria-label="Platform"
      sx={{
        "& .MuiToggleButton-root": {
          height: "15px",
          fontSize: "10px",
        },
      }}
    >
      <ToggleButton value="equal">Equal Split</ToggleButton>
      <ToggleButton value="unequal">Unequal Split</ToggleButton>
    </ToggleButtonGroup>
  );
}
