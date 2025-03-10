const inputCountry = document.getElementById("country-name");
const button = document.getElementById("btn1");
const countryInfo = document.getElementById("country-info");
let borders;

function CountryData(data, countryName){
    let info = [data[0].capital[0],data[0].population , data[0].region];
    let heading = ["Capital", "Population", "Region"]

    countryInfo.innerHTML = "";
    let list = document.createElement("ul");
    let listItem;
    
    for (const item of info){
        listItem = document.createElement('li');
        listItem.textContent = `${heading[info.indexOf(item)]}: ${item}`;
        list.appendChild(listItem);
    }

    listItem = document.createElement('li');
    listItem.textContent = "Flag: "
    let image = document.createElement("img");

    image.src = data[0].flags.png;
    image.alt = `The flag of ${countryName}`
    image.width = 100;
    image.height = 100;

    list.append(listItem);

    countryInfo.appendChild(list);
    countryInfo.appendChild(image);
}


function neighboursData(data){
    const name = data[0].name.common;

    const para = document.createElement("p");
    para.textContent = name;
    countryInfo.appendChild(para)

    let image = document.createElement("img");

    image.src = data[0].flags.png;
    image.alt = `The flag of ${name}`
    image.width = 100;
    image.height = 100;

    countryInfo.appendChild(image);
}


async function fetchData(){
    let countryName = inputCountry.value;
    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    try{
        const response = await fetch(url); // fetches information from the url provided
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        CountryData(json, countryName);
        borders = json[0].borders;

    }catch (error){
        console.error(error.message);
    }

    // For neighbours
    const para = document.createElement("p");
    para.textContent = "Neighbouring Countries: ";
    countryInfo.appendChild(para)

    for (const neighbor of borders){
        let url2 = `https://restcountries.com/v3.1/alpha/${neighbor}`;

        try{
            const response = await fetch(url2); // fetches information from the url provided
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
    
            const json2 = await response.json();
            neighboursData(json2);
        }catch (error){
            console.error(error.message);
        }
    }
}


button.addEventListener("click", fetchData);