"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import PortfolioTable from "./components/PortfolioTable";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchStocks } from "./services/stockService";

export default function Home() {

  const example_stocks = [
    {id: 1, name: "VOO", shares_owned: 4, div_yield: .20},
    {id: 2, name: "APPL", shares_owned: 2, div_yield: .50},
    {id: 3, name: "SCHD", shares_owned: 1, div_yield: .75},
  ]

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
    console.log('searchinput', e.target.value)
  }

  const fetchStock = () => {
    let resp = fetchStocks(searchInput).then(
      data => console.log('data', data)
    )
  }


  const renderStocks = example_stocks.map(stock =>
    <li className="stock-item" key={stock.id}>           
      <span>{stock.name}</span>
      <span>{stock.shares_owned}</span>
      <span>{stock.div_yield}</span>
      <span>{stock.div_yield * stock.shares_owned}</span>
    </li>
  );


  return (
    <div className="app">
      <h1>Div Ann</h1>

      <span>
        <a className="menu-item">Home</a>
        <a className="menu-item">About</a>
        <a className="menu-item">Contact</a>
      </span>

      <div id="search-area" className="search-area">
        <TextField placeholder="Type in name of stock to add" onChange={handleSearchInput}/>
        <Button variant="contained" onClick={fetchStock}>Search</Button>
      </div>

      {/* Auto complete feature to search existing portfolio of stocks */}
      {/* <Autocomplete
        id="free-solo-2-demo"
        disableClearable
        options={example_stocks.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      /> */}

      <div>
        <h3>My Portfolio</h3>

        <PortfolioTable stocks={example_stocks} />
      </div>
    </div>
  );
}
