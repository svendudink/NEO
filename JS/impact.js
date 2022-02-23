let checkDate = "2017-09-01";
let newData;
let headerArr = ["name", "size", "danger of impact"];
let table = document.getElementById("neosys");
let passDate = document.getElementById("passDate");
let pass2ndDate = document.getElementById("pass2ndDate");
let myButton = document.getElementById("myButton");


let sizes = [0.02, 0.2, 0.5, 1];

let myData;


function fetchTable(checkDate) {
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${checkDate}&end_date=${checkDate}&api_key=eZWLnvz8rAbp3xeYop7KW9dIOtj1Btg3rAuTBgb4`
  )
    .then((response) => response.json())
    .then((data) => (myData = data))
    .then(function () {
      createTables(table, headerArr, myData.near_earth_objects[checkDate]);
      console.log(myData.near_earth_objects[checkDate]);
      console.log(checkDate);
    });
}
//call fetchTable
fetchTable(checkDate);

// show more and show less button
myButton.addEventListener("click", lessListen);
function lessListen() {
  console.log(myButton.innerText);
  if (myButton.innerText === "show more") {
    myButton.innerText = "show less";
    table.style.visibility = "";
    filterData();
  } else {
    myButton.innerText = "show more";
    table.style.visibility = "hidden";
    table.innerHTML = ""
    
    
  }
}
//end of show more and show less button

//check if impact box is selected

let earthImpact = document.getElementById("earthImpact");

earthImpact.addEventListener("click", listen);
function listen() {
  filterData();
}
//end of check if impact box is selected

//check if magnitude box is selected

let magnitude = document.getElementById("magnitude");

magnitude.addEventListener("click", magListen);
function magListen() {
  filterData();
}
//end of check if magnitude box is selected

//check if magnitude box is selected

let sentry = document.getElementById("sentry");

sentry.addEventListener("click", sentryListen);
function sentryListen() {
  filterData();
}
//end of check if magnitude box is selected

// dropdown menu NEO size

let dropDown = document.getElementById("disaster");

dropDown.addEventListener("change", listening);
function listening() {
  console.log(dropDown.value);

  filterData();
  
}
//end of dropdown menu neo size

//Filter data

function filterData() {
  newData = myData.near_earth_objects[checkDate].filter(function (js) {
    return (
      (dropDown.value == 4 || checkSize(js) == dropDown.value) &&
      (earthImpact.checked == false ||
        js.is_potentially_hazardous_asteroid == earthImpact.checked) &&
      (magnitude.checked == false || js.absolute_magnitude_h < 20) &&
      (sentry.checked == false || js.is_sentry_object == sentry.checked)
    );
  });
  rebuildtables(newData);
}

//end of filter data

//reset tables and put new tables
function rebuildtables(newData) {
  table.innerHTML = "";
  createTables(table, headerArr, newData);
}

// end of reset tables and put new tables

// create tables
function createTables(table, headerArr, data) {
  for (let h = 0; h < data.length; h++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    tr.insertAdjacentHTML("afterbegin", `<th scope="row">${h + 1}</th>`);

    for (let i = 0; i < 4; i++) {
      let yesNo
      if (data[h].is_potentially_hazardous_asteroid == true) {yesNo = 'Yes'}else {yesNo = 'No'}
      let neoArr = [
        data[h].name,
        data[h].estimated_diameter.kilometers.estimated_diameter_max,
        yesNo,
        data[h].absolute_magnitude_h,
        
      ];
      let td = document.createElement("td");
      tr.appendChild(td);
      td.appendChild(document.createTextNode(neoArr[i]));
    }
  }
}

// end of create new tables

// set search time
passDate.addEventListener("change", dateListen);

function dateListen() {
  table.innerHTML = "";
  fetchTable(passDate.value);
  checkDate = passDate.value;
}

//end of set search time

//check neo size

function checkSize(newData) {
  let c = newData.estimated_diameter.kilometers.estimated_diameter_max;

  if (c <= sizes[0]) return 0;
  if (c >= sizes[0] && c <= sizes[1]) return 1;
  if (c >= sizes[1] && c <= sizes[2]) return 2;
  return 3;
}

//end of check NEO size
