import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],
      search: 0,
      currencyCode: 'PLN',
      currencyValue: 1,
      chartDays: 3,
      chartCode: '',
      chartData: []
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
      };
      const currencyA = await this.getCurrencyFromTable('A');
      const currencyB = await this.getCurrencyFromTable('B');
      const currency = [currencyPLN, ...currencyA, ...currencyB];

      this.setState({ currency })
    } catch (error) {
      console.log(error)
    }
  }

  getCurrencyFromTable(table) {
    return fetch(`http://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`)
      .then((response) => response.json())
  }
  getChartDataFromTable = async (code, table) => {
    const today = new Date()
    const endDay = new Date(today)
    endDay.setDate(endDay.getDate() - this.state.chartDays)
    try {
      const chartData = await this.getCurrencyFromDay(code, table, endDay, today)
      this.setState({ chartData })
    } catch (error) {
      console.log(error)
    }
  }
  async getCurrencyFromDay(code, table) {
    if(code === 'PLN'){
      code = "USD"
      table ='A'
    }
    var end = new Date();
    var start = new Date(new Date().setDate(end.getDate()-30))
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
    this.setState({ chartCode: code }, () => {this.getChartDataFromTable(code, table)})
  }
  render() {
    return (
      <div className="App">
        <h1 id='website-title'>How much do you have?</h1>
        <div id="">
          <SearchBox
            currency={this.state.currency}
            searchChange={this.handleSearchChange}
            currencyCodeChange={this.handleCurrencyCodeChange}
            currencyValueChange={this.handleCurrencyValueChange}
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
          chartData = {this.state.chartData}
        />
      </div>
    );
  }
}

export default App;
