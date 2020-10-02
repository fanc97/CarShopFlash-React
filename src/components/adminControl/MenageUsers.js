import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  blockUnblockUser,
  deleteUserByUID,
  getAllUsers,
} from "../../services/UserService";
import { getAllCarsByUID, deleteCarByID } from "../../services/CarService";
import { getAllMotoByUID, deleteMotoByID } from "../../services/MotoService";
import { getAllTruckByUID, deleteTruckByID } from "../../services/TruckService";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: "10px",
    minWidth: 500,
  },
});

const MenageUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsersFn();
  }, []);
  const getAllUsersFn = () => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  };

  const deleteUser = (uid) => {
    deleteUserByUID(uid)
      .then((data) => {
        if (data === "Err") {
          setMessage("Error deleting user");
        } else {
          getAllCarsByUID(uid).then((data) => {
            data.forEach((c) => {
              deleteCarByID(c.ID);
            });
          });
          getAllMotoByUID(uid).then((data) => {
            data.forEach((m) => {
              deleteMotoByID(m.ID);
            });
          });
          getAllTruckByUID(uid).then((data) => {
            data.forEach((t) => {
              deleteTruckByID(t.ID);
            });
          });
        }
      })
      .then(() => {
        getAllUsers();
      });
  };
  const toggleBlock = (user) => {
    blockUnblockUser(user)
      .then((data) => {
        console.log(data);
        if (data === "Err") {
          setMessage("Error blocking user");
        } else {
          if (user.blocked) {
            setMessage("User is blocked");
          } else {
            setMessage("User is unblocked");
          }
        }
      })
      .then(() => {
        getAllUsers();
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Block</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <StyledTableRow key={u.uid}>
              <StyledTableCell component="th" scope="row">
                {u.email}
              </StyledTableCell>
              <StyledTableCell align="right">{u.uid}</StyledTableCell>
              <StyledTableCell align="right">{u.firstName}</StyledTableCell>
              <StyledTableCell align="right">{u.lastName}</StyledTableCell>
              <StyledTableCell align="right">
                {u.blocked ? (
                  <Button
                    variant="contained"
                    style={{ color: "#fff", backgroundColor: "#51F377" }}
                    onClick={() => {
                      toggleBlock(u);
                    }}
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ color: "#fff", backgroundColor: "#EEF351" }}
                    onClick={() => {
                      toggleBlock(u);
                    }}
                  >
                    Block
                  </Button>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  style={{ color: "#fff", backgroundColor: "#e63946" }}
                  onClick={() => {
                    deleteUser(u.uid);
                  }}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <p>{message}</p>
    </TableContainer>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen,
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, authReducers }) {
  return { menu: menuReducers, user: authReducers.user };
}

// export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)));
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenageUsers)
);
