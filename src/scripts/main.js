const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let websiteList

const setWebsiteList = () => {
    if(!localStorage.getItem('websites')){
        websiteList = {}
    }else{
        websiteList = JSON.parse(localStorage.getItem('websites'))
    }
}
setWebsiteList()

const addWebsite = (name,link) => {
    if(!localStorage.getItem('websites')){
        websiteList = {}
    }else{
        websiteList = JSON.parse(localStorage.getItem('websites'))
    }
    websiteList[Object.keys(websiteList).length] = {name:name,link:link}
    setWebsitesInStorage()
}

const setWebsitesInStorage = () =>{
    localStorage.setItem('websites',JSON.stringify(websiteList))
    console.log(JSON.parse(localStorage.getItem('websites')))
}

const navbarBgEle = document.getElementById('navbar-bg')
const websiteListEle = document.getElementById('website-list')
const addButtonDiv = websiteListEle.querySelector(".addButtonDiv")

websiteListEle.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(websiteListEle, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
        websiteListEle.appendChild(draggable);
        setAddToEnd()
    } else {
        websiteListEle.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

function setAddToEnd(){
    websiteListEle.appendChild(addButtonDiv)
}

let isDragging = false

const setButtonBG = (draggable) => {
    const buttons = draggable.querySelectorAll(".button")
    buttons.forEach((button)=>{
        const bg = button.querySelector('.button-bg')
        button.addEventListener('mouseenter',()=>{
            bg.classList.add("opacity-25")
            bg.classList.remove('opacity-0')
        })
        button.addEventListener('mouseleave',()=>{
            bg.classList.add("opacity-0")
            bg.classList.remove('opacity-25')
        })
    })
}

const closeButton = document.querySelector('.closeButton')
const bg = closeButton.querySelector('.button-bg')
closeButton.addEventListener('mouseenter',()=>{
    bg.classList.add("opacity-25")
    bg.classList.remove('opacity-0')
})
closeButton.addEventListener('mouseleave',()=>{
    bg.classList.add("opacity-0")
    bg.classList.remove('opacity-25')
})
closeButton.addEventListener('click',(e)=>{
    popDownAddWebsite()
})

const setOrderOfDraggablesInStorage = () =>{
    const draggables = websiteListEle.querySelectorAll('.draggable:not(.template)')
    websiteList = {}
    for(let i=0;i<draggables.length;i++){
        const name = draggables[i].querySelector('.name').innerHTML
        const link = draggables[i].querySelector('.link').id
        websiteList[i] = {name:name,link:link}
    }
    setWebsitesInStorage()
}


const deleteWebsite = (e) =>{
    const draggable = e.target.closest('.draggable')
    const name = draggable.querySelector('.name').innerHTML
    const link = draggable.querySelector('.link').id
    websiteList = JSON.parse(localStorage.getItem('websites'))
    for(let i = 0;i<Object.keys(websiteList).length; i++){
        if(JSON.stringify(websiteList[i]) == JSON.stringify({name:name,link:link})) {
            delete websiteList[i]
            break
        }
    }
    setWebsitesInStorage()
    e.target.closest('.draggable').remove()
}

const linkOutWebsite = (e) =>{
    const website =  e.target.closest('.draggable').querySelector('.mainButton').id
    window.open(website,'_blank')
}

const displayWebsite = (e) =>{
    const website =  e.target.closest('.draggable').querySelector('.mainButton').id
    iframe.src = website
}

const setDraggable = (draggable) => {
    draggable.addEventListener('dragstart',()=>{
        enableOrDisableOptions(draggable,0)
        draggable.classList.add('dragging')
        const options = draggable.querySelector('.options')
        options.classList.add('hidden')
        isDragging = true
    })

    draggable.addEventListener('dragend',()=>{
        draggable.classList.remove('dragging')
        const options = draggable.querySelector('.options')
        options.classList.remove('hidden')
        setOrderOfDraggablesInStorage()
        isDragging = false
    })

    draggable.addEventListener("mouseenter", () => {
        if (!isDragging){
            enableOrDisableOptions(draggable,1)
        }
    });

    draggable.addEventListener("mouseleave", () => {
        if (!isDragging){
            enableOrDisableOptions(draggable,0)
        }
    });

    setButtonBG(draggable)
    draggable.querySelector('.deleteButton').addEventListener('click',(e)=>{deleteWebsite(e)})
    draggable.querySelector('.linkButton').addEventListener('click',(e)=>{linkOutWebsite(e)})
    draggable.querySelector('.mainButton').addEventListener('click',(e)=>{displayWebsite(e)})
}

let draggables = document.querySelectorAll('.draggable')
draggables.forEach((draggable)=>{setDraggable(draggable)})

const enableOrDisableOptions = (draggable,onOff) =>{
    const options = draggable.querySelector('.options')
    switch(onOff){
        case 1:
            options.classList.add('opacity-100')
            options.classList.remove('opacity-0')
            break
        case 0:
            options.classList.add('opacity-0')
            options.classList.remove('opacity-100')
            break
    }
}

const addButton = document.querySelector('.addButton')
const screen = document.querySelector('.screen')
const addWebsiteDiv = document.querySelector('.addWebsite')

const nameInput = document.querySelector('#nameInput')
const websiteInput = document.querySelector('#websiteInput')
const doneButton = document.querySelector('#doneButton')

addButton.addEventListener('click',()=>{
    popUpAddWebsite()
})
let ispoppedUp = false
const popUpAddWebsite = async () => {
    ispoppedUp = true
    nameInput.value = ""
    websiteInput.value = ""
    screen.classList.add('blur-sm')
    addWebsiteDiv.classList.remove('hidden')
    await sleep(10)
    addWebsiteDiv.classList.add('opacity-100')
    addWebsiteDiv.classList.remove('opacity-0')
    nameInput.focus()
}

const popDownAddWebsite = () => {
    ispoppedUp = false
    screen.classList.remove('blur-sm')
    addWebsiteDiv.classList.add('opacity-0')
    addWebsiteDiv.classList.remove('opacity-100')
    addWebsiteDiv.classList.add('hidden')
}

nameInput.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        websiteInput.focus()
    }
})

