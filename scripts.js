// BIG wah wah


document.addEventListener("DOMContentLoaded", function(){
    console.log("HTML DOM tree loaded, and ready for manipulation.");
     // === YOUR FUNCTION CALL TO INITIATE THE GENERATION OF YOUR WEB PAGE SHOULD GO HERE ===
    const body = mainMenu();
    //getImageFromServer("Earth");
    //getPlanetFromServer("Earth");
    document.body.appendChild(body);
    document.body.style.backgroundImage = "url('media/starbackground.jpg')";

});

const serverUrl = "http://127.0.0.1:3000";
const clientUrl = "file://ad.liu.se/home/vilgu036/Desktop/TNM115/lab03_part3/code/website.html";
//let thePlanet = document.createElement("article");
let theImage = document.createElement("img");

//// code for starting page and sending server requeswts through buttons //// 


function mainMenu(){

    const mainMenu  = document.createElement("article");
    mainMenu.style.marginLeft = "10%";
    
    const header1 = document.createElement("h2");
    header1.innerHTML = "data";

    header1.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
    header1.style.fontVariant = "small-caps"
    header1.style.color = "white"
    header1.style.fontSize="xx-large"

    const header2 = document.createElement("h2");
    header2.innerHTML = "Image";

    header2.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
    header2.style.fontVariant = "small-caps"
    header2.style.color = "white"
    header2.style.fontSize="xx-large"

    mainMenu.appendChild(header1);
    const allButtons = document.createElement("article");

    // for loop for data buttons
    // HEEERE
    for (let i = 0; i < 10; i++){
       let daButton = theButtons(i, "data");
       allButtons.appendChild(daButton);
    }

    mainMenu.appendChild(allButtons);
    mainMenu.appendChild(header2);

    const theseButtons = document.createElement("article");
    //for loop for image buttons
    // HEEERE
    
    for (let i = 1; i < 10; i++){
       let daButton = theButtons(i, "image");
       theseButtons.appendChild(daButton);
    } 

    mainMenu.appendChild(theseButtons);

    return mainMenu;    
}

function theButtons(i, decider){
      
    const theButton = document.createElement("button");

    switch (i){
        case 0: theButton.innerText = "Solar System";

        break;
        case 1: theButton.innerText = "Sun";

        break;
        case 2: theButton.innerText = "Mercury";

        break;
        case 3: theButton.innerText = "Venus";

        break;
        case 4: theButton.innerText = "Earth";

        break;
        case 5: theButton.innerText = "Mars";

        break;
        case 6: theButton.innerText = "Jupiter";

        break;
        case 7: theButton.innerText = "Saturn";

        break;
        case 8: theButton.innerText = "Uranus";

        break;
        case 9: theButton.innerText = "Neptune";

        break;
        default : theButton.innerText = "Wahadafack";
    }

    if (decider == "data"){
        theButton.onclick = function() {
            texts = theButton.innerHTML;
            
            if(texts == "Solar System"){
                clearBody()
                document.body.appendChild(mainMenu())
                getPlanetFromServer("Sun"); 
                getPlanetFromServer("Mercury");
                getPlanetFromServer("Venus"); 
                getPlanetFromServer("Earth");
                getPlanetFromServer("Mars"); 
                getPlanetFromServer("Jupiter");
                getPlanetFromServer("Saturn"); 
                getPlanetFromServer("Uranus");
                getPlanetFromServer("Neptune"); 
            }
            else{ 
                clearBody()
                document.body.appendChild(mainMenu())
                getPlanetFromServer(texts); 
            }
            
            
            }
    } else if(decider == "image"){
        theButton.onclick = function() {
            clearBody()
            texts = theButton.innerHTML;
            createImage(texts);

            }
    } else {
        console.log("Decider undefined or incorrect");
    }
    
    //  window.location.href = clientUrl + "/data/" + entityname;

    return theButton;
    
}

