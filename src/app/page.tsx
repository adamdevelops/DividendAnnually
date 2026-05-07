"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import PortfolioTable from "./components/PortfolioTable";
import { fetchStocks, fetchStockDiv } from "./services/stockService";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Stock } from './types/Stock'


export interface SimpleDialogProps {
  open: boolean;
  actionType: string;
  modalContent: string;
  selectedStock: Stock;
  onClose: (value: string) => void;
  onCancel: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, onCancel, actionType, modalContent, selectedStock, open } = props;

  const handleClose = () => {
    console.log('selectedStock.id', selectedStock.id)
    onClose(selectedStock.id);
  };

  const cancel = () => {
    onCancel();
  }


  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {actionType + " Stock"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalContent}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>Stock: {selectedStock.name}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {actionType}
          </Button>
          <Button onClick={cancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}


export default function Home() {

  const [searchInput, setSearchInput] = useState("");
  const [stockSearch, setStockSearch] = useState([]);
  const [addStockQty, setAddStockQty] = useState(0);
  const [dropdownSearchVisible, setDropdownSearchVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [selectedStock, setSelectedStock] = useState({});
  const [userStocks, setUserStocks] = useState([]);

  

  const handleSearchInput = (e) => {
    // Capitalize ticker symbols entered to prevent error on fetching stock
    if(e.target.id == "search"){
      let input = e.target.value.toUpperCase()
      setSearchInput(input)
      console.log('searchinput', input)
    } else{
      let input = e.target.value
      setAddStockQty(input)
    }    
  }

  const handleModalOpen = (actionType: string, stock: Stock) => {
    setModalAction(actionType)
    setSelectedStock(stock)
    if(actionType == "Edit"){
      setModalContent("How many shares owned would like to modify for?")
    } else{
      setModalContent("Are you sure you want to delete this stock?")
    }
    setOpenModal(true);
  };

  const handleModalClose = (stockId: string) => {
    setOpenModal(false);
    deleteSelectedStock(stockId);
  };

  const handleCancel = () => {
    setOpenModal(false);
  }

  const addStockToUserStocks = (stock: any) => {
    let newStock: Stock = {details: stock, id: null, name: stock.ticker, shares_owned: addStockQty, div_yield: null, previously_owned: false}

    let resp2 = fetchStockDiv(stock.ticker).then(
      data => {
        // grab the cash amount of first result and times by frequency, then set state
        console.log('div data', data.results[0])
        let stock_div = data.results[0];
        console.log(stock_div.cash_amount)
        newStock.div_yield = (stock_div.cash_amount * stock_div.frequency).toFixed(2);
        newStock.id = stock_div.id;
        setUserStocks(userStocks => userStocks.concat(newStock))
      }
    )    
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
        setDropdownSearchVisible(true);
      }
    )
  }

  const renderSearchStocks = stockSearch.map((stock, index) =>
    <ng-container key={index}>
      <li className="search-stock-item" >
        <div className="search-stock-item-info">
          <span className="search-stock-item-name">{stock.name}</span>
          <span className="search-stock-item-ticker">{stock.ticker}</span>
        </div>
        <div className="search-stock-item-btn" >
          <TextField id="qtyOfStocks" onChange={handleSearchInput}/>
          <FontAwesomeIcon className="add-btn" icon={faPlus} onClick={() => {
            addStockToUserStocks(stock)
            setDropdownSearchVisible(false)
          }} />
        </div>
      </li>
      <hr className="divider" />
    </ng-container>
    
  );

  const modifySharesOwned = () => {

  }

  const editSelectedStock = (editedStockId: string) => {

  }

  const deleteSelectedStock = (deletedStockId: string) => {
    let updatedStocks = userStocks.filter(stock => stock.id != deletedStockId)
    console.log(updatedStocks)

    setUserStocks(updatedStocks)
  }

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
          <TextField id="search" name="search" placeholder="Type in stock name" onChange={handleSearchInput}/>
          
          <Button variant="contained" className="search-btn" onClick={fetchStock}>Search</Button>
        </div>
        
        {
          dropdownSearchVisible &&

          <div id="drop-down-area" className="drop-down-area">
            {renderSearchStocks}
            <div className="close-btn" onClick={() => setDropdownSearchVisible(false)}>Close</div>
          </div>

        }
      </div>

      <div>
        <h3>My Portfolio</h3>

        <PortfolioTable stocks={userStocks} handleModalOpen={handleModalOpen} editStock={editSelectedStock} deleteStock={deleteSelectedStock} />
        <SimpleDialog
          selectedStock={selectedStock}
          open={openModal}
          onClose={handleModalClose} 
          onCancel={handleCancel}
          actionType={modalAction} 
          modalContent={modalContent}        
        />
      </div>
    </div>
  );
}

