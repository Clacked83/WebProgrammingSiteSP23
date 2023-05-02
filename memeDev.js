//Meme Dev Tools
let localStorageArray = [];
let memeSrc;
// let user;

// async function getUser() {
//     let res = await fetch('http://localhost:3000/user')
//     res.text().then((data)=>{
//         document.querySelector('#user').textContent = 'Hello ' + data +'!';
//         user = data;
//         localStorage.setItem('username', user);
//     });
// }

// user = localStorage.getItem('username');
// if(user == null){
//     getUser();
// }


window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", saveLinkToLocal);
    document.querySelector("#clearInputs").addEventListener("click", clearFields);
    document.querySelector("#clearBtn").addEventListener("click", clearMemes);
    
    //localStorageArray = loadList;
    localStorageArray = loadList();

    for(i of localStorageArray){
        let memeLink = i.memeLink;
        let belongsTo = i.belongsTo;
        addLinksToList(memeLink, belongsTo);
    }
});


//Add img Link to local storage and display to page using 'addLinksToList' function
function saveLinkToLocal(){
    let item = document.querySelector('#item').value
    let belongsTo = user;

    if (item == "" || belongsTo == null){
        alert('Invalid input');
    } else {
        let meme = {
            "memeLink":""+item+"",
            "belongsTo":""+belongsTo+""
            };
           
        localStorageArray.push(meme);
        let memeJSON = JSON.stringify(localStorageArray);
        localStorage.setItem("storedArray", memeJSON);

        addLinksToList(meme.memeLink, meme.belongsTo);
        document.querySelector('#memeHeader').setAttribute('class', 'hidden');
    }       
}    

//Add images to page
function addLinksToList(memeLink, belongsTo){  
    memeLink = memeLink.replace(/['"]+/g, '');
    let list = document.querySelector('#memes');  
    list.innerHTML += '<img class ="meme" src="'+memeLink+'"></img>';
    document.querySelector('h2').className = 'hidden';
}

// Load Local Storage
function loadList() {
    let savedList = localStorage.getItem("storedArray");
    savedList = JSON.parse(savedList);

    if(savedList != null){
        return savedList;
    } else {
        return [];
    }
} 

//Clear input field
function clearFields(){
    document.querySelector('#item').value = '';
    document.querySelector('#linkName').value = '';
}

//Clear all images and clear local storage
function clearMemes(){
    let list = document.querySelector('#memes');
    list.innerHTML = "";
    localStorageArray = [];
    localStorage.clear();
    // document.getElementById('selection').value = '';
    document.querySelector('h2').className = 'notHidden';
}

//Debug Tools
function displayLocalStorage() {
    console.log(localStorageArray);
    console.log(localStorage);
}

//Deprecated tools
function changeImg(newsrc){
    document.getElementById('viewport').src =  newsrc;
}

function changeImgV2(){
    let newsrc = document.getElementById('selection').value;
    newsrc = newsrc.trim();
    document.getElementById('viewport').src = newsrc;
    document.getElementById('selection').value = '';
}

function postToSelect(){
    document.getElementById('selection').value = 'href';  //link.replace(/['"]+/g, '');
}

function postToSelectV2(link){
    document.getElementById('selection').value = link;
    document.querySelector('.meme').addEventListener('click', postToSelectV2())
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

function addButton(){
    document.querySelectorAll('#favorites').forEach(element => {
        element.addEventListener('click', changeImg(element.src));
    }); 
 }

function changeMemeSrc(){
    memeSrc = document.querySelector('#selection').value.replace(/['"]+/g, '');
    console.log(memeSrc);
}    