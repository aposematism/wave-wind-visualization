 const Papa = require("papaparse");

/** 
 * Jordan - 28/06/2021
 * ---------------------
 * This component should parse the data using D3. It should be exported for use in the graphing page.
 * 
 * **/
exports.retrieveData = function(fileLocation){
    return new Promise((resolve) => {
        Papa.parse(fileLocation, {
            header: true,
            download: true,
            skipEmptyLines: true,
            // Here this is also available. So we can call our custom class method
            complete: function(results) {
                resolve(results.data);
            }
        });
    });
}