websiteInput.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        websiteInput.blur()
        submitAddWebsite()
    }
})

doneButton.addEventListener('click',()=>{
    submitAddWebsite()
})

const submitAddWebsite = () => {
    if (nameInput.value.trim() == "" || websiteInput.value.trim() == "") {
        if(nameInput.value.trim() == "" && websiteInput.value.trim() == ""){
            nameInput.focus()
        }else if (websiteInput.value.trim() == ""){
            websiteInput.focus()
        }else if(nameInput.value.trim() == ""){
            nameInput.focus()
        }
        return
    }
    createDraggable(nameInput.value,websiteInput.value,true)
    popDownAddWebsite()
}

const template = document.querySelector(".template")
const createDraggableDiv = (name,link) =>{
    const clone = template.cloneNode(true)
    clone.classList.remove("template", "hidden")
    const nameDiv = clone.querySelector('.name')
    const linkDiv = clone.querySelector('.link')
    nameDiv.innerHTML = name
    linkDiv.id = link
    websiteListEle.appendChild(clone)
    setDraggable(clone)
    setAddToEnd()
}

const createDraggable = (name,link,newDraggable) => {
    switch(newDraggable){
        case true:
            let isDuplicate = false
            setWebsiteList()
            for(let i=0;i<Object.keys(websiteList).length;i++){
                if(JSON.stringify(websiteList[i]) == JSON.stringify({name:name,link:link})){
                    isDuplicate = true
                }  
            }
            console.log(isDuplicate)
            if(!isDuplicate || Object.keys(websiteList).length < 1){
                addWebsite(name,link)
                createDraggableDiv(name,link)
            }
            break
        case false:
            createDraggableDiv(name,link)
    }
}

window.addEventListener('load',(e)=>{
    setWebsiteList()
    if(websiteList){
        console.log(websiteList)
        for(let i = 0;i<Object.keys(websiteList).length;i++){
            console.log(websiteList[i])
            createDraggable(websiteList[i].name,websiteList[i].link,false)
        }
    }
})

document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape'){
        if(ispoppedUp){
            popDownAddWebsite()
        }
    }
})