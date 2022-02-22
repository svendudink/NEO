let checkDate = "2017-09-01";
let defaulthead = `<tr>
<th>Name of Asteroid</th>
<th>Size</th>
<th>Potential to hit earth</th>
</tr>`;
let newData;

let headerArr = ["name", "size", "danger of impact"];
let table = document.getElementById("neosys");
let passDate = document.getElementById("passDate");

console.log(passDate.value);

let sizes = [0.02, 0.2, 0.5, 1];
console.log(sizes[0]);
let myButton = document.getElementById("myButton");
let myData;

let f1Switch = "";
let f2Switch = "";

function fetchTable(checkDate) {
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${checkDate}&end_date=${checkDate}&api_key=eZWLnvz8rAbp3xeYop7KW9dIOtj1Btg3rAuTBgb4`
  )
    .then((response) => response.json())
    .then((data) => (myData = data))
    .then(function () {
      createTables(table, headerArr, myData.near_earth_objects[checkDate]);
      newData = myData.near_earth_objects[checkDate];
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
  } else {
    myButton.innerText = "show more";
    table.style.visibility = "hidden";
  }
}
//end of show more and show less button

// dropdown menu NEO size

let dropDown = document.getElementById("disaster");

dropDown.addEventListener("change", listening);
function listening() {
  console.log(dropDown.value);

  filterData("dropDown.value == 4", "checkSize(js)", "dropDown.value");
  rebuildtables(newData);
}
//end of dropdown menu neo size

// set search time
passDate.addEventListener("change", dateListen);

function dateListen() {
  table.innerHTML = defaulthead;
  fetchTable(passDate.value);
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

//check if box is selected

let earthImpact = document.getElementById("earthImpact");

earthImpact.addEventListener("click", listen);
function listen() {
  filterData(
    "earthImpact.checked",
    "js.is_potentially_hazardous_asteroid",
    "earthImpact.checked"
  );
}
//end of check if box is selected

//Filter data

function filterData(skipFilter, compare1, compare2) {
  newData2 = newData.filter(function (js) {
    console.log(js);
    console.log(eval(skipFilter));
    if (eval(skipFilter) == false) {
      return (
        js.is_potentially_hazardous_asteroid ==
        js.is_potentially_hazardous_asteroid
      );
    } else return eval(compare1) == eval(compare2);
  });
  newData = newData2;
  rebuildtables(newData);
}

//end of filter data

//reset tables and put new tables
function rebuildtables(newData) {
  table.innerHTML = defaulthead;
  createTables(table, headerArr, newData);
}

// end of reset tables and put new tables

// create tables
function createTables(table, headerArr, data) {
  for (let h = 0; h < data.length; h++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);

    for (let i = 0; i < headerArr.length; i++) {
      let neoArr = [
        data[h].name,
        data[h].estimated_diameter.kilometers.estimated_diameter_max,
        data[h].is_potentially_hazardous_asteroid,
      ];
      let td = document.createElement("td");
      tr.appendChild(td);
      td.appendChild(document.createTextNode(neoArr[i]));
    }
  }
}

// end of create new tables
