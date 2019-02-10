import React, { Component } from 'react'
import moment from 'moment'

export default class City extends Component {

    state = {
        friday: [],
        saturday: [],
        sunday: []
    }

    componentDidMount = async () => {
        const forecast = await this.getForecastForCity(this.props.location[0])
        await this.setState({ ...forecast })
    }

    getDay = (forecast, daysAhead) => {
        const dayOfMonth = parseInt(new Date().getDate())
        const day = forecast.list.filter(hourly => {
            return moment(hourly.dt * 1000).isSame(moment(new Date()).add(daysAhead, 'days'), 'day')
        })
        return day
    }

    getForecastForCity = async (city) => {
        const owmAPI = process.env.REACT_APP_OWM_API_KEY
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city.replace(/' '/ % 20)},us&appid=${owmAPI}`).then(response => response.json()).catch(data => console.log(data))
        const friday = this.getDay(forecast, 1)
        const saturday = this.getDay(forecast, 2)
        const sunday = this.getDay(forecast, 3)
        return { friday, saturday, sunday }
    }

    tempToF = (kTemp) => {
        const cTemp = kTemp - 273.15
        const fTemp = cTemp * (9 / 5) + 32
        return fTemp.toFixed(0)
    }

    dayForecast = (day) => {
        return this.state[day].map((hour, i) => {
            return (<tr key={i}>
                <td>{`${moment(hour.dt * 1000).format('LT')}`}</td>
                <td>{`${this.tempToF(hour.main.temp)}°F`}</td>
                <td>{`${hour.weather[0].description}`}
                <img className='right' src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} /></td>
            </tr>)
        })
    }

    render() {
        return (
            <div className='col s12 l4 m4'>
                <div className="card blue-grey lighten-5">
                    <div className="card-content">
                        <span className="card-title"><h4>Forecast for {this.props.location[0]}</h4></span>
                        <h5>Near {this.props.location[1]}</h5>
                        <div className='divider'></div>
                        <h5>Friday</h5>
                        <table>
                            <thead>
                                <tr>
                                <th>Time</th>
                                <th>Temp</th>
                                <th>Weather</th>
                                </tr>
                            </thead>
                            {this.dayForecast('friday')}
                        </table>
                        <div className='divider'></div>
                        <h5>Saturday</h5>
                        <table>
                            <thead>
                                <tr>
                                <th>Time</th>
                                <th>Temp</th>
                                <th>Weather</th>
                                </tr>
                            </thead>
                            {this.dayForecast('saturday')}
                        </table>
                        <div className='divider'></div>
                        <h5>Sunday</h5>
                        <table>
                            <thead>
                                <tr>
                                <th>Time</th>
                                <th>Temp</th>
                                <th>Weather</th>
                                </tr>
                            </thead>
                            {this.dayForecast('sunday')}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
