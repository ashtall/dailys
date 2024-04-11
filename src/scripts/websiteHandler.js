function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let draggables = document.querySelectorAll(".draggable");
const websiteListContainer = document.querySelector("#WebsiteList");

draggables.forEach((draggable) => {
    addEventListenerToDraggables(draggable);
});

let isDragging = false

function addEventListenerToDraggables(draggable) {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("opacity-50", "dragging");
        draggable.querySelector(".trash").classList.add("hidden")
        isDragging = true
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("opacity-50", "dragging");
        draggable.querySelector(".trash").classList.remove("hidden")
        isDragging = false
    });

    draggable.addEventListener("mouseenter", () => {
        let trash = draggable.querySelector(".trash");
        if (!isDragging){
            trash.classList.remove("opacity-0")
            trash.classList.add("opacity-100");
        }
    });

    draggable.addEventListener("mouseleave", () => {
        let trash = draggable.querySelector(".trash");
        if(!isDragging){
            trash.classList.remove("opacity-100");
            trash.classList.add("opacity-0");
        }
    });
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
addButton.addEventListener('click',addWebsite)
async function addWebsite(){
    const addWebsitePopUp = document.querySelector('#addWebsite')
    const blur = document.querySelector("#blur")
    addWebsitePopUp.classList.remove("hidden")
    blur.classList.add("blur-sm")
    await sleep(300)
    addWebsitePopUp.classList.remove("opacity-0")
    addWebsitePopUp.classList.add("opacity-100")
}

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

const deleteButtons = document.querySelectorAll(".delete")
deleteButtons.forEach((button)=>{
    button.addEventListener('click',deleteWebsite)
})

function deleteWebsite(){

}

const allButtons = document.querySelectorAll('.butt')

allButtons.forEach((butt)=>{
    const bg = butt.querySelector('.button-bg')
    const button = butt.querySelector('button')

    button.addEventListener('mouseenter',()=>{
        bg.classList.remove('opacity-0')
        bg.classList.add('opacity-20')
    })
    button.addEventListener('mouseleave',()=>{
        bg.classList.add('opacity-0')
        bg.classList.remove('opacity-20')
    })
})