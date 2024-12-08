import { Paper, Typography, TextField, Stack, Box, Avatar, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../store/Login-context";
import SnackBar from "../commons/SnackBar";
import '../../css/Pages/LogIn.css'



const LogIn = () => {

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const context = useContext(UserInformationContext);

  // State for SnackBar
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  const [snackBarSeverity, setSnackBarSeverity] = useState<"success" | "error" | "warning">("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  if (!context) {
    return <div>Error: Context is not available.</div>;
  }

  const { logInFunction } = context;

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  const handleLogInFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const LogInData = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || ""
    }

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LogInData)
      });

      if (response.ok) {
        const data = await response.json();
        const statusCode = data.cIntResponseStatus;

        if (statusCode === 201) {
          const message = data.cObjResponseData;
          console.log("Success:", message);
          logInFunction(message.access_token);

          if (emailRef.current) emailRef.current.value = "";
          if (passwordRef.current) passwordRef.current.value = "";

          // Show success SnackBar
          setSnackBarSeverity('success');
          setSnackBarMessage("Login is successful!");
          setOpenSnackBar(true);

          // Redirect after 1 second
          setTimeout(() => {
            navigate('/services');
          }, 1000);

        } else if (statusCode === 401) {
          setSnackBarSeverity('warning');
          setSnackBarMessage("Your account is not created.");
          setOpenSnackBar(true);
          navigate('/signup');
        } else {
          setSnackBarSeverity('error');
          setSnackBarMessage("Failed to login. Please try again.");
          setOpenSnackBar(true);
        }
      } else {
        setSnackBarSeverity('error');
        setSnackBarMessage("Failed to login. Please try again.");
        setOpenSnackBar(true);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setSnackBarSeverity('error');
      setSnackBarMessage("Request failed. Please try again.");
      setOpenSnackBar(true);
    }
  };


  return (
    <Stack className="login-container">
      <Paper elevation={10} className="login-up-paper-container">
        <form className="login-paper" onSubmit={handleLogInFormSubmit}>
          <Stack alignItems="center" spacing={2}>
            <h1>Log In</h1>
            {/* <Typography variant="h1" className="login-title">Log In</Typography> */}
          </Stack>

          <Stack spacing={3} className="login-form-element">
            <Box className="login-input-with-image">
              <Avatar className="input-avatar">
                <AccountCircleIcon />
              </Avatar>
              <TextField
                inputRef={emailRef}
                label="Email"
                placeholder="Enter Email"
                variant="standard"
                required
                fullWidth
                className="login-rounded-input"
              />
            </Box>
            <Box className="login-input-with-image">
              <Avatar className="login-input-avatar">
                <LockIcon />
              </Avatar>
              <TextField
                inputRef={passwordRef}
                label="Password"
                placeholder="Enter Password"
                type="password"
                variant="standard"
                required
                fullWidth
                className="login-rounded-input"
              />
            </Box>
          </Stack>

          <Stack alignItems="center" spacing={2} className="button-submit">
            <Button variant="contained" className="btn-login" type="submit">
              Log In
            </Button>
            <Typography variant="body2" className="login-text">
              Don't have an account? <a href="/signup">Sign up here</a>
            </Typography>
          </Stack>


        </form>
      </Paper>

      {snackBarMessage && (
        <SnackBar
          message={snackBarMessage}
          severity={snackBarSeverity}
          open={openSnackBar}
          handleClose={handleSnackBarClose}
        />
      )}
    </Stack>
  );
}

export default LogIn;
