import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const formControl = {
    margin: "10px",
    width: "15%",
    display: "flex",
    wrap: "nowrap"
  };


const BuyerRegister = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setAge("");
    setBatch("");
    setNumber("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      number: number,
      password: password,
      age: age,
      batch: batch,
      type: "buyer",
    };

    axios
      .post("http://localhost:4000/buyer/register", newUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    resetInputs();
    navigate("/");
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name*"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email*"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Number*"
          variant="outlined"
          value={number}
          onChange={onChangeNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password*"
          variant="outlined"
          value={password}
          type={'password'}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age*"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={formControl}>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={batch}
            label="Type"
            onChange={onChangeBatch}
          >
            <MenuItem value={"UG1"}>UG1</MenuItem>
            <MenuItem value={"UG2"}>UG2</MenuItem>
            <MenuItem value={"UG3"}>UG3</MenuItem>
            <MenuItem value={"UG4"}>UG4</MenuItem>
            <MenuItem value={"UG5"}>UG5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} 
          style={{ textAlign:'center' }}>

        <Button variant="contained" onClick={onSubmit} sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 150,
          alignItems: 'center',
        }}>
          Register
        </Button>

      </Grid>
    </Grid>
  );
};

const VendorRegister = (props) => {
  const navigate = useNavigate();
  const [manager_name, setManagerName] = useState("");
  const [shop_name, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [opening_time, setOpeningTime] = useState("");
  const [closing_time, setClosingTime] = useState("");

  const onChangeUsername = (event) => {
    setManagerName(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };


  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeOpeningTime = (event) => {
    setOpeningTime(event.target.value);
  };

  const onChangeClosingTime = (event) => {
    setClosingTime(event.target.value);
  };

  const resetInputs = () => {
    setOpeningTime("");
    setEmail("");
    setClosingTime("");
    setShopName("");
    setNumber("");
    setPassword("");
    setManagerName("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      shop_name: shop_name,
      manager_name: manager_name,
      email: email,
      number: number,
      password: password,
      opening_time: opening_time,
      closing_time: closing_time,
      type: "vendor"
    };

    axios
      .post("http://localhost:4000/vendor/register", newUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    resetInputs();
    navigate("/");
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Shop Name*"
          variant="outlined"
          value={shop_name}
          onChange={onChangeShopName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Manager Name*"
          variant="outlined"
          value={manager_name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email*"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Number*"
          variant="outlined"
          value={number}
          onChange={onChangeNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password*"
          variant="outlined"
          value={password}
          type={'password'}
          onChange={onChangePassword}
        />
        </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opening Time*"
          variant="outlined"
          value={opening_time}
          onChange={onChangeOpeningTime}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Closing Time*"
          variant="outlined"
          value={closing_time}
          onChange={onChangeClosingTime}
        />
      </Grid>
      <Grid item xs={12} 
          style={{ textAlign:'center' }}>

        <Button variant="contained" onClick={onSubmit} sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 150,
          alignItems: 'center',
        }}>
          Register
        </Button>

      </Grid>
    </Grid>
  );
};

const Register = () => {
  const [value, setValue] = useState("");
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
    <Grid container align={"center"} spacing={3}>
    <Grid item xs={12}>
      <FormControl style={formControl}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"Vendor"}>Vendor</MenuItem>
          <MenuItem value={"Buyer"}>Buyer</MenuItem>
        </Select>
      </FormControl>
      {
        value === "Vendor" ? <VendorRegister /> : value === "Buyer" ? <BuyerRegister /> : null
      }
      </Grid>
    </Grid>
    </div>
  )};
  
  export default Register;
