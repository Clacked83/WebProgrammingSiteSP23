//Meme Dev Tools
let localStorageArray = [];
let memeSrc;
//document.querySelector('input#selection').value = '';


//TODO: 
// Add height and width parameter support
// Add 'are you sure?' alert for clear memes button
window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", saveLinkToLocal);
    document.querySelector("#clearInputs").addEventListener("click", clearFields);
    document.querySelector("#clearBtn").addEventListener("click", clearMemes);
    // document.querySelector("#display").addEventListener("click", displayLocalStorage);
  //  document.querySelector("#displayUsers").addEventListener("click", displayUsers);
    // document.querySelector("#view").addEventListener("click", changeImgV2);
    // document.querySelector("#selection").addEventListener("click", ()=>{
    //     document.querySelector("#selection").value = '';
   // });
    
    //localStorageArray = loadList;
    localStorageArray = loadList();

    for(i of localStorageArray){
        let memeLink = i.memeLink;
        let memeName = i.memeName;
        addLinksToList(memeLink, memeName);
    }
});


function saveLinkToLocal(){
    let item = document.querySelector('#item').value
    let linkName = '' //document.querySelector('#linkName').value

    if (item == null || linkName == null){
        alert('Invalid input');
    } else {
        let meme = {
            "memeLink":"\""+item+"\"",
            "memeName":"\""+linkName+"\""
            };
        
       
        localStorageArray.push(meme);
        let memeJSON = JSON.stringify(localStorageArray);
        localStorage.setItem("storedArray", memeJSON);

        addLinksToList(meme.memeLink, meme.memeName);
        //let memeNameStr = meme.memeName.replace(/['"]+/g, '');
    }
       
        // localStorageArray = localStorageArray.toString();
        //    addMemeToAll(meme.memeLink, meme.memeName);
        // document.querySelector('#item').value = '';
        // document.querySelector('#linkName').value = '';
    }    

function postToSelect(){
    document.getElementById('selection').value = 'href';  //link.replace(/['"]+/g, '');
}

function postToSelectV2(link){
    document.getElementById('selection').value = link;
    document.querySelector('.meme').addEventListener('click', postToSelectV2())
}


function addLinksToList(memeLink, memeName){  
    memeLink = memeLink.replace(/['"]+/g, '');
    let list = document.querySelector('#memes');
    //let meme = '<button type="button" class="meme" id="'+ memeLink +'" name='+memeName+' value='+memeName+'>'+memeName+'</button>';
    //let meme = '<span>'+memeName+'</span><input type="button" class="meme" id="'+ memeLink +'" name='+memeName+' value='+memeName+'>'  
    list.innerHTML += '<img class ="meme" src="'+memeLink+'"></img>';
    //document.getElementById(memeLink).addEventListener('click', postToSelect);
}

//item = "<input type=\"button\" id=\"meme\" value=\""+linkName+"\" onclick=\""+changeImg(item)+"\"></input>";

function loadList() {
    let savedList = localStorage.getItem("storedArray");
    savedList = JSON.parse(savedList);

    if(savedList != null){
        return savedList;
    } else {
        return [];
    }
} 

function displayLocalStorage() {
    console.log(localStorageArray);
    console.log(localStorage);
}

function changeImg(newsrc){
    document.getElementById('viewport').src =  newsrc;
}

function changeImgV2(){
    let newsrc = document.getElementById('selection').value;
    newsrc = newsrc.trim();
    document.getElementById('viewport').src = newsrc;
    document.getElementById('selection').value = '';
}

function clearMemes(){
    let list = document.querySelector('#memes');
    list.innerHTML = "";
    localStorageArray = [];
    localStorage.clear();
    document.getElementById('selection').value = '';
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
    // let buttonArray = document.querySelectorAll('#favMemes');
    // for(i of buttonArray){
    //     i.addEventListener('click', changeImg(i.id) );
    // }

    function clearFields(){
        document.querySelector('#item').value = '';
        document.querySelector('#linkName').value = '';
    }