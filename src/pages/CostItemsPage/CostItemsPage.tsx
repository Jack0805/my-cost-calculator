import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
  updateEqualSplit,
  updatePortion,
} from "../../store/costItemsSlice";
import {
  ButtonGroupWrapper,
  PaperHeaderWrapper,
} from "../../utils/Global.styles";
import { useState, useRef, useEffect } from "react";

import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { Chip, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";

import { ResponsiveDialog } from "../../components/";
import { CostItem } from "../../store/types";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter, ToggleButtons } from "../../components";
import { Helmet } from "react-helmet";

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

  const handleChangeAlignment = (newAlignment: string, itemIndex: number) => {
    dispatch(
      updateEqualSplit({
        itemIndex,
        equalSplit: newAlignment,
      })
    );
  };

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

  const handlePortionAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemIndex: number,
    shareByIndex: number
  ) => {
    const newPortion = Number(event.target.value);
    dispatch(
      updatePortion({
        itemIndex,
        shareByIndex,
        portion: newPortion,
      })
    );
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
          shareBy: convertArray(names, inputAmountValue as number),
          paidBy: selectedValue,
          accordionExpended: true,
          equalSplit: "equal",
        })
      );
    }
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeSpecificItem(index));
  };

  const handleEditSharedBy = (itemIndex: number, shareByIndex: number) => {
    if (
      items[itemIndex].shareBy.filter((item) => item.isShared).length === 1 &&
      items[itemIndex].shareBy[shareByIndex].isShared === true
    ) {
      return;
    } else {
      dispatch(
        updateItem({
          itemIndex,
          shareByIndex,
          isShared: !items[itemIndex].shareBy[shareByIndex].isShared,
        })
      );
    }
  };

  const handleChangeAccordionExpended =
    (itemIndex: number) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
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

  const calculateTotalPortion = (item: CostItem) => {
    const totalPortion = item.shareBy.reduce(
      (total: number, share: { portion: number; isShared: boolean }) =>
        share.isShared ? total + share.portion : total,
      0
    );
    return totalPortion;
  };

  const isErrorChipVisible = (item: CostItem) =>
    item.equalSplit === "unequal" &&
    Math.abs(calculateTotalPortion(item) - Number(item.amount)) > 0.02;

  return (
    <>
      <CostItemsPageWrapper>
        <Helmet>
          <title>Bill Split: Add Costs and Expenses</title>
          <meta
            name="google-adsense-account"
            content="ca-pub-5022597811159483"
          ></meta>
          <meta
            name="description"
            content="Add shared costs and expenses for your group. Enter item details to calculate and split bills fairly among members."
          />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Add Cost Items",
              url: "https://billsplit.io/cost-items",
              description:
                "Add shared cost items to your session. Easily track expenses and contributions for fair bill splitting.",
            })}
          </script>
          <meta
            name="keywords"
            content="add expenses, split costs, shared bills, group expenses"
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://billsplit.io/#/cost-items" />
        </Helmet>
        <SiteHeader />
        <CustomizedSteppers currentStep={1} />
        <Paper
          sx={{
            height: "60vh",
            width: "85%",
            padding: "15px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          elevation={3}
        >
          <PaperHeaderWrapper>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block" }}
            >
              Step 2. Add Costs
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="Start Splitting Bills"
              onClick={() => handleAddItem()}
              ref={addButtonRef}
            >
              <AddIcon />
            </Fab>
          </PaperHeaderWrapper>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="bill_name_input" />
            <TextField
              size="small"
              id="bill_name_input"
              name="billName"
              label="Bill Name"
              variant="outlined"
              value={inputItemValue}
              onChange={handleItemChange}
              inputRef={itemInputRef}
              sx={{
                width: "33%",
              }}
              error={errorItem}
              helperText={errorItem ? "The field cannot be empty" : ""}
            />
            <label htmlFor="amount_input" />
            <TextField
              size="small"
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
                width: "33%",
              }}
              error={errorAmount}
              helperText={errorAmount ? "The field cannot be empty" : ""}
            />
            <FormControl
              sx={{
                width: "33%",
              }}
            >
              <InputLabel id="select-paid-by">Paid By</InputLabel>
              <Select
                size="small"
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
          </Box>
          {items.map((item, itemIndex) => {
            const errorVisible = isErrorChipVisible(item);
            return (
              <AccordionWrapper key={uniqid()}>
                <Accordion
                  key={uniqid()}
                  sx={{
                    width: "85%",
                    // backgroundColor: "red",
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
                        sx={{
                          "& .MuiChip-label": {
                            fontSize: "11px", // Adjust the font size here
                          },
                        }}
                      />
                      {errorVisible && (
                        <Chip
                          label={
                            <strong>Amounts must match the bill total</strong>
                          }
                          color="error"
                          variant="outlined"
                          data-testid={`error-chip-${itemIndex}`}
                          sx={{
                            "& .MuiChip-label": {
                              fontSize: "11px", // Adjust the font size here
                            },
                          }}
                        />
                      )}
                    </ItemTitleWrapper>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        flexWrap: "wrap",
                        gap: "10px", // Allow items to wrap to the next line
                        marginBottom: "15px",
                      }}
                    >
                      {item.equalSplit === "equal" &&
                        item.shareBy.map((shareBy, shareByIndex) => (
                          <Chip
                            label={shareBy.name}
                            color={shareBy.isShared ? "primary" : "default"}
                            key={uniqid()}
                            onClick={() =>
                              handleEditSharedBy(itemIndex, shareByIndex)
                            }
                          />
                        ))}

                      {item.equalSplit === "unequal" &&
                        item.shareBy.map((shareBy, shareByIndex) => (
                          <TextField
                            id="input-with-icon-textfield"
                            key={uniqid()}
                            sx={{ width: "170px" }}
                            disabled={!shareBy.isShared}
                            type="number"
                            defaultValue={shareBy.portion}
                            onBlur={(event) =>
                              handlePortionAmountChange(
                                event,
                                itemIndex,
                                shareByIndex
                              )
                            }
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Chip
                                      label={shareBy.name}
                                      sx={{
                                        marginBottom: "5px",
                                        marginRight: "5px",
                                      }}
                                      color={
                                        shareBy.isShared ? "primary" : "default"
                                      }
                                      key={uniqid()}
                                      onClick={() =>
                                        handleEditSharedBy(
                                          itemIndex,
                                          shareByIndex
                                        )
                                      }
                                    />
                                    $
                                  </InputAdornment>
                                ),
                              },
                            }}
                            variant="standard"
                          />
                        ))}
                    </Stack>
                    <ToggleButtons
                      alignment={item.equalSplit}
                      itemIndex={itemIndex}
                      handleChangeAlignment={handleChangeAlignment}
                    />
                  </AccordionDetails>
                </Accordion>
                <IconButton
                  color="error"
                  aria-label="Start Splitting Bills"
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
            aria-label="Start Splitting Bills"
          >
            BACK
          </Button>
          <Button
            disabled={
              items.length <= 0 ||
              items.some((item) => isErrorChipVisible(item))
            }
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
            aria-label="Start Splitting Bills"
          >
            NEXT
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
