let navbar = document.getElementById("navbar");
let passRight = "";

//Set active user
function setActiveUser(auSU) {
  localStorage["NEOWARNAU"] = auSU;
}

//end of set active user

navigationInsert();

function navigationInsert() {
  navbar.innerHTML = "";

  navbar.insertAdjacentHTML(
    "afterbegin",
    `  <div id="navbar"></div>


<nav class="navbar navbar-dark bg-dark" aria-label="First navbar example">
 <div class="container-fluid">
   <a class="navbar-brand" href="#">Near earth object warning system</a>
   <button
     class="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarsExample01"
     aria-controls="navbarsExample01"
     aria-expanded="false"
     aria-label="Toggle navigation"
   >
     <span class="navbar-toggler-icon"></span>
   </button>
 
   <div class="collapse navbar-collapse" id="navbarsExample01">
     <ul class="navbar-nav me-auto mb-2">
       <li class="nav-item">
         <a
           class="nav-link active"
           aria-current="page"
           href="../index.html"
           >Home</a
         >
       </li>
       <li class="nav-item">
         <a class="nav-link" href="../HTML/impact.html">NEO Navigation</a>
       </li>
       <li class="nav-item">
         <a
           class="nav-link"
           aria-current="page"
           id="googleLogin"
           >Login with google</a
         >
       </li>

       <li class="nav-item dropdown">
         <a
           class="nav-link dropdown-toggle"
           href="#"
           id="dropdown01"
           data-bs-toggle="dropdown"
           aria-expanded="false"
           >Admin</a
         >
         <ul class="dropdown-menu" aria-labelledby="dropdown01">
           <li><a class="dropdown-item" href="#">Username:<input id="userName" type="text"></a></li>
           <li><a  class="dropdown-item" href="#">Password:<input id="password" type="password">${passRight}</a></li>
           <li>
             <a id="loginBtn" class="dropdown-item" href="#"><button id="loginbtn">Login</button></a>
           </li>
         </ul>
       </li>
     </ul>
     <form>
       <input
         class="form-control"
         type="text"
         placeholder="Search"
         aria-label="Search"
       />
     </form>
   </div>
 </div>
 </nav>`
  );
  //   //Users stored in database, just a temporary backup

  //   let user = [
  //     {
  //       userName: "sven",
  //       password: "0000",
  //       surname: "Dudink",
  //       isSuperAdmin: true,
  //       firstName: "Sven",
  //     },
  //     {
  //       userName: "Billy",
  //       password: "0123",
  //       surname: "lamada",
  //       isSuperAdmin: false,
  //       firstName: "puppy",
  //     },
  //     {
  //       userName: "FlipUser12",
  //       password: "0434",
  //       surname: "rodger",
  //       isSuperAdmin: false,
  //       firstName: "rabbit",
  //     },
  //     {
  //       userName: "Polly125976",
  //       password: "06546",
  //       surname: "von haekenstadt",
  //       isSuperAdmin: false,
  //       firstName: "Emily",
  //     },
  //   ];
  //   let localData = JSON.stringify(user);
  //   localStorage["NEOWARN"] = localData;

  //   // end of Users stored in database, just a temporary backup

  let userName = document.getElementById("userName");
  let password = document.getElementById("password");
  let loginBtn = document.getElementById("loginBtn");
  loginBtn.addEventListener("click", passwordLogin);
}
let hideFields = document.getElementById("hideFields");
function passwordLogin(e) {
  e.preventDefault();

  if (mostSecurePasswordSystem(userName.value, password.value)) {
    setActiveUser(userName.value);
    window.location.href = "./Admin.html#";
    console.log(auSU);
  } else {
    passRight = "your password is wrong";
    navigationInsert();
  }
}

console.log(localStorage["NEOWARN"]);
let user = JSON.parse(localStorage["NEOWARN"]);
console.log(user);
console.log(mostSecurePasswordSystem("Billy", "0123"));

function mostSecurePasswordSystem(nameField, passField) {
  let passCheck = false;
  user.forEach((element) => {
    if (element.password == passField && element.userName == nameField)
      passCheck = true;
  });
  if (passCheck == true) {
    return true;
  } else return false;
}
