import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

/** Data importation. Would usually use an adapter to request data from the Node.js backend **/
const oceanSurface = require('../adapter/oceanSurface');
const oceanWind = require('../adapter/oceanWind');

/** Business Logic Functions **/
const BL = require('./graphingPageBL');

/** 
 * Jordan - 29/06/2021
 * --------------------
 * This provides our graphing functionality inside one screen. 
 * **/
class GraphingPage extends React.Component {

    constructor(props){
        super(props);
        this.handleSelectAChange = this.handleSelectAChange.bind(this);
        this.handleSelectBChange = this.handleSelectBChange.bind(this);
        this.state = {
            graphA: 'surface_sea_water_speed',
            graphB: 'sea_surface_wave_maximum_height'
        }
    }

    componentDidMount(){
        this.loadSurfaceData()
        .then(() => {
            this.loadWindData()
            .then(() => {
                var combinedData = BL.joinData(this.state.surfaceData, this.state.windData);
                this.setState({
                    combinedData: combinedData,
                });
                console.log(this.state.combinedData);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    /** State change fucntion(s) **/
    handleSelectAChange(event) {
        this.setState({graphA: event.target.value});
    }
    handleSelectBChange(event) {
        this.setState({graphB: event.target.value});
    }

    /** Load Data from Adapters.**/
    loadSurfaceData(){
        return new Promise((resolve, reject) => {
            oceanSurface.retrieveData('./data/data.csv')
            .then(csvData => {
                this.setState({
                    surfaceData: csvData,
                })
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    loadWindData(){
        return new Promise((resolve, reject) => {
            oceanWind.retrieveData('./data/data.json')
            .then(jsonData => {
                this.setState({
                    windData: jsonData,
                })
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    /** Two components, a form with submission to select the data set, and a lineChart to draw the dataset. **/
    render(){
        return (
            <div>
                    <label>
                    Pick the data set:
                    <select value={this.state.graphA} onChange={this.handleSelectAChange}>
                        <option value="sea_surface_wave_significant_height">Sea Surface Wave Significant Height</option>
                        <option value="air_temperature_at_2m_above_ground_level">Air Temperature at 2m above ground level</option>
                        <option value="wind_from_direction_at_10m_above_ground_level">Wind from Direction at 10m above ground level</option>
                        <option value="wind_speed_at_10m_above_ground_level">Wind Speed at 10m above ground level</option>
                        <option value="sea_surface_wave_from_direction_at_variance_spectral_density_maximum">Sea Surface Wave from Direction at variance spectral density max</option>
                        <option value="surface_sea_water_speed">Surface Sea Water Speed</option>
                        <option value="sea_surface_wave_maximum_height">Sea Surface Wave Maximium Height</option>
                    </select>
                    <select value={this.state.graphB} onChange={this.handleSelectBChange}>
                        <option value="sea_surface_wave_significant_height">Sea Surface Wave Significant Height</option>
                        <option value="air_temperature_at_2m_above_ground_level">Air Temperature at 2m above ground level</option>
                        <option value="wind_from_direction_at_10m_above_ground_level">Wind from Direction at 10m above ground level</option>
                        <option value="wind_speed_at_10m_above_ground_level">Wind Speed at 10m above ground level</option>
                        <option value="sea_surface_wave_from_direction_at_variance_spectral_density_maximum">Sea Surface Wave from Direction at variance spectral density max</option>
                        <option value="surface_sea_water_speed">Surface Sea Water Speed</option>
                        <option value="sea_surface_wave_maximum_height">Sea Surface Wave Maximium Height</option>
                    </select>
                    </label>
                <LineChart width={1500} height={800} data={this.state.combinedData} margin={{ top: 10, right: 30, left: 0, bottom: 0, }} >
                        <CartesianGrid strokeDasharray="4" />
                        <XAxis dataKey="datetime" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Legend />
                        <Tooltip />
                        <Line type="monotone" dataKey={this.state.graphA} yAxisId="left" stroke="#8884d8" fill="#8884d8" />
                        <Line type="monotone" dataKey={this.state.graphB} yAxisId="right"stroke="#82ca9d" fill="#82ca9d" />
                </LineChart>
            </div>
        );
    }
} export default GraphingPage;