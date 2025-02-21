import React, { useState } from 'react';
import { Button, TextField, Link } from '@mui/material';
import '../styles/Layout.css';
import Header from '../components/Header';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { backendCall } from "../utils/network";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Login() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMesage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  const onUsernameChange = (event) => {
    setUserName(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const login = async (event) => {
    event.preventDefault();

    await backendCall.post('/graphql', {
      query: `
      mutation {
        login(username: "${username}", password: "${password}") {
          token
          username
        }
      }
      `
    }).then((res) => {
      const data = res.data.data.login;
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('username', data.username);
      window.location = '/task';
    }).catch((err) => {
      if (err.response && err.response.errors && err.response.errors.length > 0) {
        setErrorMessage(err.response.errors[0].message);
        setIsSnackbarOpen(true);
      }
    });
  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  return (
    <>
      <Header />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="username"
              value={username}
              onChange={onUsernameChange}
              placeholder="User Name"
              required
              fullWidth
            />
          </div>
          <div className="mb-6">
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
              required
              fullWidth
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={username === '' || password === ''}
              onClick={login}
            >
              Login
            </Button>
            <Link href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
      <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
        <Alert severity="error" onClose={hanldeSnackbarClose}>{errorMesage}</Alert>
      </Snackbar>
    </>
  );
}
