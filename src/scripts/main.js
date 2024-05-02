let listHeight
let iframeHeight
let iframeWidth

let resetLCButton = document.getElementById("resetLC")
resetLCButton.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.clear()
})

let add10Button = document.getElementById('add10')
add10Button.addEventListener('click',()=>{
    for(let i=0;i<10;i++){
        addWebsite('Wordle',"https://www.nytimes.com/games/wordle/index.html")
    }
    setWebsites()
})

let websiteList

if(!localStorage.getItem('websites')){
    websiteList = {}
}else{
    websiteList = JSON.parse(localStorage.getItem('websites'))
}

const addWebsite = (name,link) => {
    websiteList[Object.keys(websiteList).length] = {name:name,link:link}
}

const setWebsites = () =>{
    localStorage.setItem('websites',JSON.stringify(websiteList))
}

let navbarBgEle = document.getElementById('navbar-bg')
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
    console.log(buttons)
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

const deleteWebsite = (e) =>{
    e.target.closest('.draggable').remove()
}

const linkOutWebsite = (e) =>{
    const website =  e.target.closest('.draggable').querySelector('.mainButton').id
    window.open(website,'_blank')
}

const setDraggables = () => {
    let draggables = document.querySelectorAll('.draggable')
    draggables.forEach((draggable)=>{
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
        draggable.querySelector('.delete').addEventListener('click',(e)=>{deleteWebsite(e)})
        draggable.querySelector('.link').addEventListener('click',(e)=>{linkOutWebsite(e)})
    })
}

setDraggables()

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

const popUpAddWebsite = () => {
    screen.classList.add('blur-sm')
    addWebsiteDiv.classList.remove('hidden')
    addWebsiteDiv.classList.remove('opacity-0')
    addWebsiteDiv.classList.add('opacity-100')
    nameInput.focus()
}

const popDownAddWebsite = () => {
    screen.classList.remove('blur-sm')
    addWebsiteDiv.classList.add('hidden','opacity-0')
    addWebsiteDiv.classList.remove('opacity-100')
}

nameInput.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        websiteInput.focus()
    }
})

websiteInput.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        submitAddWebsite()
    }
})

doneButton.addEventListener('click',()=>{
    submitAddWebsite()
})

const submitAddWebsite = () => {
    popDownAddWebsite()
    createDraggable()
}

const createDraggable = (name,link) => {

}