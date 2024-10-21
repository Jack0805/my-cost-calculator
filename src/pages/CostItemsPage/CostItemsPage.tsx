import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CostItemsPageWrapper } from "./CostItemsPage.styles";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { convertArray } from "../../utils/helpers";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addItem, removeItem, updateItem } from "../../store/costItemsSlice";
import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export const CostItemsPage: React.FC = () => {
  const { navigateBack } = useNavigateTo();
  const dispatch = useAppDispatch(); // Dispatch actions
  const names = useAppSelector((state) => state.groupMember.names);
  const items = useAppSelector((state) => state.costItems.items); // Select items from state
  const [selectedValue, setSelectedValue] = useState<string>(names[0]);
  const [inputItemValue, setInputItemValue] = useState<string>("");
  const [inputAmountValue, setInputAmountValue] = useState<number>(0);

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputItemValue(event.target.value); // Update state with input value
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmountValue(event.target.value as unknown as number); // Update state with input value
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };
  const handleAddItem = () => {
    dispatch(
      addItem({
        itemName: inputItemValue,
        amount: inputAmountValue,
        shareBy: convertArray(names),
        paidBy: selectedValue,
      })
    );
  };
  const handleEditSharedBy = (itemIndex: number, shareByIndex: number) => {
    dispatch(
      updateItem({
        itemIndex,
        shareByIndex,
        isShared: !items[itemIndex].shareBy[shareByIndex].isShared,
      })
    );
  };
  return (
    <>
      <CostItemsPageWrapper>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            value={inputItemValue}
            onChange={handleItemChange}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={inputAmountValue}
            onChange={handleAmountChange}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Paid By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label="Paid By"
              onChange={handleChange}
            >
              {names.map((name, index) => {
                return (
                  <MenuItem value={name} key={index}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Fab color="primary" aria-label="add" onClick={() => handleAddItem()}>
            <AddIcon />
          </Fab>
        </Box>
        {items.map((item, itemIndex) => {
          return (
            <Accordion key={itemIndex} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {`${item.itemName} ${item.amount} paid by ${item.paidBy}, and shared by:`}
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    gap: "10px", // Allow items to wrap to the next line
                  }}
                >
                  {item.shareBy.map((shareBy, shareByIndex) => {
                    return (
                      <Chip
                        label={shareBy.name}
                        color={shareBy.isShared ? "primary" : "default"}
                        key={shareByIndex}
                        onClick={() => {
                          handleEditSharedBy(itemIndex, shareByIndex);
                        }}
                      />
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}

        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "100%", // Set the width
            height: "50px", // Set the height
            marginTop: "30px",
          }}
          onClick={() => navigateBack()}
        >
          BACK
        </Button>
      </CostItemsPageWrapper>
    </>
  );
};
