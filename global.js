// === SECTION 1: GLOBAL VARIABLES ===
const timeoutWarning = document.getElementById('timeout-warning');
let inactivityTimer;

// === SECTION 2: SECURITY TIMEOUT LOGIC ===
function showWarning() {
    if (timeoutWarning) timeoutWarning.classList.remove('hidden');
}

function hideWarning() {
    if (timeoutWarning) timeoutWarning.classList.add('hidden');
}

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showWarning, 30000);
}

// === SECTION 3: HARDWARE EVENT LISTENER & OVERLAY TRAP ===
document.addEventListener('keydown', function(event) {
    const isWarningVisible = timeoutWarning && !timeoutWarning.classList.contains('hidden');

    if (isWarningVisible) {
        if (event.key === 'Enter') {
            event.preventDefault();
            hideWarning();
            resetTimer(); 
        }
        return; 
    } 
    
    resetTimer(); 
    
    // === SECTION 4: DYNAMIC HARDWARE SCAN ===
    const activeButtons = Array.from(document.querySelectorAll('.menu-btn')).filter(btn => {
        return !btn.disabled && !btn.classList.contains('hidden') && btn.offsetParent !== null;
    });

    let currentIndex = activeButtons.indexOf(document.activeElement);

    // === SECTION 5: KEYBOARD NAVIGATION ROUTING ===
    if (event.key === 'ArrowDown') {
        event.preventDefault(); 
        if (activeButtons.length > 0) {
            let nextIndex = (currentIndex + 1) % activeButtons.length;
            activeButtons[nextIndex].focus();
        }
    } 
    else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (activeButtons.length > 0) {
            let prevIndex = currentIndex <= 0 ? activeButtons.length - 1 : currentIndex - 1;
            activeButtons[prevIndex].focus();
        }
    }
    else if (event.key === 'Enter') {
        event.preventDefault();
        if (currentIndex !== -1) {
            activeButtons[currentIndex].click(); 
        }
    }
    else if (event.key === 'Escape') {
        const cancelBtn = document.getElementById('btn-cancel');
        if (cancelBtn && !cancelBtn.disabled) cancelBtn.click();
    }
});

// === SECTION 6: INITIALIZATION ===
resetTimer();