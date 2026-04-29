import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stock } from "../types/Stock";

type ChildProps = {
    stocks: Stock[];
    modifyMode: boolean;
    handleModalOpen: (actionType: string) => void;
    deleteStock: (deletedStockId: string) => void;
}

export default function PortfolioTable({stocks, deleteStock}: ChildProps) {
    return(
    <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 300, margin: "auto", mt: 3 }} aria-label="portfolio table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Shares Owned</TableCell>
                <TableCell>Annual Dividend</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {stocks.map((stock) => (
                    <TableRow key={stock.id}>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.shares_owned}</TableCell>
                        <TableCell>{(stock.div_yield * stock.shares_owned).toFixed(2)}</TableCell>
                        <TableCell><button onClick={() => handleModalOpen("Edit")}>Edit</button><button onClick={() => deleteStock(stock.id)}><i className="fa-solid fa-trash"></i>Delete</button></TableCell>
                    </TableRow>
                ))}
        </TableBody>
        </Table>
    </TableContainer>
    )
}