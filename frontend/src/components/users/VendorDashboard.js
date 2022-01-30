import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Select, InputLabel,Checkbox, DialogActions } from "@mui/material";


const VendorDashboard = (props) => {
  const [vendors, setvendors] = useState([]);
  const [vendorDetails, setvendorDetails] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);
  const [foodPreference, setFoodPreference] = useState("");
  const [addons, setAddons] = useState([]);
  const [tags, setTags] = useState([]);
  const [addonsPrice, setAddonsPrice] = useState([]);
  const [index, setIndex] = useState(0);

  const onAdd = (e) => {
    setOpenAdd(true);
  }

  const onEdit = (e, ind) => {
    setFoodName(vendors[ind].name);
    setFoodPrice(vendors[ind].price);
    setFoodPreference(vendors[ind].preference);
    setAddons(vendors[ind].addon.toString());
    setAddonsPrice(vendors[ind].addon_price.toString());
    setTags(vendors[ind].tags.toString());
    setOpenEdit(true);
  }

  const onDelete = (e, ind) => {
    setOpenDelete(true);
    setIndex(ind);
  }

  const onClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
  }

  const onChangeFoodName = (e) => {
    setFoodName(e.target.value);
  }

  const onChangeFoodPrice = (e) => {
    setFoodPrice(e.target.value);
  }

  const onChangePreference = (e) => {
    setFoodPreference(e.target.value);
  }

  const onChangeAddons = (e) => {
    setAddons(e.target.value.split(","));
  }
  const onChangeAddonsPrice = (e) => {
    setAddonsPrice(e.target.value.split(","));
  }

  const onChangeTags = (e) => {
    setTags(e.target.value.split(","));
  }

  const onAddSubmit = (e) => {
    const shop = vendorDetails.shop_name;
    e.preventDefault();
    const newVendor = {
      name : foodName,
      price: foodPrice,
      preference: foodPreference,
      addon: addons,
      addon_price: addonsPrice,
      vendor: shop,
      tags: tags,
    };
    axios.post("http://localhost:4000/foodItem/addItem", newVendor).then((res) => {
      console.log(res.data);
      setOpenAdd(false);
      window.location.reload();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  const onEditSubmit = (e) => {
    const shop = vendorDetails.shop_name;
    console.log(foodPrice)

    const newVendor = {
      name : foodName,
      price: foodPrice,
      preference: foodPreference,
      addon: addons,
      addon_price: addonsPrice,
      vendor: shop,
      tags: tags,
    };

    axios
    .put("http://localhost:4000/foodItem/editItem", newVendor)
    .then((response) => {
      alert("User updated successfully");
      console.log(response.data);
      window.location.reload();
      setOpenEdit(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const onDeleteSubmit = (e) => {
    console.log("yoz")
    axios.post("http://localhost:4000/foodItem/delete", {
      name: vendors[index].name}).then((res) => {
      console.log(res.data);
      setOpenDelete(false);
      window.location.reload();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
      const email = localStorage.getItem("email");
      console.log(email);
      axios
      .post("http://localhost:4000/vendor/getVendor", {email: email})
        .then((response) => {
            setvendorDetails(response.data);
            console.log(response.data)

            axios
            .post("http://localhost:4000/foodItem/vendorDetails", {shop_name: response.data.shop_name})
            .then((res) => {
                setvendors(res.data);
                console.log(res.data.price)
            })
            .catch((error) => {
                console.log(error);
            });
                      })
            .catch((error) => {
                console.log(error);
            });        
  }, []);

  return (
    <div>
        <Dialog open={openAdd} onClose={onClose}>
          <DialogTitle> Add Item </DialogTitle>
          <DialogContent>
            <DialogContentText>Details</DialogContentText>
            <TextField spacing={3} label="Name" value={foodName} onChange={onChangeFoodName}/>
            <TextField spacing={3} label="Price" value={foodPrice} onChange={onChangeFoodPrice}/>
            <TextField spacing={3} label="Preference" value={foodPreference} onChange={onChangePreference}/>
            <TextField spacing={3} label="Addon" value={addons} onChange={onChangeAddons}/>
            <TextField spacing={3} label="Addon Price" value={addonsPrice} onChange={onChangeAddonsPrice}/>
            <TextField spacing={3} label="Tag" value={tags} onChange={onChangeTags}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={onAddSubmit}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
         <Grid item xs={12} md={12} lg={12}>
         <Button variant="contained" color="primary" onClick={onAdd}>
          Add Item </Button>
        </Grid>

        <Dialog open={openEdit} onClose={onClose}>
          <DialogTitle> Edit Item </DialogTitle>
          <DialogContent>
            <DialogContentText>Details</DialogContentText>
            <TextField inputProps={{ readOnly: true }} spacing={3} label="Name" value={foodName} onChange={onChangeFoodName}/>
            <TextField spacing={3} label="Price" value={foodPrice} onChange={onChangeFoodPrice}/>
            <TextField spacing={3} label="Preference" value={foodPreference} onChange={onChangePreference}/>
            <TextField spacing={3} label="Addon" value={addons} onChange={onChangeAddons}/>
            <TextField spacing={3} label="Addon Price" value={addonsPrice} onChange={onChangeAddonsPrice}/>
            <TextField spacing={3} label="Tag" value={tags} onChange={onChangeTags}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={onEditSubmit}>Edit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDelete} onClose={onClose}>
          <DialogTitle> Delete Item </DialogTitle>
          <DialogContent>
          <DialogContentText>You sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDeleteSubmit}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </DialogActions>
        </Dialog>
      
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Vendor Name
                  </TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Preference</TableCell>
                  <TableCell>Addon</TableCell>
                   <TableCell>Addon Price</TableCell>
                   <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors? vendors.map((vendor, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.price}</TableCell>
                    <TableCell>{vendor.preference}</TableCell>
                    <TableCell>{vendor.addon.toString()}</TableCell>
                    <TableCell>{vendor.addon_price.toString()}</TableCell>
                    <TableCell>{vendor.tags.toString()}</TableCell>
                    <TableCell> 
                      <Button variant="contained" color="primary" onClick={(event) => onEdit(event, ind)}>
                        Edit Item 
                      </Button>
                    </TableCell>
                    <TableCell> 
                      <Button variant="contained" color="primary" onClick={(event) => onDelete(event, ind)}>
                        Delete Item 
                      </Button>
                    </TableCell>
                  </TableRow> 
                )) : null}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        </div>
  );
};

export default VendorDashboard;
