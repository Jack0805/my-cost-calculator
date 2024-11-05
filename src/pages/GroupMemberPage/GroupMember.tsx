import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import { GroupMemberPageWrapper } from "./GroupMember.styles";
import { ButtonGroupWrapper } from "../../utils/Global.styles";
import { stringAvatar, capitalizeFirstChar } from "../../utils/helpers";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addMember, removeMember } from "../../store/groupMembersSlice";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { CustomizedSteppers } from "../../components";

import uniqid from "uniqid";
import { SiteHeader, SiteFooter } from "../../components";

export const GroupMemberPage: React.FC = () => {
  const { navigateToCostItemsPage, navigateBack } = useNavigateTo();
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const removeButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const names = useAppSelector((state) => state.groupMember.names); // Select items from state
  const dispatch = useAppDispatch(); // Dispatch actions
  const itemInputRef = useRef<HTMLInputElement>(null);

  const handleAddName = () => {
    setInputValue("");
    dispatch(addMember(capitalizeFirstChar(inputValue)));
  };

  const handleRemoveName = () => {
    dispatch(removeMember());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state with input value
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addButtonRef.current?.click(); // Trigger button click
    } else if (event.key === "Escape") {
      event.preventDefault();
      removeButtonRef.current?.click();
    }
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
      <Paper
        sx={{
          height: "40vh",
          width: "80%",
          padding: "25px",
          overflowY: "auto",
        }}
        elevation={3}
      >
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
            id="outlined-basic"
            label="Person Name"
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            sx={{
              width: "150px",
            }}
            inputRef={itemInputRef}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => handleAddName()}
            ref={addButtonRef}
          >
            <AddIcon />
          </Fab>
          <Fab
            color="error"
            aria-label="add"
            onClick={() => handleRemoveName()}
            ref={removeButtonRef}
          >
            <CloseIcon />
          </Fab>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            gap: "16px", // Allow items to wrap to the next line
            padding: "20px",
          }}
        >
          {names.length > 0 &&
            names.map((name) => {
              return <Avatar {...stringAvatar(name)} key={uniqid()} />;
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
    </GroupMemberPageWrapper>
  );
};
