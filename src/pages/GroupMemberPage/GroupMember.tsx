import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import { GroupMemberPageWrapper } from "./GroupMember.styles";
import {
  ButtonGroupWrapper,
  PaperHeaderWrapper,
} from "../../utils/Global.styles";
import { stringAvatar, capitalizeFirstChar } from "../../utils/helpers";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addMember, removeSpecificMember } from "../../store/groupMembersSlice";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { CustomizedSteppers } from "../../components";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter } from "../../components";

import { ResponsiveDialog } from "../../components/";

export const GroupMemberPage: React.FC = () => {
  const { navigateToCostItemsPage, navigateBack } = useNavigateTo();
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState(false);
  const names = useAppSelector((state) => state.groupMember.names); // Select items from state
  const dispatch = useAppDispatch(); // Dispatch actions
  const itemInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddName = () => {
    if (!inputValue.trim()) {
      setError(true);
    } else if (names.includes(capitalizeFirstChar(inputValue))) {
      handleClickOpen();
    } else {
      setInputValue("");
      dispatch(addMember(capitalizeFirstChar(inputValue)));
    }
  };

  // const handleRemoveName = () => {
  //   dispatch(removeMember());
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state with input value
    if (error && event.target.value) {
      setError(false); // Remove error when user starts typing
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addButtonRef.current?.click(); // Trigger button click
    }
  };

  const handleDelete = (index: number) => {
    dispatch(removeSpecificMember(index));
  };

  useEffect(() => {
    if (itemInputRef.current) {
      itemInputRef.current.focus(); // Safely focus the TextField
    }
    // Add keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <GroupMemberPageWrapper>
      <SiteHeader />
      <CustomizedSteppers currentStep={0} />
      {/* <Alert severity="error" sx={{ width: "80%" }}>
        In each row, the person in the leftmost column should pay the shared
        costs to the people in the columns to the right.
      </Alert> */}
      <Paper
        sx={{
          height: "60vh",
          width: "85%",
          padding: "15px",
          overflowY: "auto",
        }}
        elevation={3}
      >
        <PaperHeaderWrapper>
          <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
            Step 1. Add Participants
          </Typography>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => handleAddName()}
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
            gap: "20px",
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="Person Name"
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            sx={{
              width: "200px",
            }}
            inputRef={itemInputRef}
            error={error}
            helperText={error ? "The field cannot be empty" : ""}
          />
          {/* <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => handleAddName()}
            ref={addButtonRef}
          >
            <AddIcon />
          </Fab> */}
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            gap: "16px", // Allow items to wrap to the next line
            padding: "40px 0",
          }}
        >
          {names.length > 0 &&
            names.map((name, index) => {
              return (
                <Chip
                  avatar={<Avatar {...stringAvatar(name)}>{name[0]}</Avatar>}
                  label={name}
                  key={uniqid()}
                  onDelete={() => handleDelete(index)}
                />
              );
              // return <Avatar {...stringAvatar(name)} key={uniqid()} />;
            })}
        </Stack>
      </Paper>
      <ButtonGroupWrapper>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "20%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          onClick={() => navigateBack()}
        >
          BACK
        </Button>
        <Button
          disabled={names.length <= 0}
          variant="contained"
          color="primary"
          sx={{
            width: "20%", // Set the width
            height: "50px", // Set the height
            marginTop: "20px",
          }}
          onClick={() => navigateToCostItemsPage()}
        >
          NEXT
        </Button>
      </ButtonGroupWrapper>
      <SiteFooter />
      <ResponsiveDialog
        title={`"${capitalizeFirstChar(inputValue)}" is already in the list.`}
        description="Please try a different one.."
        fullScreen={false}
        open={open}
        handleClose={handleClose}
        showContinueButton={false}
        handleContinue={() => {}}
        CloseButtonName="Try again"
      />
    </GroupMemberPageWrapper>
  );
};
