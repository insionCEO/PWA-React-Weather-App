import React, { Component } from 'react';
import rAFTimeout from '../../helpers/rAFTimeout';
import './index.css';

class Forecast extends Component {
  animate() {
    rAFTimeout(() => this.forecast.classList.add('animate-in'), 100);

    rAFTimeout(() => this.title.classList.add('animate-in'), 200);

    rAFTimeout(() => this.icon.classList.add('animate-in'), 250);

    rAFTimeout(() => this.temperature.classList.add('animate-in'), 350);

    rAFTimeout(() => this.rain.classList.add('animate-in'), 400);
  }

  componentDidMount() {

    this.forecast = document.querySelector(`[data-id=${this.props.id}]`);
    this.title = this.forecast.querySelector('.forecast__title');
    this.icon = this.forecast.querySelector('.forecast__icon');
    this.temperature = this.forecast.querySelector('.forecast__temperature');
    this.rain = this.forecast.querySelector('.rain');

    rAFTimeout(() => this.animate(), this.props.animationDelay * 100);
  }

  render() {
    return (
      <div className="forecast" data-id={this.props.id}>
        <span className="forecast__title">{this.props.title}</span>
        <img className="forecast__icon" alt="icon" src={`svg/${this.props.icon}.svg`} />

        {this.props.children}
      </div>
    )
  }
}
export default Forecast;
