
console.log("Js file working");
var newloc="x"
let a = document.getElementById("btn");
a.addEventListener("click", () => {
    var newloc = document.querySelector("#change").value
    console.log(newloc)
    gettemp(newloc);
})

function getloc(newloc) {
    if(newloc){
    return `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${newloc}&days=3`
    }
    else{
        return `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${"New Delhi"}&days=3`
    }
}

async function gettemp(newloc) {
    let location = getloc(newloc);
    let x = await fetch(location, {
        headers: {
            'X-RapidAPI-Key': 'dee54dacf5msh86d25b8a02efa83p142929jsn5cdc83ca8500',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }

    });

    var data = await x.json();
    console.log(data);
    changeDetails(data);
}
function days(n=0) {
    
    var today = new Date();

    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    var dayOfWeek = today.getDay();

    // Define an array with the names of the days of the week
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the name of the day using the day of the week
    return daysOfWeek[(dayOfWeek+n)%7];

}

const changeDetails = (data) => {
    document.querySelector(".day").innerHTML = `${days()}`;
    document.querySelector(".date").innerHTML = `${data.forecast.forecastday[0].date}`

    document.querySelector(".image").innerHTML = `<img id="weat" src="https:${data.current.condition.icon}" alt="img">`
    document.querySelector(".cond").innerHTML = `${data.current.condition.text}`
    document.querySelector(".temp").innerHTML = `${data.current.temp_c}° C`
    document.querySelector("#loc").innerHTML = `${data.location.name}, ${data.location.region}`
    document.querySelector("#feels").innerHTML = `${data.current.feelslike_c}° C`
    document.querySelector("#hum").innerHTML = `${data.current.humidity}%`
    console.log("https:", data.current.condition)
changcards(data);
}
gettemp();
function changcards(data){
    let card=document.getElementsByClassName("cards");
for(let i=0;i<3;i++){
   
    card[i].querySelector(".date1").innerHTML=`${days(i)}`
    card[i].querySelector(".imag1").innerHTML=`<img class="imag1data" src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="">`
    card[i].querySelector(".txt").innerHTML=`${data.forecast.forecastday[i].day.condition.text}`
    card[i].querySelector(".tmp1").innerHTML=`${data.forecast.forecastday[i].day.avgtemp_c}° C`
    
}
}
