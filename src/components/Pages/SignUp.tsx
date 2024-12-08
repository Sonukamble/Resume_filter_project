import { Paper, Typography, TextField, Stack, Box, Avatar, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import '../../css/Pages/SignUp.css';
import { FormEvent, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import SnackBar from "../commons/SnackBar";




const SignUp = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState<"success" | "error" | "warning" | "info">("info");


  const navigate = useNavigate();

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  const handleSignUpForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username: string | undefined = usernameRef.current?.value;
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    const confirmPassword: string | undefined = confirmPasswordRef.current?.value;

    // Check for password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
      return;
    }

    const signUpData = {
      username: username ?? "",
      email: email ?? "",
      password: password ?? ""
    };

    try {
      const response = await fetch(`${apiBaseUrl}/create_user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData)
      });

      if (response.ok) {
        const data = await response.json();
        const statusCode = data.cIntResponseStatus;

        if (statusCode === 201) {
          if (usernameRef.current) usernameRef.current.value = "";
          if (emailRef.current) emailRef.current.value = "";
          if (passwordRef.current) passwordRef.current.value = "";
          if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";

          setSuccessMessage("Account created successfully!");
          setError(null); // Clear error if any
          setSnackBarSeverity("success");
          setOpenSnackBar(true);

          // Redirect to login page after showing success message
          setTimeout(() => {
            navigate("/login");
          }, 1000);

        } else if (statusCode === 400) {
          setError("Your account is already created.");
          setSnackBarSeverity("info");
          setOpenSnackBar(true);
        } else {
          setError("An unexpected error occurred. Please try again.");
          setSnackBarSeverity("error");
          setOpenSnackBar(true);
        }

      } else {
        setError("Failed to sign up. Please try again.");
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
      } else {
        setError("An unknown error occurred.");
        setSnackBarSeverity("error");
        setOpenSnackBar(true);
      }
    }
  };

  return (
    <Stack className="signup-container" >
      <Paper elevation={10} className="sign-up-paper-container">
        <form onSubmit={handleSignUpForm} className="signup-paper">
          <Stack alignItems="center" spacing={2}>
            <h1>Sign Up</h1>
            {/* <Typography variant="h4" className="signup-title">Sign Up</Typography> */}
          </Stack>

          <Box className="form-element">
            <Box className="input-with-image">
              <Avatar className="input-avatar">
                <AccountCircleIcon />
              </Avatar>
              <TextField
                inputRef={usernameRef}
                label="Username"
                placeholder="Enter Username"
                variant="standard"
                required
                fullWidth
                className="rounded-input"
              />
            </Box>
            <Box className="input-with-image">
              <Avatar className="input-avatar">
                <EmailIcon />
              </Avatar>
              <TextField
                inputRef={emailRef}
                label="Email"
                placeholder="Enter Email"
                type="email"
                variant="standard"
                required
                fullWidth
                className="rounded-input"
              />
            </Box>
            <Box className="input-with-image">
              <Avatar className="input-avatar">
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
                className="rounded-input"
              />
            </Box>
            <Box className="input-with-image">
              <Avatar className="input-avatar">
                <LockIcon />
              </Avatar>
              <TextField
                inputRef={confirmPasswordRef}
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                variant="standard"
                required
                fullWidth
                className="rounded-input"
              />
            </Box>
          </Box>

          <Stack alignItems="center" spacing={2} className="button-submit">
            <Button variant="contained" className="btn-create-account" type="submit">
              Create Account
            </Button>
            <Typography variant="body2" className="login-text">
              Already have an account? <a href="/login">Login here</a>
            </Typography>
          </Stack>

          
        </form>
      </Paper>

      {/* SnackBar for displaying success or error messages */}
      {error && (
        <SnackBar
          message={error}
          severity={snackBarSeverity}
          open={openSnackBar}
          handleClose={handleSnackBarClose}
        />
      )}

      {successMessage && (
        <SnackBar
          message={successMessage}
          severity={snackBarSeverity}
          open={openSnackBar}
          handleClose={handleSnackBarClose}
        />
      )}
    </Stack>
  );
};

export default SignUp;
