import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

const VendorsList = (props) => {
  const [vendors, setvendors] = useState([]);
  const [vendorDetails, setvendorDetails] = useState({});

  useEffect(() => {
      axios
      .post("http://localhost:4000/vendor/getName", {email: localStorage.getItem("email")})
        .then((response) => {
            setvendorDetails(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

        axios
        .post("http://localhost:4000/fooditem/vendorDisplay",{vendorDetails})
        .then((response) => {
            setvendors(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
  }, []);

  return (
    <div>
      
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    Placed Time
                  </TableCell>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Food Item</TableCell>
                   <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                   <TableCell>Cost</TableCell>
                   <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors? vendors.map((vendor, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{vendor.time}</TableCell>
                    <TableCell>{vendor.vendor}</TableCell>
                    <TableCell>{vendor.food_name}</TableCell>
                    <TableCell>{vendor.quantity}</TableCell>
                    <TableCell>{vendor.status}</TableCell>
                    <TableCell>{vendor.total_price}</TableCell>
                    <TableCell>{vendor.rating}</TableCell>
                  </TableRow> 
                )) : null}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        </div>
  );
};

export default VendorsList;
