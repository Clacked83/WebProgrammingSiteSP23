//Meme Dev Tools
let localStorageArray = [];
//document.querySelector('input#selection').value = '';

window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", saveLinkToLocal);
    document.querySelector("#clearBtn").addEventListener("click", clearMemes);
    document.querySelector("#display").addEventListener("click", displayLocalStorage);
    document.querySelector("#view").addEventListener("click", changeImgV2);
    
    //localStorageArray = loadList;
    localStorageArray = loadList();

      for(i of localStorageArray){
        let memeLink = i.memeLink;
        let memeName = i.memeName;
        addLinksToList(memeLink, memeName);
        //querySelector('#'+memeLink+'').addEventListener('click', changeImg(memeLink));
      }
    // buttons();
   

});

function postToSelectV2(link){
    document.getElementById('selection').value = link;
    document.querySelector('.meme').addEventListener('click', postToSelectV2())
}

function saveLinkToLocal(){
    let item = document.querySelector('#item').value
    let linkName = document.querySelector('#linkName').value

    if (item == null || linkName == null){
        alert('Invalid input');
    } else {
        let meme = {
            "memeLink":"\""+item+"\"",
            "memeName":"\""+linkName+"\""
            };
        addLinksToList(meme.memeLink, meme.memeName);
        localStorageArray.push(meme);
        let memeJSON = JSON.stringify(localStorageArray);
        localStorage.setItem("storedArray", memeJSON);
        let memeNameStr = meme.memeName.replace(/['"]+/g, '');
        document.querySelector('input[name="'+memeNameStr+'"]').addEventListener('click', postToSelect(meme.memeLink));

    }
       
            // localStorageArray = localStorageArray.toString();
         //    addMemeToAll(meme.memeLink, meme.memeName);
        // document.querySelector('#item').value = '';
        // document.querySelector('#linkName').value = '';
    }    

function postToSelect(link){
    document.getElementById('selection').value = link.replace(/['"]+/g, '');
}

function addLinksToList(memeLink, memeName){
    
    let list = document.querySelector('ol');
   // list.innerHTML +=  `<li>${memeName}</li>`; 
    let meme = '<input type="button" class="meme" id='+ memeLink +' name='+memeName+' value='+memeName+'></input>';
    list.innerHTML += `<li>${meme}</li>`;

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
    let list = document.querySelector('ol');
    list.innerHTML = "";
    localStorageArray = [];
    localStorage.clear();
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


    // let buttonArray = document.querySelectorAll('#favMemes');
    // for(i of buttonArray){
    //     i.addEventListener('click', changeImg(i.id) );
    // }
 


