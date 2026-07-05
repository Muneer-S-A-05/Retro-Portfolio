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

function minimizeMainWindow(){
    mainWindow.animate([
        {transform : 'translate(0px,0px) scale(1,1) rotateX(0deg)'} ,
        {transform : `translate(0px,10%) scale(0.3,0.5) rotateX(-25deg)`},
        {transform : `translate(0px,80%) scale(0,0) rotateX(-45deg)`}
    ],{
        duration : closeSpeed,
        easing : 'ease-out',
        // animate changes are usually temporary, fill changes that
        fill : 'forwards'
    });
    setTimeout(()=>{
        mainWindowMaximizeButton.style.display = 'flex'
    },closeSpeed)
}

function maximizeMainWindow(){
    mainWindowMaximizeButton.style.display = 'none'
    mainWindow.animate([
        {transform : `translate(0px,${mainWindowHeight}px) scale(0,0) rotateX(-45deg)`},
        {transform : `translate(0px,${mainWindowHeight/10}px) scale(0.3,0.6) rotateX(-25deg)`},
        {transform : 'translate(0px,0px) scale(1,1) rotateX(0deg)'}
    ],{
        duration : closeSpeed,
        easing : 'ease-out',
        fill : 'forwards'
    });
}

// Time and Date in titlebar
showTime();
setInterval(showTime, 1000);

// MAIN WINDOW OBJECT
const mainWindow = document.querySelector(".mainWindow");

// MKAING MAIN WINDOW DRAGGABLE
const titlbarGragArea = document.querySelector(".dragarea");

let isDraggable = false;
let offsetX = 0;
let offsetY = 0;

// draggin starts
titlbarGragArea.addEventListener("pointerdown", (event) => {
    isDraggable = true;
    titlbarGragArea.style.cursor = "grabbing";
    offsetX = event.clientX - mainWindow.offsetLeft;
    offsetY = event.clientY - mainWindow.offsetTop;
})

// tracking mouse movements
window.addEventListener("pointermove", (event) => {
    if (!isDraggable) return;
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;
    mainWindow.style.left = `${newX}px`;
    mainWindow.style.top = `${newY}px`;
})

// dragging ends
titlbarGragArea.addEventListener("pointerup", (event) => {
    if (isDraggable){
        isDraggable = false;
        titlbarGragArea.style.cursor = "grab";
    }
})

// CLOSING THE MAIN WINDOW
const closeSpeed = 400;
const mainWindowMinimizeButton = document.querySelectorAll(".butt");
const mainWindowMaximizeButton = document.querySelector(".mainWindowButton");
const mainWindowHeight = mainWindow.offsetHeight;

// giving it perspective to cause distortion
mainWindow.parentElement.style.perspective = "1000px";

// Minimizing Main Window
mainWindowMinimizeButton.forEach(button => button.addEventListener("click",minimizeMainWindow));

// Reopening main window
mainWindowMaximizeButton.addEventListener('click',maximizeMainWindow);