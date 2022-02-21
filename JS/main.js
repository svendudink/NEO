let myData;
fetch(
  `https://api.nasa.gov/planetary/apod?date=2022-02-11&api_key=fSbbDE0VBdxtcHr73CbGEsjWRoa1uPWb9X6zPHZf`
)
  .then((response) => response.json())
  .then((data) => (myData = data))
  .then(function () {
    let picbox = document.getElementById("picbox");
    let img = document.createElement("img");
    img.src = `${myData.url}`;
    let src = document.getElementById("picbox");
    src.appendChild(img);

    // picbox.appendChild(picture)
  });
