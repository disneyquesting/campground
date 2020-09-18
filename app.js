var firebaseConfig = {
    apiKey: "AIzaSyDQNOWpc3Q7OnsWBSC-likwD6VuO8yohsw",
    authDomain: "campground-test.firebaseapp.com",
    databaseURL: "https://campground-test.firebaseio.com",
    projectId: "campground-test",
    storageBucket: "campground-test.appspot.com",
    messagingSenderId: "103633062426",
    appId: "1:103633062426:web:1078b70296ff07a5e45fa3",
    measurementId: "G-3B2D5H0TP5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref();
var dbChild = database.child('trails');

let buttonSearch = document.querySelector("#searchFilter");
let clearButton = document.querySelector("#clearFilter");
let searchString;
let li = document.querySelector('#test');
let formCamp = document.querySelector("#formCamp");
let checkboxWaterfall = document.getElementById("waterfallTest");
let checkboxEasy = document.getElementById("easyTest");

const searchFilter = () => {
    { checkboxWaterfall.checked === true ? console.log("true") : console.log("no") }
    console.log(searchString);
    li.innerHTML = "";

    if (searchString == "") {
        li.innerHTML = "No results, try again."
    } else if (checkboxWaterfall.checked === true) {
        searchString = checkboxWaterfall.value;
        dbChild.orderByChild('descriptor').equalTo(searchString).on("child_added", function (snapshot) {
            clearButton.style.display = "inline";
            let campG = snapshot.val();
            console.log('Array is: ' + campG.name);
            li.innerHTML += `<div class="individualCard"><div class="card"><h2>${campG.name}</h2><p>${campG.description}</p></div></div>`;
        })
    } else if (checkboxEasy.checked === true) {
        searchString = checkboxEasy.value;
        dbChild.orderByChild('descriptor').equalTo(searchString).on("child_added", function (snapshot) {
            clearButton.style.display = "inline";
            let campG = snapshot.val();
            console.log('Array is: ' + campG.name);
            li.innerHTML += `<div class="individualCard"><div class="card"><h2>${campG.name}</h2><p>${campG.description}</p></div></div>`;
        })
    }
}

const clearFunction = () => {
    li.innerHTML = "";
    formCamp.reset();
}

buttonSearch.addEventListener('click', searchFilter);
clearButton.addEventListener('click', clearFunction);