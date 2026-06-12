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

    // Puts them into the HTML
    document.getElementById('time').textContent = timeStr;
    document.getElementById('date').textContent = dateStr;
}

// Start immediately, then update every second
showTime();
setInterval(showTime, 1000);