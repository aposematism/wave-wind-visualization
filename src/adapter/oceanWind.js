/** 
 * Jordan - 28/06/2021
 * ---------------------
 * This component should parse the data then export it.
 * 
 * **/
exports.retrieveData = function(fileLocation){
    return new Promise((resolve, reject) => {
        fetch(fileLocation)
        .then(res => res.json())
            .then((data) => { 
                resolve(data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
        });
}