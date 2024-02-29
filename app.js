//server shit

const http = require("node:http");      // Node.js standard library for handling client/server server features
const fs = require('fs');

const solarSystemData = JSON.parse(fs.readFileSync('solar-system-data.json', 'utf8'));

const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";


const server = http.createServer((req, res) => {

    const requestUrl = new URL(serverUrl + req.url);
    const pathComponents = requestUrl.pathname.split("/");
    
    const planetName = pathComponents[2];

    console.log(planetName);


    if(req.method == "GET"){
        
        switch(pathComponents[1])
        {
            case "data":
                sendPlanetInfo(res, planetName);
                
                break;

            case "image":

                sendImage(res, planetName);                
                break;
            
            default:
                sendResponse(res, 400, "text/plain", "A HTTP POST method has been sent to the server, but no specific API endpoint could be determined.");
                break;
        }
    }
    else if (req.method == "OPTIONS"){

        sendResponse(res, 204, null, null);
    }
    else if (req.method == "POST"){

        sendResponse(res, 200, "text/plain", "Welcome to Ville's Server for lab 3");
    }
    
});

server.listen(port, hostname, () => {
    console.log("The server running and listening at\n" + serverUrl);
});

function sendResponse(res, statusCode, contentType, data){
    
    res.statusCode = statusCode;
    if (contentType != null) res.setHeader("Content-Type", contentType);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    
    if (data != null) res.end(data);     // data in HTTP message body
    else res.end();                      // empty HTTP message body
}

// functions me

function sendImage(res, planetName){

    const imageFilePath = "./"+ getPlanetByName(planetName).image_src;

    fs.readFile(imageFilePath, (err, data) => {
   
    if(err){
    console.log("Freaking errorrrr")

    res.statusCode = 404; 
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.end("An error occurred reading the file.");
    } else {
    
    res.statusCode = 200; 
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.end(data);
    }

    });
}

function sendPlanetInfo(res, planetName){

    let planetData = getPlanetByName(planetName);
    let stringPlanetData = JSON.stringify(planetData);
    console.log(stringPlanetData);

    sendResponse(res, 200, "application/json", stringPlanetData);
}

function sendSolarInfo(res){

    let planetData = solarSystemData;
    let stringPlanetData = JSON.stringify(planetData);

    sendResponse(res, 200, "application/json", stringPlanetData);

}

function getPlanetByName(planetName){

    if(planetName=="Sun"){
        return solarSystemData.star;
    } else if (planetName==""){
        return solarSystemData;
    }else {
        for (let i = 0; i < solarSystemData.planets.length; i++){
            if (planetName == solarSystemData.planets[i].name){
                return solarSystemData.planets[i];
            }
        }
    }
}

