import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import { LoadingScreen } from './components/loading-screen/loading-screen.component';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currencyTable: [],   //table with all information about currencies
      search: "",     //text from search-box component
      currencyselectedCode: 'PLN',
      currencyValue: 1,
      chartDays: 30,  //from how many days chart get data
      chartData: [],  //data from one specific clicked currency
      USDValue: 0,    //number, will be define 
      isLoading: true, //loading screen displaying
      selectedID: "",
      ArowClickEnd: true
    };
  }


  async componentDidMount() {
    try {
      const currencyPLN = {
        "table": "0",
        "no": "045/A/NBP/2021",
        "effectiveDate": "2021-03-08",
        "rates": [{
          "currency": "pln (Polska)",
          "code": "PLN", "mid": 1
        }]
      };  //json from Api does not have pln
      const currencyA = await this.getCurrencyFromTable('A');
      const currencyB = await this.getCurrencyFromTable('B');
      const currency = [currencyPLN, ...currencyA, ...currencyB];

      this.setState({ currencyTable: currency })
      let goingThroughtJSONToGetUSD = this.state.currencyTable[1]
      this.setState({ USDValue: goingThroughtJSONToGetUSD.rates[1].mid },
        () => {
          setTimeout(
            () => { this.setState({ isLoading: false }) }
            , 1000)
        })

      // another method to get USD value (this.state.currency[1]).rates[1].mid
    } catch (error) {
      console.log(error)
    }
  }
  //api from nbp have 3 tables, 2 are usefull in project
  getCurrencyFromTable(table) {
    return fetch(`https://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`)
      .then((response) => response.json())
  }

  async getCurrencyFromDay(code, table) {
    if (code === 'PLN') {
      code = "USD"
      table = 'A'
    }
    var end = new Date();
    var start = new Date(new Date().setDate(end.getDate() - this.state.chartDays))
    let year = start.getFullYear()
    let month = start.getMonth() < 10 ? '0' + start.getMonth() : start.getMonth();
    let day = start.getDate()
    var startDate = year + "-" + month + "-" + day;
    year = end.getFullYear()
    month = end.getMonth() < 10 ? '0' + end.getMonth() : end.getMonth();
    day = end.getDate()
    var endDate = year + "-" + month + "-" + day;
    return fetch(`https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/?format=json`)
      .then((response) => response.json())
  }

  getChartDataFromTable = async (code, table) => {
    const chartData = await this.getCurrencyFromDay(code, table)
    this.setState({ chartData })
  }

  handleCurrencySelectedCodeChange = code => {
    this.setState({ currencyselectedCode: code })
  }
  handleSearchChange = value => {
    this.setState({ search: value })
  }
  handleCurrencyValueChange = value => {
    this.setState({ currencyValue: value })
  }
  handleChartData = (code, table) => {
    this.setState({ chartCode: code }, () => {
      this.getChartDataFromTable(code, table)
    })
  }
  handleSelectedID = (id) => {
    this.setState({ selectedID: id })
  }
  handleArrowClick = (e) => {
    var selected = this.state.selectedID
    //line below: chceck if clicked key was not in search input, check if at least one card was clicked and check if thisfunction has ended
    if (e.path[0].id !== "Search-Input" && this.state.selectedID !== "" && this.state.ArowClickEnd) {  //if you click in Search-Input nothing happend, and if any of cards was chosen
      this.setState({ ArowClickEnd: false })
      let code = ""
      let table = ""
      let tableOneLength = (this.state.currencyTable[1].rates).length //length of the first table
      let TwoTablesLength = tableOneLength + (this.state.currencyTable[2].rates).length //length of the both tables
      if (e.keyCode === 37 && +selected > 0) {   //left arrow
        //2 lines below check if code and selectediD will be correct 
        code = (+selected === 1) ? "PLN" : (selected <= tableOneLength + 1) ?  this.state.currencyTable[1].rates[selected - 2].code : 
         this.state.currencyTable[2].rates[selected - (tableOneLength + 2)].code
        selected = (code !== this.state.currencyselectedCode) ? selected : (selected !== 1) ? selected - 1 : selected
        if (+selected === 1) {
          code = "PLN"
          table = this.state.currencyTable[0].table
        }
        else if (selected <= (tableOneLength + 1)) {
          code = this.state.currencyTable[1].rates[selected - 2].code
          table = this.state.currencyTable[1].table
        }
        else {
          code = this.state.currencyTable[2].rates[selected - (tableOneLength + 2)].code
          table = this.state.currencyTable[2].table
        }
        if (code !== this.state.currencyselectedCode) {  //to not select hidden cards
          this.changeSelectedIDChardDataAndFocusOnSelected((+selected - 1), code, table)
        }
        else if (selected !== 1) { //check if the card is not the first
          this.changeSelectedIDChardDataAndFocusOnSelected((+selected - 2), code, table)//to skip hidden card
        }
      }
      else if (e.keyCode === 39 && +selected < TwoTablesLength) {   //right click
        code = (selected < tableOneLength) ? this.state.currencyTable[1].rates[selected].code : this.state.currencyTable[2].rates[selected - 35].code
        selected = (code !== this.state.currencyselectedCode) ? selected : selected + 1
        if (selected < tableOneLength) {
          code = this.state.currencyTable[1].rates[selected].code
          table = this.state.currencyTable[1].table
        }
        else if (selected >= tableOneLength && selected <= (TwoTablesLength - 1)) {
          code = this.state.currencyTable[2].rates[selected - tableOneLength].code
          table = this.state.currencyTable[2].table
        }
        if (code !== this.state.currencyselectedCode) {  //to not select hidden cards 
          this.changeSelectedIDChardDataAndFocusOnSelected((+selected + 1), code, table)
        }
        else if (selected !== TwoTablesLength) { //check if card is not the last
          this.changeSelectedIDChardDataAndFocusOnSelected((+selected + 2), code, table)//to skip hidden card
        }
      }
      setTimeout(() => { this.setState({ ArowClickEnd: true }) }, 200)
    }
  }
  //function to shorten handleArrowClick 
  changeSelectedIDChardDataAndFocusOnSelected(newSelectedID, code, table) {
    //here is small error check
    this.setState({ selectedID: newSelectedID }, () => { this.handleChartData(code, table) })
    document.getElementById('selected').focus()
  }


  render() {
    return (
      (this.state.isLoading) ?
        <LoadingScreen /> :
        <div className="App" >
          {document.addEventListener('keydown', this.handleArrowClick)}
          <img src="favicon.svg" alt="" id="logo"></img>
          <span id='website-title'>How much do you have?</span>
          <SearchBox
            currencyTable={this.state.currencyTable}
            searchChange={this.handleSearchChange}
            handleCurrencySelectedCodeChange={this.handleCurrencySelectedCodeChange}
            currencyValueChange={this.handleCurrencyValueChange}
            search={this.state.search}
          />
          <CardList
            currencyTable={this.state.currencyTable}
            search={this.state.search}
            currencyselectedCode={this.state.currencyselectedCode}
            currencyValue={this.state.currencyValue}
            currencyCodeChange={this.handleCurrencyCodeChange}
            handleCurrencySelectedCodeChange={this.handleCurrencySelectedCodeChange}
            getChartData={this.handleChartData}
            chartData={this.state.chartData}
            USDValue={this.state.USDValue}
            selectedID={this.state.selectedID}
            handleSelectedID={this.handleSelectedID}
          />
        </div>

    );
  }
}

export default App;
