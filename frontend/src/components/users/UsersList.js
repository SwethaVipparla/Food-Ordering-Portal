import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Dashboard = (props) => {
  const [users, setFoodItems] = useState([]);
  const [selUsers, setSelUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [vendorName, setVendorName] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  //const [preference, setPreference] = useState([]);
  const [WantVeg, setVEG] = useState(true);
  const [WantNVeg, setNVEG] = useState(true);
  const [wallet, setWallet] = useState(0);
  const [addWallet, setAddWallet] = useState(0);
  const [selVendors, setVendors] = useState([]);
  const [selTags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/foodItem")
      .then((response) => {
        setFoodItems(response.data);
        setSortedUsers(response.data);
        setSearchText("");
        setSelUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("hey")

      axios
      .get("http://localhost:4000/vendor")
      .then((response) => {
        setVendorName(response.data);
        console.log(vendorName);
      })
      .catch((error) => {
        console.log(error);
      });

        axios
        .post("http://localhost:4000/fooditem/getWallet", {
          email: localStorage.getItem("email"),
        })
        .then((response) => {
          setWallet(response.data.amount);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const sortPriceChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setFoodItems(usersTemp);
    setSortName(!sortName);
  };

  const sortRatingChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setFoodItems(usersTemp);
    setSortName(!sortName);
  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };
  const onChangeWallet = (event) => {
    setAddWallet(event.target.value);
  };

  const onVeg = (val) => {
    setVEG(val);
  };

  const onNVeg = (val) => {
    setNVEG(val);
  }; 

  const onChangeVendors = (event) => {
    var value = event.target.value;
    setVendors(typeof value === "string" ? value.split(",") : value);
  };

  const onChangeTags = (event) => {
    var value = event.target.value;
    setTags(typeof value === "string" ? value.split(",") : value);
  };


  const addMoney = () => {
    axios
      .post("http://localhost:4000/fooditem/handleWallet", {
        user_name: localStorage.getItem("email"),
        amount: addWallet
      })
      .then((response) => {
        setWallet(response.data.amount)
        alert("money added yay!")
      })
      .catch((error) => {
        console.log(error);
      });
};

  const fuse = new Fuse(users, {
    keys: ["name"],
    includeScore: true,
  });

  useEffect(() => {
    let temp = [];
    if(searchText !== "")
    {
      temp = fuse.search(searchText).map((item) => item.item);
    }
    else
    {
      temp = [].concat(users);
    }

    temp = temp.filter((item) => ((WantVeg && item.preference == 'veg') || (WantNVeg && item.preference == 'non-veg')));console.log(temp);
    temp = temp.filter((item) => selVendors.length? selVendors.some((vendor) => vendor == item.vendor) : true);console.log(temp);
    temp = temp.filter((item) => selTags.length? selTags.some((vendor) => vendor == item.tags) : true);console.log(temp);

    setSelUsers(temp);

  }, [searchText, WantVeg, WantNVeg, selVendors, selTags]);

  return (
    <div>
       <Grid container spacing={3}>
        <Grid item xs={6} md={6} lg={6}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Wallet: {wallet} </h1>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          id="standard-basic"
          label="Add Money"
          fullWidth={true}
          value={addWallet}
          onChange={onChangeWallet}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={addMoney}>
          Add Money
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={onChangeSearchText}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Food Preference
                </Grid>
                
                <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />}  label="non-veg" checked={WantNVeg} onChange={() => onNVeg(!WantNVeg)} />
                <FormControlLabel control={<Checkbox defaultChecked />}  label="veg" checked={WantVeg} onChange={() => onVeg(!WantVeg)} />
                </FormGroup>

              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-multiple-name-label">Vendors</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selVendors}
                    onChange={onChangeVendors}
                    input={<OutlinedInput label="Name" />}
                  >
                    {vendorName.map((item) => (
                      <MenuItem key={item.shop_name} value={item.shop_name}>
                        {item.shop_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selTags}
                    onChange={onChangeTags}
                    input={<OutlinedInput label="Tags" />}
                  >
                    {users.map((item) =>
                      item.tags.map((tags) => (
                        <MenuItem key={tags} value={tags}>
                          {tags}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>
                    <Button onClick={sortPriceChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price</TableCell>
                  <TableCell>
                  <Button onClick={sortRatingChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating</TableCell>
                  <TableCell>Preference</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selUsers.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.vendor}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.preference}</TableCell>
                    <TableCell>{user.addon}</TableCell>
                    <TableCell>{user.tags}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
