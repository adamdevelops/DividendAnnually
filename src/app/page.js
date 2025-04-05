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

  // {
  //   "results": [
  //     {
  //       "ticker": "AAPL",
  //       "name": "Apple Inc.",
  //       "market": "stocks",
  //       "locale": "us",
  //       "primary_exchange": "XNAS",
  //       "type": "CS",
  //       "active": true,
  //       "currency_name": "usd",
  //       "cik": "0000320193",
  //       "composite_figi": "BBG000B9XRY4",
  //       "share_class_figi": "BBG001S5N8V8",
  //       "last_updated_utc": "2025-03-21T00:00:00Z"
  //     }
  //   ],
  //   "status": "OK",
  //   "request_id": "59e8f13abcd5a4e399f172167b223aa7",
  //   "count": 1
  // }

  const [searchInput, setSearchInput] = useState("");
  const [stockSearch, setStockSearch] = useState([])

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
    console.log('searchinput', e.target.value)
  }

  const handleDropdownInput = (e) => {
    setSearchInput(e.target.value)
    console.log('searchinput', e.target.value)

    fetchStock();
  }

  const fetchStock = () => {
    let resp = fetchStocks(searchInput).then(
      data => {
        if(data.results.length < 1){
          
          console.log('data', data)
          return
        }
        console.log('data', data)

        setStockSearch(data.results)
      }
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
      <Autocomplete
        id="free-solo-2-demo"
        className="dropdown-area"
        
        
        options={stockSearch.map(option => option.name + " - " + option.ticker)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            onChange={handleSearchInput}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />

      <div>
        <h3>My Portfolio</h3>

        <PortfolioTable stocks={example_stocks} />
      </div>
    </div>
  );
}
