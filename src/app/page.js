"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import PortfolioTable from "./components/PortfolioTable";
import { fetchStocks } from "./services/stockService";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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

  // example search stocks
  const example_search = [{
    "ticker": "A",
    "name": "Agilent Technologies Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNYS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0001090872",
    "composite_figi": "BBG000C2V3D6",
    "share_class_figi": "BBG001SCTQY4",
    "last_updated_utc": "2025-05-21T00:00:00Z"
  },
  {
    "ticker": "NVDA",
    "name": "Nvidia Corp",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNAS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0001045810",
    "composite_figi": "BBG000BBJQV0",
    "share_class_figi": "BBG001S5TZJ6",
    "last_updated_utc": "2025-06-16T00:00:00Z"
  },
  {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNAS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "share_class_figi": "BBG001S5N8V8",
    "last_updated_utc": "2025-06-16T00:00:00Z"
  }]

  const [searchInput, setSearchInput] = useState("");
  const [stockSearch, setStockSearch] = useState([]);
  const [dropdownSearchVisibile, setDropdownSearchVisibile] = useState(false);
  const [userStocks, setUserStocks] = useState([])
  

  const handleSearchInput = (e) => {
    // Capitalize ticker symbols entered to prevent error on fetching stock
    let input = e.target.value.toUpperCase()
    setSearchInput(input)
    console.log('searchinput', input)
  }

  const addStockToUserStocks = (stock) => {
    setUserStocks(userStocks => userStocks.concat(stock))
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
        setDropdownSearchVisibile(true);
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

  const renderSearchStocks = stockSearch.map((stock, index) =>
    <ng-container key={index}>
      <li className="search-stock-item" >
        <div className="search-stock-item-info">
          <span className="search-stock-item-name">{stock.name}</span>
          <span className="search-stock-item-ticker">{stock.ticker}</span>
        </div>
        <div className="search-stock-item-btn" onClick={() => setDropdownSearchVisibile(false)}>
          <FontAwesomeIcon icon={faPlus} onClick={() => addStockToUserStocks(stock)} />
        </div>        
      </li>
      <hr className="divider" />
    </ng-container>
    
  );

  console.log('userStocks', userStocks)
  return (
    <div className="app">
      <h1>Div Ann</h1>

      <span>
        <a className="menu-item">Home</a>
        <a className="menu-item">About</a>
        <a className="menu-item">Contact</a>
      </span>

      <div id="search-area" className="search-area">
        <div className="searchbox">
          <TextField placeholder="Type in stock name" onChange={handleSearchInput}/>
          
          <Button variant="contained" className="search-btn" onClick={fetchStock}>Search</Button>
        </div>
        
        {
          dropdownSearchVisibile &&

          <div id="drop-down-area" className="drop-down-area">
            {renderSearchStocks}
            <div className="close-btn" onClick={() => setDropdownSearchVisibile(false)}>Close</div>
          </div>

        }
      </div>

      <div>
        <h3>My Portfolio</h3>

        <PortfolioTable stocks={example_stocks} />
      </div>
    </div>
  );
}
