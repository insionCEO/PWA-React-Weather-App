import React, { Component } from 'react';
import './index.scss';
import IpFetcher from '../helpers/ipfetcher';
import IpGeoLocation from '../api/ipGeoLocation';
import ForeCastAPI from '../api/foreCastAPI';
import initialState from '../initialState';
import Home from './Home';
import Loader from '../components/Loader';
import rAFTimeout from '../helpers/rAFTimeout';
import timeConvert from '../helpers/time';
import icons from '../helpers/icons';
import weekdays from '../helpers/weekdays';


class App extends Component {
  constructor() {
    super();

    this.ipFetcher = new IpFetcher();
    this.ipGeoLocation = new IpGeoLocation();
    this.foreCastAPI = new ForeCastAPI();

    this.state = { ...initialState };

    this.loader = React.createRef();
  }

  async init() {
    rAFTimeout(() => this.loader.current.animateIn(), 100);

    await this.ipFetcher.fetch();
    await this.ipGeoLocation.fetch(this.ipFetcher.ip);
    await this.foreCastAPI.fetch(this.ipGeoLocation.data.latitude, this.ipGeoLocation.data.longitude);

    setTimeout(() => {
      this.loader.current.animateOut();

      setTimeout(() => {
        this.setState({ dataLoaded: true });
        this.setState({
          currentCondition: {
            ...initialState, location: this.ipGeoLocation.data.city,
            temperature: Math.round(this.foreCastAPI.data.currently.temperature),
            weather: this.foreCastAPI.data.currently.summary
          },
          foreCastHourly: this.foreCastAPI.data.hourly.data.map((item) => {
            return {
              time: timeConvert(item.time).hours,
              rainProbability: item.precipProbability,
              temperature: Math.round(item.temperature),
              icon: icons[item.icon].id
            }
          }).slice(1, 6),
          foreCastDaily: this.foreCastAPI.data.daily.data.map((item) => {
            return {
              weekDay: weekdays(timeConvert(item.time).weekDay),
              rainProbability: item.precipProbability,
              icon: icons[item.icon].id,
              temperature: {
                max: Math.round(item.temperatureMax),
                min: Math.round(item.temperatureMin)
              }
            }
          }).slice(1, 6)
        });
      }, 400);
    }, 1000);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.dataLoaded ? <Loader ref={this.loader} /> : <Home currentCondition={this.state.currentCondition}
            foreCastDaily={this.state.foreCastDaily} foreCastHourly={this.state.foreCastHourly} />
        }
      </div>
    );
  }
}

export default App;
