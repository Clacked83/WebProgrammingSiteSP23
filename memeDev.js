//Meme Dev Tools
let localStorageArray = {};
let array;
localStorageArray = loadList();

// window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('save').addEventListener('click', saveLinkToLocal());
    document.getElementById('load').addEventListener('click', displayLocalStorage());

// });

function saveLinkToLocal(){
    let item = document.getElementById('item').value
    linkName = document.getElementById('linkName').value
    item = "<a href=\""+ item + "\">"+ linkName +"</a>";

    localStorageArray.push(item);
    array = localStorageArray.toString();
    localStorage.setItem("storedArray", array);
}

function loadList() {
    if(localStorage.getItem("storedArray") == null){
        console.log('Is Null');
    } else{
        return localStorage.getItem("storedArray");
    } 
}

function displayLocalStorage() {
    console.log(localStorageArray);
}

