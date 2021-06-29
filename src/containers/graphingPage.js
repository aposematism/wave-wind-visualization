import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

/** Data importation. Would usually use an adapter to request data from the Node.js backend **/
const oceanSurface = require('../adapter/oceanSurface');
const oceanWind = require('../adapter/oceanWind');

/** Business Logic Functions **/
const BL = require('./graphingPageBL');

/** 
 * Jordan - 28/06/2021
 * --------------------
 * This provides our graphing functionality inside one screen. 
 * **/
class GraphingPage extends React.Component {

    constructor(props){
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {
            graphState: 'surface_sea_water_speed'
        }
    }

    handleSelectChange(event) {
        this.setState({graphState: event.target.value});
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
                <form onSubmit={this.handleSelectChange}>
                    <label>
                    Pick the data set:
                    <select value={this.state.graphState} onChange={this.handleSelectChange}>
                        <option value="sea_surface_wave_significant_height">Sea Surface Wave Significant Height</option>
                        <option value="air_temperature_at_2m_above_ground_level">Air Temperature at 2m above ground level</option>
                        <option value="wind_from_direction_at_10m_above_ground_level">Wind from Direction at 10m above ground level</option>
                        <option value="wind_speed_at_10m_above_ground_level">Wind Speed at 10m above ground level</option>
                        <option value="sea_surface_wave_from_direction_at_variance_spectral_density_maximum">Sea Surface Wave from Direction at variance spectral density max</option>
                        <option value="surface_sea_water_speed">Surface Sea Water Speed</option>
                        <option value="sea_surface_wave_maximum_height">Sea Surface Wave Maximium Height</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <LineChart width={1500} height={800} data={this.state.combinedData} margin={{ top: 10, right: 30, left: 0, bottom: 0, }} >
                        <CartesianGrid strokeDasharray="4" />
                        <XAxis dataKey="datetime" />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <Line type="monotone" dataKey={this.state.graphState} stroke="#8F84d8" fill="#8884d8" />
                </LineChart>
            </div>
        );
    }
} export default GraphingPage;