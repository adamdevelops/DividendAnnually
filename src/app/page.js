import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  const example_stocks = [
    {id: 1, name: "VOO", shares_owned: 4, div_yield: "4 %"},
    {id: 2, name: "APPL", shares_owned: 2, div_yield: "3 %"},
    {id: 3, name: "SCHD", shares_owned: 1, div_yield: "7 %"},
  ]


  const renderStocks = example_stocks.map(stock => 
    <li className="stock-item" key={stock.id}>           
      <span>{stock.name}</span>
      <span>{stock.shares_owned}</span>
      <span>{stock.div_yield}</span>
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
        <input placeholder="Type in name of stock to add" />
        <button>Search</button>
      </div>

      <div>
        <h3>My Portfolio</h3>
        <ul>
          {renderStocks}
        </ul>
      </div>
    </div>
  );
}
