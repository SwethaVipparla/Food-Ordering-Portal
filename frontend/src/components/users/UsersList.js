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
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const UsersList = (props) => {
  const [users, setFoodItems] = useState([]);
  const [selUsers, setSelUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [preference, setPreference] = useState("");

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
  }, []);

  console.log(users)

  const sortChange = () => {
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

  const onChangePreference = (event) => {
    setPreference(event.target.value);
  };

  const addPreference = (event) => {
    axios
      .post("http://localhost:4000/foodItem/preference", { preference: preference })
      .then((response) => {
        setFoodItems(response.data);
        setSortedUsers(response.data);
      
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const fuse = new Fuse(users, {
    keys: ["name"],
    includeScore: true,
  });

  useEffect(() => {
    let temp = [];
    if(searchText != "")
    {
      temp = fuse.search(searchText).map((item) => item.item);
    }
    else
    {
      temp = [].concat(users);
    }
    console.log(temp);
    setSelUsers(temp);
  }, [searchText]);

  return (
    <div>
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
                <FormGroup
                  label="Preference"
                  value={preference}
                  onChange={onChangePreference}
                > 
                  <FormControlLabel control={<Checkbox />} label="Veg" />
                  <FormControlLabel control={<Checkbox />} label="Non-Veg" />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addPreference}
                >
                  Apply
                </Button>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
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
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Name
                  </TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
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

export default UsersList;
