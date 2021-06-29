
/** 
 * Jordan - 29/06/2021
 * -------------------
 * This page contains the business logic for processing the two data formats, to join it together on the date time and to return it in an appropriate format.
 * **/

exports.joinData = function(surfaceData, windData){
    var container = {};
    var finalContainer = [];
    Object.keys(windData).map((datetime) => {//We loop over the json data by time. We are essentially adding empty key values to clean the data.
        //container[datetime] = [];
        var cleanedData = {
            "datetime": datetime,
            "sea_surface_wave_from_direction_at_variance_spectral_density_maximum": windData[datetime].sea_surface_wave_from_direction_at_variance_spectral_density_maximum,
            "sea_surface_wave_maximum_height": windData[datetime].sea_surface_wave_maximum_height,
            "surface_sea_water_speed": windData[datetime].surface_sea_water_speed
        }
        container[datetime] = cleanedData;
    });
    for(var i = 0; i < surfaceData.length; i++){
        if(container[surfaceData[i].datetime] == null){
            var cleanedData = {
                "datetime": surfaceData[i].datetime,
                "sea_surface_wave_significant_height": surfaceData[i].sea_surface_wave_significant_height,
                "air_temperature_at_2m_above_ground_level": surfaceData[i].air_temperature_at_2m_above_ground_level,
                "wind_from_direction_at_10m_above_ground_level": surfaceData[i].wind_from_direction_at_10m_above_ground_level,
                "wind_speed_at_10m_above_ground_level": surfaceData[i].wind_speed_at_10m_above_ground_level
            }
            container[surfaceData[i].datetime] = cleanedData;
        }
        else{
            container[surfaceData[i].datetime].sea_surface_wave_significant_height = surfaceData[i].sea_surface_wave_significant_height;
            container[surfaceData[i].datetime].air_temperature_at_2m_above_ground_level = surfaceData[i].air_temperature_at_2m_above_ground_level;
            container[surfaceData[i].datetime].wind_from_direction_at_10m_above_ground_level = surfaceData[i].wind_from_direction_at_10m_above_ground_level;
            container[surfaceData[i].datetime].wind_speed_at_10m_above_ground_level = surfaceData[i].wind_speed_at_10m_above_ground_level;
        }
    }
    Object.keys(container).map((datetime) => {
        finalContainer.push(container[datetime]);
    });
    finalContainer.sort((a,b) => new Date(a.datetime) > new Date(b.datetime) ? 1 : -1);
    return finalContainer;
}