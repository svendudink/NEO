// Basic paramters
let today = new Date()
let date = today.getFullYear() + '-'
+ ('0' + (today.getMonth()+1)).slice(-2) + '-'
+ ('0' + today.getDate()).slice(-2)
console.log(date);
let myData

let loading = document.getElementById('load')
let bigBoy
// end of basic parameters

// get picture

let myPicture;
fetch(
  `https://api.nasa.gov/planetary/apod?date=${date}&api_key=fSbbDE0VBdxtcHr73CbGEsjWRoa1uPWb9X6zPHZf`
)
  .then((response) => response.json())
  .then((data) => (myPicture = data))
  .then(function () {
    let picbox = document.getElementById("picbox");
    let img = document.createElement("img");
    img.src = `${myPicture.url}`;
    let src = document.getElementById("picbox");
    src.appendChild(img);
   

    // end of get picture


    // get biggest neo passing by
  });
  function fetchTable(checkDate) {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${checkDate}&end_date=${checkDate}&api_key=eZWLnvz8rAbp3xeYop7KW9dIOtj1Btg3rAuTBgb4`
    )
      .then((response) => response.json())
      .then((data) => (myData = data))
      .then(function () {
        console.log(myData.near_earth_objects[checkDate]);
        console.log(typeof checkDate);
        bigBoy = biggest(myData.near_earth_objects[checkDate])
        console.log(bigBoy);
        printNeo()
      });

  }
fetchTable(date)
  // end of get biggest neo of the day


//Reduce to biggest NEO
function biggest(items) {
let maxArray = items.reduce((accumulator, currentvalue) => {
  if (accumulator.estimated_diameter.kilometers.estimated_diameter_max < currentvalue.estimated_diameter.kilometers.estimated_diameter_max) accumulator = currentvalue
  
  return accumulator
}
)

return maxArray
}


//end of reduce to biggest NEO


//Print the biggest NEO
function printNeo() {

  loading.insertAdjacentHTML("afterbegin", `The Biggest Neo making a close pass today is: ${bigBoy.name} with a maximum estimated diameter of: ${Math.round(bigBoy.estimated_diameter.kilometers.estimated_diameter_max *100)/100} KM`)
  console.log(loading);

}



