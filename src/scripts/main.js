let listHeight
let iframeHeight
let iframeWidth

let websiteList

if(!localStorage.getItem('websites')){
    websiteList = {}
}else{
    websiteList = JSON.parse(localStorage.getItem('websites'))
}

console.log(websiteList)

const addWebsite = (name,link) => {
    websiteList[Object.keys(websiteList).length] = {name:name,link:link}
}

const setWebsites = () =>{
    localStorage.setItem('websites',JSON.stringify(websiteList))
}

let navbarBgEle = document.getElementById('navbar-bg')
let websiteListEle = document.getElementById('website-list') 


for(let i=0;i<10;i++){
    addWebsite('Wordle',"https://www.nytimes.com/games/wordle/index.html")
}

setWebsites()

console.log(JSON.parse(localStorage.getItem('websites')))

document.addEventListener('load',(e)=>{
    
})