async function getPlanetFromServer(entityName){

    try {
        const response = await fetch(serverUrl + "/data/" + entityName, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: null
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            response.json().then((jsonBody) =>{

                const thePlanet = jsonBody;
                createPlanet(thePlanet);
                
            });
        }

    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}

async function getImageFromServer(entityName, divTag){
// descnimg is divTag
    try {
        const response = await fetch(serverUrl + "/image/" + entityName, {
            method: "GET",
            headers: {
                "Content-Type": "image/png",
            },
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            response.blob().then((blobBody) => {
                
                console.log(blobBody);

                const filePath = URL.createObjectURL(blobBody);
                console.log(filePath)
                const img = document.createElement("img");

                img.width = 500;

                img.alt = entityName;

                divTag.appendChild(img);
                img.src = filePath;
                
                console.log(divTag);

            });
        }

    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}
//// Code for creation of elements ////
function clearBody(){
    document.body.innerHTML = "";
}

function createImage(planetName){

    const img = document.createElement("div");
    getImageFromServer(planetName, img); //ezpz: Tar in div:en som divTag
    img.style.marginLeft = "10%";

    document.body.appendChild(mainMenu());
    document.body.appendChild(img);

    document.body.style.backgroundImage = "url('media/starbackground.jpg')";

}

function createPlanet(thePlanet){

    const planet = document.createElement("article");
    const descnimg = document.createElement("div");
    
    planet.style.margin="10px";
    planet.style.marginLeft="10%";
    planet.style.marginRight="10%"; 
    
    planet.style.backgroundColor="rgb(50, 0, 150, 0.5)"
    planet.style.padding="10px"
    planet.style.border = "5px solid #8c70cf"
    planet.style.borderRadius = "25px"

    const title = document.createElement("h2");
    title.innerHTML = thePlanet.name; 

    title.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
    title.style.fontVariant = "small-caps"
    title.style.color = "White"
    title.style.fontSize="xx-large"

    const desc = addDescription(thePlanet.description);
    const img = document.createElement("div");
    const list = addList(thePlanet);

    getImageFromServer(thePlanet.name, img); //ezpz: Tar in div:en som divTag

    descnimg.appendChild(desc);
    descnimg.appendChild(img);

    planet.appendChild(title);
    planet.appendChild(descnimg);
    planet.appendChild(list);

    console.log("we are in cea")
    
    //document.body.appendChild(mainMenu());
    document.body.appendChild(planet);
    document.body.style.backgroundImage = "url('media/starbackground.jpg')";

}

function addDescription(parameter){
    const descriptionelement = document.createElement("div");
    
    const desc = document.createElement("p");
    desc.innerHTML = parameter; 
    desc.style.color ="White"
    desc.style.fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"

    descriptionelement.appendChild(desc);
    return descriptionelement;
}

function addImage(imageeee, planetName){
    const divelement = document.createElement("div");
     
    /// FIND AND MAKE IMAGE INTO IMAGELEMENT
    const imagelement = document.createElement("img");
    imagelement.src = imageeee;

    //styles n shit
    imagelement.width = "500px";
    imagelement.marginRight="0px";
    imagelement.marginLeft="0px";
    imagelement.borderRadius = "25px"

    imagelement.alt = planetName;

    divelement.appendChild(imagelement);

    // TESTING 
    // console.log(divelement);
    // document.body.appendChild(divelement);
    return divelement;

}

function addList(planetData){

    const addList = document.createElement("div");
    const theList = document.createElement("ul");
    addList.style.fontFamily ="Georgia, 'Times New Roman', Times, serif";
    addList.style.fontStyle ="oblique";

    if(planetData.name == "Sun"){
        for (let j = 1; j < 3; j++){
            const item = document.createElement("li");
    
            switch (j){
                case 1: {
                    item.innerHTML = "name : "+ planetData.name;
                    break;
                }
                case 2: {
                    const neighbor = document.createElement("li");
                    n1 = findNeighbor(planetData.neighbors[0]); 

                    neighbor.innerHTML = "neighbor: " + n1;
                    item.appendChild(neighbor);
                    break;
                }
            }
            
            theList.appendChild(item);
        }
        addList.appendChild(theList);
        addList.style.color = "white";
        return addList;

    } else {
        for (let j = 1; j < 5; j++){

            const item = document.createElement("li");
    
            switch (j){
                case 1: {
                    item.innerHTML = "name : "+ planetData.name;
                    break;
                }
                case 2: {
                    let x = planetData.time_day;
                    if (x>= 1) {item.innerHTML = "time day : "+ planetData.time_day; }
                    else { item.innerHTML = "time day : "+ ( planetData.time_day * 24 ) + " hours"; }
                    break;
                }
                case 3: {
                    item.innerHTML = "time year : "+ planetData.time_year;
                    break;
                }
                case 4: {
                    
                    const neighbor = document.createElement("li");
    
                    n1 = findNeighbor(planetData.neighbors[0]); 
                    neighbor.innerHTML = "neighbor(s): " +  n1;
    
                    if (planetData.neighbors.length==2){
                        
                        n2 = findNeighbor(planetData.neighbors[1]);
                        neighbor.innerHTML += ", "+ n2;
                    }
                    item.appendChild(neighbor);
                    break;
                }
            }
            theList.appendChild(item); 
        }
    }

    if(typeof(planetData.moons)=="number"){
        let moon = document.createElement("li");
        moon.innerHTML = "number of moons: " + planetData.moons;
        theList.appendChild(moon);
    } 
    else if (planetData.moons != null){
        let moons = document.createElement("li");
        moons.innerHTML = ("moon(s): ");
        for (let j = 0; j <= planetData.moons.length-1; j++){
            moons.innerHTML += planetData.moons[j] + ", ";
        }
        theList.appendChild(moons);
    }

    addList.style.color = "white";
    addList.appendChild(theList);
    return addList; 
}

// helping functions 

function findNeighbor(idTag){

    switch (idTag){
        case "s1":
            return "Sun";
        case "p1":
            return "Mercury";
        case "p2":
            return "Venus";
        case "p3":
            return "Earth";
        case "p4":
            return "Mars";
        case "p5":
            return "Jupiter";
        case "p6":
            return "Saturn";
        case "p7":
            return "Uranus";
        case "p8":
            return "Neptune";
    }
}

