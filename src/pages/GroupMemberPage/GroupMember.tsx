import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { GroupMemberPageWrapper } from "./GroupMember.styles";
import { stringAvatar, capitalizeFirstChar } from "../../utils/helpers";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addMember, removeMember } from "../../store/groupMembersSlice";
import Button from "@mui/material/Button";
import { useNavigateTo } from "../../hooks/";
import { CustomizedSteppers } from "../../components";

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
      <CustomizedSteppers currentStep={0} />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "60vw",
          marginTop: "25px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Person Name"
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
          sx={{
            width: "60%",
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "60vw",
          marginTop: "30px",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            gap: "16px", // Allow items to wrap to the next line
          }}
        >
          {names.length > 0 &&
            names.map((name, index) => {
              return <Avatar {...stringAvatar(name)} key={index} />;
            })}
        </Stack>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%", // Set the width
          height: "50px", // Set the height
          marginTop: "30px",
        }}
        onClick={() => navigateToCostItemsPage()}
      >
        NEXT
      </Button>
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
    </GroupMemberPageWrapper>
  );
};
