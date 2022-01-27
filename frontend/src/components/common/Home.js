import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmitRegister = (event) => {
    navigate("/register");
  };

  const onSubmitLogin = (event) => {
    navigate("/login");
  };


  return (
    <Grid  container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}>

      <Grid item xs={12} 
          style={{ textAlign:'center' }}>

        <Button variant="contained" onClick={onSubmitRegister} sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 150,
          alignItems: 'center',
        }}>
          Register
        </Button>

      </Grid>

      <Grid item xs={12} 
          style={{ textAlign:'center' }}>

        <Button variant="contained" onClick={onSubmitLogin} sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 150,
          alignItems: 'center',
        }}>
          Log In
        </Button>

        </Grid>
        
    </Grid>
  );
};
  
  export default Login;
   
   