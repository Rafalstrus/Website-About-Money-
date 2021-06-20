import React, { Component} from 'react';
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
      chartCode: '',
      chartData: [],  //data from one specific clicked currency
      USDValue: 0,    //number, will be define 
      isLoading: true, //loading screen displaying
      selectedID: ""
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

      this.setState({ currencyTable : currency })
      let goingThroughtJSONToGetUSD = this.state.currencyTable[1]
      this.setState({ USDValue: goingThroughtJSONToGetUSD.rates[1].mid },
        () => {
          setTimeout(
            () => { this.setState({ isLoading: false }) }
            , 1000)
        })

      // 40-41 another method to get USD value (this.state.currency[1]).rates[1].mid
    } catch (error) {
      console.log(error)
    }
  }
  //api from nbp have 3 tables, 2 are usefull in project
  getCurrencyFromTable(table) {
    return fetch(`http://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`)
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
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/?format=json`)
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
    this.setState({ chartCode: code }, () => { this.getChartDataFromTable(code, table) })
  }
  handleArrowClick = (e) => {
    //console.log(e.key)
    if(e.path[0].id !== "Search-Input"){
      if(this.state.selectedid !== ""){
        console.log("git")
      }
    }
  }
  handleSelectedID = (id) => {
    this.setState({selectedid: id}, ()=> {console.log(this.state.selectedid)})
  }

  render() {
    return (
      (this.state.isLoading) ?
        <LoadingScreen /> :
        <div className="App">
          {document.addEventListener('keydown', this.handleArrowClick)}
          <img src="favicon.svg" alt="" id="logo"></img>
          <span id='website-title'>How much do you have?</span>
          <div id="">
            <SearchBox
              currencyTable={this.state.currencyTable}
              searchChange={this.handleSearchChange}
              handleCurrencySelectedCodeChange={this.handleCurrencySelectedCodeChange}
              currencyValueChange={this.handleCurrencyValueChange}
              search={this.state.search}
            />
          </div>
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
            handleSelectedID ={this.handleSelectedID}
          />
        </div>

    );
  }
}

export default App;
