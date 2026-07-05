function showTime() {
    const now = new Date();

    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const dateStr = now.toLocaleDateString('en-US',{
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });

    document.getElementById('time').textContent = timeStr;
    document.getElementById('date').textContent = dateStr.slice(0,3)+dateStr.slice(4);
}

// Time and Date in titlebar
showTime();
setInterval(showTime, 1000);

const titlbarGragArea = document.querySelector(".dragarea");
const mainWindow = document.querySelector(".mainWindow");

let isDraggable = false;
let offsetX = 0;
let offsetY = 0;

titlbarGragArea.addEventListener("mousedown", (event) => {
    isDraggable = true;
    titlbarGragArea.style.cursor = "grabbing";
    offsetX = event.clientX - mainWindow.offsetLeft;
    offsetY = event.clientY - mainWindow.offsetTop;
})

window.addEventListener("mousemove", (event) => {
    if (!isDraggable) return;
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;
    mainWindow.style.left = `${newX}px`;
    mainWindow.style.top = `${newY}px`;
})

titlbarGragArea.addEventListener("mouseup", (event) => {
    if (isDraggable){
        isDraggable = false;
        titlbarGragArea.style.cursor = "grab";
    }
})