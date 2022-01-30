import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

const OrdersList = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const email = localStorage.getItem("email")
    axios
      .post("http://localhost:4000/foodItem/orders", {email: email})
      .then((response) => {
        setOrders(response.data);
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
                  <TableCell> S No.</TableCell>
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
                {orders? orders.map((order, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.vendor}</TableCell>
                    <TableCell>{order.foodItem}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.rating}</TableCell>
                  </TableRow> 
                )) : null}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        </div>
  );
};

export default OrdersList;