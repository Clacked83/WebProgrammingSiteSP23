//Meme Dev Tools
let localStorageArray = [];
let array;

window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", saveLinkToLocal);
    document.querySelector("#clearBtn").addEventListener("click", clearMemes);
    document.querySelector("#display").addEventListener("click", displayLocalStorage);

    // if(loadList != null){
    //     localStorageArray = loadList();
    // } else {
    //     localStorageArray = {};
    // }

});



function saveLinkToLocal(){
    let item = document.querySelector('#item').value
    let linkName = document.querySelector('#linkName').value

    if (item == null || linkName == null){
        alert('Invalid input');
    } else {
        let meme = {
            "memeLink":item,
            "memeName":linkName
            };
        addLinksToList(meme.memeLink, meme.memeName);
   //     addMemeToAll(meme.memeLink, meme.memeName);
        localStorageArray.push(meme);
        array = localStorageArray.toString();
        localStorage.setItem("storedArray", array);
        // document.querySelector('#item').value = '';
        // document.querySelector('#linkName').value = '';
    }    
}

function addLinksToList(memeLink, memeName){
    let list = document.querySelector('ol');
   // list.innerHTML +=  `<li>${memeName}</li>`; 
    list.innerHTML += '<li><input type="button" class="meme" id="'+ memeLink +'" value="'+memeName+'"></input></li>';

    // if(localStorageArray){
    //     let list = document.querySelector('ol');
    //     for(i of localStorageArray){     
            
    //     }
    // } 
}

//     item = "<input type=\"button\" id=\"meme\" value=\""+linkName+"\" onclick=\""+changeImg(item)+"\"></input>";
//   //  memeButton =     // 

function loadList() {
    let savedList = localStorage.getItem("storedArray");
    if(savedList != null){
        return savedList.split(",");
    } else {
        return "";
    }
} 

function displayLocalStorage() {
    console.log(localStorageArray);
}

function changeImg(newsrc){
    document.getElementById('viewport').src =  newsrc;
}

function clearMemes(){
    let list = document.querySelector('ol');
    list.innerHTML = "";
    localStorageArray = [];
    localStorage.clear;
 }

 function getId(i){
    let list = document.querySelectorAll('.meme');
    return list.item(i).id;
 }

 function pushToLocalStorageArray(i){
    localStorageArray.push(i);
 }

 function addMemeToAll(link, name){
    let list = document.querySelector('#allMemes');
    list.innerHTML += '<img src="'+link+'" alt="'+name+'" >';
 }