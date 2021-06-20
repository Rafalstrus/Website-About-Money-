import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import { LoadingScreen } from './components/loading-screen/loading-screen.component';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],   //table with all information about currencies
      search: "",     //text from search-box component
      currencyCode: 'PLN',
      currencyValue: 1,
      chartDays: 30,  //from how many days chart get data
      chartCode: '',
      chartData: [],  //data from one specific clicked currency
      USDValue: 0,    //number, will be define 
      isLoading: true //loading screen displaying
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

      this.setState({ currency })
      let goingThroughtJSONToGetUSD = this.state.currency[1]
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

  handleCurrencyCodeChange = code => {
    this.setState({ currencyCode: code })
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


  render() {
    return (
      (this.state.isLoading) ?
        <LoadingScreen /> :
        <div className="App">
          <img src="favicon.svg" alt="" id="logo"></img>
          <span id='website-title'>How much do you have?</span>
          <div id="">
            <SearchBox
              currency={this.state.currency}
              searchChange={this.handleSearchChange}
              currencyCodeChange={this.handleCurrencyCodeChange}
              currencyValueChange={this.handleCurrencyValueChange}
              search={this.state.search}
            />
          </div>
          <CardList
            currency={this.state.currency}
            search={this.state.search}
            code={this.state.currencyCode}
            currencyValue={this.state.currencyValue}
            currencyCodeChange={this.handleCurrencyCodeChange}
            currencyValueChange={this.handleCurrencyValueChange}
            getChartData={this.handleChartData}
            chartData={this.state.chartData}
            USDValue={this.state.USDValue}
          />
        </div>

    );
  }
}

export default App;
