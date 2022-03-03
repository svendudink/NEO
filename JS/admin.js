let newUserName = document.getElementById("newUserName");
let newPassword = document.getElementById("newPassword");
let newFirstName = document.getElementById("newFirstName");
let newSurName = document.getElementById("newSurName");
let newIsSuperAdmin = document.getElementById("newIsSuperAdmin");
let newCreateUser = document.getElementById("newCreateUser");
let missingData = document.getElementById("missingData");
let pushToUserHTML = document.getElementById("pushToUserHTML");
let deleteUser = document.getElementById("deleteUser");
let delUser;
let doubleUser;
let userExist = document.getElementById("userExist");
let unfilledFields = document.getElementById("unfilledFields");
let searchUserField = document.getElementById("searchUserField");
let searchUserButton = document.getElementById("searchUserButton");
let generate = document.getElementById("generate");
newCreateUser.addEventListener("click", createAndPushUser);
console.log(localStorage["NEOWARNAU"]);
//generate headtext admin field

//end of generate headtext admin field

// view registered users
buildRegisteredUsers();
function buildRegisteredUsers(filtered) {
  console.log(pushToUserHTML);

  let userNew = user.filter((element, index) => {
    console.log(filtered == element.userName);
    return (
      filtered == undefined || filtered == element.userName || filtered == ""
    );
  });
  buildTables(userNew);
}

// Creates the user, and pushes to local storage
function createAndPushUser(e) {
  e.preventDefault();
  if (doubleUserName(newUserName.value)) {
    userExist.style.display = "inline";
    newUserName.value = "";
    newUserName.focus();
  } else if (
    newUserName.value == "" ||
    newPassword.value == "" ||
    newFirstName.value == "" ||
    newSurName.value == ""
  ) {
    userExist.style.display = "none";
    unfilledFields.style.display = "inline";
  } else {
    unfilledFields.style.display = "none";
    userExist.style.display = "none";

    let newest = {
      userName: newUserName.value,
      password: newPassword.value,
      surname: newSurName.value,
      isSuperAdmin: newIsSuperAdmin.checked,
      firstName: newFirstName.value,
    };
    newUserName.value = "";
    newPassword.value = "";
    newFirstName.value = "";
    newSurName.value = "";
    newIsSuperAdmin.checked = false;
    user.push(newest);
    console.log(user);
    let localData = JSON.stringify(user);
    localStorage["NEOWARN"] = localData;
    buildRegisteredUsers();
  }
}

// end of view registered users

// Build and rebuild tables
function buildTables(table) {
  pushToUserHTML.innerHTML = "";
  table.forEach((element, index) => {
    let SU = "No";
    if (element.isSuperAdmin == true) SU = "Yes";
    pushToUserHTML.insertAdjacentHTML(
      "afterbegin",
      `<tr data-index="0"><td class="bs-checkbox " style="width: 36px; "><label>
            <input id=deleteButton${index} data-index="0" name="btSelectItem" type="checkbox">
            <span></span>
            </label></td><td>${element.userName}</td><td>${element.firstName} ${element.surname}</td><td>${SU}</td></tr>`
    );
  });
}

// end of build and rebuild tables

// delete users
deleteUser.addEventListener("click", delListen);

function delListen(e) {
  e.preventDefault();
  delUser = user.filter(function (js, i) {
    let userSelect = eval(`document.getElementById("deleteButton${i}")`);
    console.log(userSelect.checked);
    return !userSelect.checked;
  });
  user = delUser;
  buildRegisteredUsers();
  let localData = JSON.stringify(user);
  localStorage["NEOWARN"] = localData;
}

console.log(localStorage["NEOWARNAU"]);
console.log(user.isSuperAdmin == true);
// end of delete users

showHide();
function showHide() {
  user.forEach((element) => {
    if (
      element.userName == localStorage["NEOWARNAU"] &&
      element.isSuperAdmin == true
    ) {
      document.getElementById("hideFields").style.visibility = "visible";
      generate.innerHTML = "Welcome Super Admin";
    }
  });
}
// // //Show and Hide
// showHide();
// function showHide() {
//   for (let i = 0; i < user.length; i++) {
//     if (
//       user.userName == localStorage["NEOWARNAU"] &&
//       user.isSuperAdmin == true
//     ) {
//       document.getElementById("hideFields").style.visibility = "visible";
//       break;
//     } else {
//       document.getElementById("hideFields").style.visibility = "hidden";
//     }
//   }
// }

//end of show and hide

// check for double username
function doubleUserName(checkUser) {
  let double = false;
  user.forEach((element) => {
    if (element.userName == checkUser) {
      double = true;
    }
  });
  return double;
}
// end of check for double username

// search users

searchUserButton.addEventListener("click", searching);

function searching(e) {
  e.preventDefault();
  console.log(searchUserField.value);
  buildRegisteredUsers(searchUserField.value);
}
