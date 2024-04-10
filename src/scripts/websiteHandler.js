let draggables = document.querySelectorAll(".draggable");
const websiteListContainer = document.querySelector("#WebsiteList");

draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("opacity-50","dragging");
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("opacity-50","dragging");
    });
});

websiteListContainer.addEventListener('dragover',e=>{
    e.preventDefault()
    const afterElement = getDragAfterElement(websiteListContainer,e.clientY)
    const draggable = document.querySelector(".dragging")
    if(afterElement == null){
        websiteListContainer.appendChild(draggable)
    }else{
        websiteListContainer.insertBefore(draggable,afterElement)
    }
})

function getDragAfterElement(container,y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
        if(offset<0 && offset > closest.offset){
            return {offset:offset,element:child}
        }else{
            return closest
        }
    }, {offset:Number.NEGATIVE_INFINITY}).element
}