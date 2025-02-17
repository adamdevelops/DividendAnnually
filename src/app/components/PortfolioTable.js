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

export default function PortfolioTable({stocks}) {
    return(
    <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 300, margin: "auto", mt: 3 }} aria-label="portfolio table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Shares Owned</TableCell>
                <TableCell>Dividend Yield</TableCell>
                <TableCell>Annual Dividend</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {stocks.map((stock) => (
                    <TableRow key={stock.id}>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.shares_owned}</TableCell>
                        <TableCell>{stock.div_yield}</TableCell>
                        <TableCell>{stock.div_yield * stock.shares_owned}</TableCell>
                    </TableRow>
                ))}
        </TableBody>
        </Table>
    </TableContainer>
    )
}