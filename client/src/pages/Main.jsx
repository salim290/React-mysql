import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import "./App.css";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


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
        minWidth: 700,
    },
});


const Main = () => {
    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                const res = await axios.get("http://localhost:1884/mqttpy");
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllMessages();
    }, []);

    console.log(product);

    const handleDeleteAll = async () => {
        try {
            await axios.delete(`http://localhost:1884/mqttpy`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <h1>IoT technologies</h1>
            <h2>Created by students: Salim, Bastien and Linus</h2>
            <input
                type="text"
                placeholder="Search here"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Number</StyledTableCell>
                            <StyledTableCell>Topic</StyledTableCell>
                            <StyledTableCell>Value</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product
                            .filter((item) => {
                                if (search === "") {
                                    return item;
                                } else if (
                                    item.topic.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return item;
                                }
                                return false
                            })
                            .map((item) => {
                                return (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell align="left">
                                            {item.id}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {item.topic}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {item.value}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {item.newtime}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <button className="delete" onClick={() => handleDeleteAll()}>Delete All</button>
            </div>
        </div>
    );
};

export default Main;
