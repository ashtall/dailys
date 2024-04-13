function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let draggables = document.querySelectorAll(".draggable");
const websiteListContainer = document.querySelector("#WebsiteList");
const nameInput = document.querySelector('#nameInput')
const websiteInput = document.querySelector("#websiteInput")
const template = document.querySelector(".template")
const addWebsitePopUp = document.querySelector('#addWebsite')

addButtonListener(addWebsitePopUp.querySelector(".butt"))

draggables.forEach((draggable) => {
    addEventListenerToDraggables(draggable);
});

let isDragging = false

function addEventListenerToDraggables(draggable) {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("opacity-50", "dragging");
        draggable.querySelectorAll(".trash").forEach((button)=>{button.classList.add("hidden")})
        isDragging = true
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("opacity-50", "dragging");
        draggable.querySelectorAll(".trash").forEach((button)=>{button.classList.remove("hidden")})
        isDragging = false
    });

    draggable.addEventListener("mouseenter", () => {
        let trash = draggable.querySelectorAll(".trash");
        if (!isDragging){
            trash.forEach((button)=>{
                button.classList.remove("opacity-0")
                button.classList.add("opacity-100");
            })
        }
    });

    draggable.addEventListener("mouseleave", () => {
        let trash = draggable.querySelectorAll(".trash");
        if(!isDragging){
            trash.forEach((button)=>{
                button.classList.remove("opacity-100");
                button.classList.add("opacity-0");
            })
        }
    });

    draggable.querySelector(".delete").addEventListener('click',(e)=>{deleteWebsite(e)})

    draggable.querySelector('.edit').addEventListener('click',(e)=>{popUpAddWebsite(2,e.target.closest('.draggable'))})

    draggable.querySelectorAll(".butt").forEach((button)=>{
        addButtonListener(button)
    })
}

websiteListContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(websiteListContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
        websiteListContainer.appendChild(draggable);
        setAddToEnd()
    } else {
        websiteListContainer.insertBefore(draggable, afterElement);
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
    const addButton = websiteListContainer.querySelector(".addButton")
    websiteListContainer.appendChild(addButton)
}

const addButton = document.querySelector(".addButton")
addButton.addEventListener('click',()=>{popUpAddWebsite(1)})

async function popUpAddWebsite(popUp,draggable){
    const blur = document.querySelector("#blur")
    addWebsitePopUp.classList.remove("hidden")
    blur.classList.add("blur-sm")
    await sleep(300)
    addWebsitePopUp.classList.remove("opacity-0")
    addWebsitePopUp.classList.add("opacity-100")

    if(popUp == 1){
        // Add website
        addWebsitePopUp.querySelector(".popUpTitle").textContent = "Add Website"
        nameInput.focus()
        nameInput.value = ""
        websiteInput.value = ""
        addWebsitePopUp.querySelector(".done").id = 'add'
    }
    if(popUp == 2){
        // Edit website
        addWebsitePopUp.querySelector(".popUpTitle").textContent = "Edit Website"
        nameInput.focus()
        nameInput.value = draggable.querySelector('.name').textContent
        websiteInput.value = draggable.querySelector(".website").id
        addWebsitePopUp.querySelector(".done").id = "edit"
        addWebsitePopUp.querySelector('.component').id = draggable.id
    }
}

nameInput.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        websiteInput.focus()
    }
})

websiteInput.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        getWebsiteInput()
    }
})

const addWebsiteClose = document.getElementById('addWebsiteClose')
addWebsiteClose.addEventListener('click',closeAddWebsite)

function closeAddWebsite(){
    const addWebsitePopUp = document.querySelector("#addWebsite")
    const blur = document.querySelector("#blur")
    addWebsitePopUp.classList.add("hidden")
    blur.classList.remove("blur-sm")
    addWebsitePopUp.classList.add("opacity-0")
    addWebsitePopUp.classList.remove("opacity-100")
}


function setDeleteButton(button){
    button.addEventListener('click',(e)=>{
        deleteWebsite(e)
    })
}

function deleteWebsite(e){
    e.target.closest(".draggable").remove()
}

function addButtonListener(butt){
    const bg = butt.querySelector('.button-bg')
    const button = butt.querySelector('.button')

    button.addEventListener('mouseenter',()=>{
        bg.classList.remove('opacity-0')
        bg.classList.add('opacity-20')
    })
    button.addEventListener('mouseleave',()=>{
        bg.classList.add('opacity-0')
        bg.classList.remove('opacity-20')
    })
}

const doneButton = document.querySelector(".done")
doneButton.addEventListener('click',getWebsiteInput)

function getWebsiteInput(){
    const name = nameInput.value
    const website = websiteInput.value
    const doneButton = addWebsitePopUp.querySelector(".done")
    switch(doneButton.id){
        case "add":
            addWebsite(name,website)
            break
        case "edit":
            editWebsite(name,website,doneButton)
            break
    }
    console.log("done")
    closeAddWebsite()
}

function addWebsite(name,website){
    const newWebsite = template.cloneNode(true)
    const nameDiv = newWebsite.querySelector(".name")
    const websiteDiv = newWebsite.querySelector(".website")

    newWebsite.classList.remove("hidden","template")
    newWebsite.id = Date.now()
    nameDiv.textContent = name
    websiteDiv.onclick = function(){
        window.open(website,"_blank")
    }
    websiteDiv.id = website
    websiteListContainer.appendChild(newWebsite)
    addEventListenerToDraggables(newWebsite)
    setAddToEnd()
}

function editWebsite(name,website,doneButton){
    const draggableID = doneButton.querySelector(".component").id
    console.log(typeof ("#" + draggableID))
    const draggable = document.querySelector("[id='"+draggableID+"']")
    console.log(draggable)
    const nameDiv = draggable.querySelector(".name")
    const websiteDiv = draggable.querySelector(".website")

    draggable.id = Date.now()
    nameDiv.textContent = name
    websiteDiv.onclick = function(){
        window.open(website,"_blank")
    }
    websiteDiv.id = website
}