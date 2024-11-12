import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import {
  CostItemsPageWrapper,
  ItemTitleWrapper,
  AccordionWrapper,
} from "./CostItemsPage.styles";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { convertArray } from "../../utils/helpers";
import { CustomizedSteppers } from "../../components";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addItem,
  removeItem,
  removeSpecificItem,
  updateItem,
  updateExpand,
} from "../../store/costItemsSlice";
import { ButtonGroupWrapper } from "../../utils/Global.styles";
import { useState, useRef, useEffect } from "react";

import Accordion, { AccordionSlots } from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { Chip, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "@mui/material/Fade";
import Collapse from "@mui/material/Collapse";
import Grow from "@mui/material/Grow";
import Tooltip from "@mui/material/Tooltip";

import { ResponsiveDialog } from "../../components/";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter } from "../../components";

export const CostItemsPage: React.FC = () => {
  const { navigateBack, navigateToCalculationPage } = useNavigateTo();
  const dispatch = useAppDispatch(); // Dispatch actions
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const names = useAppSelector((state) => state.groupMember.names);
  const items = useAppSelector((state) => state.costItems.items); // Select items from state
  const [selectedValue, setSelectedValue] = useState<string>(names[0]);
  const [inputItemValue, setInputItemValue] = useState<string>("");
  const [inputAmountValue, setInputAmountValue] = useState<number | string>("");
  const itemInputRef = useRef<HTMLInputElement>(null);

  const [errorItem, setErrorItem] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputItemValue(event.target.value); // Update state with input value
    if (errorItem && event.target.value) {
      setErrorItem(false); // Remove error when user starts typing
    }
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmountValue(event.target.value as unknown as number); // Update state with input value
    if (errorAmount && event.target.value) {
      setErrorAmount(false); // Remove error when user starts typing
    }
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };
  const handleAddItem = () => {
    if (!inputItemValue.trim() && !inputAmountValue) {
      setErrorItem(true);
      setErrorAmount(true);
    } else if (!inputItemValue.trim()) {
      setErrorItem(true);
    } else if (!inputAmountValue) {
      setErrorAmount(true);
    } else {
      setInputItemValue("");
      setInputAmountValue("");
      if (itemInputRef.current) {
        itemInputRef.current.focus(); // Safely focus the TextField
      }
      dispatch(
        addItem({
          itemName: inputItemValue,
          amount: inputAmountValue as number,
          shareBy: convertArray(names),
          paidBy: selectedValue,
          accordionExpended: true,
        })
      );
    }
  };
  const handleRemoveItem = (index: number) => {
    dispatch(removeSpecificItem(index));
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

  const handleChangeAccordionExpended =
    (itemIndex: number) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(isExpanded);
      dispatch(
        updateExpand({
          itemIndex,
          expanded: isExpanded,
        })
      );
    };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addButtonRef.current?.click(); // Trigger button click
    }
  };

  useEffect(() => {
    if (itemInputRef.current) {
      itemInputRef.current.focus(); // Safely focus the TextField
    } // Set focus to the TextField using the ref
    // Add keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <CostItemsPageWrapper>
        <SiteHeader />
        <CustomizedSteppers currentStep={1} />
        <Paper
          sx={{
            height: "40vh",
            width: "80%",
            padding: "25px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          elevation={3}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <label htmlFor="bill_name_input" />
            <TextField
              id="bill_name_input"
              name="billName"
              label="Bill Name"
              variant="outlined"
              value={inputItemValue}
              onChange={handleItemChange}
              inputRef={itemInputRef}
              sx={{
                width: "20%",
              }}
              error={errorItem}
              helperText={errorItem ? "The field cannot be empty" : ""}
            />
            <label htmlFor="amount_input" />
            <TextField
              id="amount_input"
              name="amount"
              label="Amount"
              variant="outlined"
              value={inputAmountValue}
              onChange={handleAmountChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{
                width: "20%",
              }}
              error={errorAmount}
              helperText={errorAmount ? "The field cannot be empty" : ""}
            />
            <FormControl>
              <InputLabel id="select-paid-by">Paid By</InputLabel>
              <Select
                labelId="select-paid-by"
                id="demo-simple-select"
                name="simple-select"
                value={selectedValue}
                label="Paid By"
                onChange={handleChange}
              >
                {names.map((name) => {
                  return (
                    <MenuItem value={name} key={uniqid()}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => handleAddItem()}
              ref={addButtonRef}
            >
              <AddIcon />
            </Fab>
          </Box>
          {items.map((item, itemIndex) => {
            return (
              <AccordionWrapper>
                <Accordion
                  key={uniqid()}
                  sx={{
                    width: "85%",
                  }}
                  elevation={3}
                  expanded={item.accordionExpended}
                  onChange={handleChangeAccordionExpended(itemIndex)}
                  slots={{
                    transition: Collapse as AccordionSlots["transition"],
                  }}
                  slotProps={{ transition: { timeout: 1000 } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <ItemTitleWrapper>
                      <Chip
                        label={
                          <strong>{`${item.itemName} $${item.amount} paid by ${item.paidBy}`}</strong>
                        }
                        color="success"
                        variant="outlined"
                      />
                    </ItemTitleWrapper>
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
                            key={uniqid()}
                            onClick={() => {
                              handleEditSharedBy(itemIndex, shareByIndex);
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <IconButton
                  color="error"
                  aria-label="add"
                  size="small"
                  onClick={() => handleRemoveItem(itemIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              </AccordionWrapper>
            );
          })}
        </Paper>
        <ButtonGroupWrapper>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "25%", // Set the width
              height: "50px", // Set the height
              marginTop: "20px",
            }}
            onClick={items.length > 0 ? handleClickOpen : navigateBack}
          >
            BACK
          </Button>
          <Button
            disabled={items.length <= 0}
            variant="contained"
            color="primary"
            sx={{
              width: "25%", // Set the width
              height: "50px", // Set the height
              marginTop: "20px",
            }}
            onClick={() => {
              navigateToCalculationPage();
            }}
          >
            CALCULATE
          </Button>
        </ButtonGroupWrapper>
        <SiteFooter />
        <ResponsiveDialog
          title="Are You Sure You Want to Go Back?"
          description="If you go back, any cost items created on this page will be lost. Do you want to continue?"
          fullScreen={false}
          open={open}
          handleClose={handleClose}
          showContinueButton
          handleContinue={() => {
            dispatch(removeItem());
            navigateBack();
          }}
          CloseButtonName="No"
        />
      </CostItemsPageWrapper>
    </>
  );
};
