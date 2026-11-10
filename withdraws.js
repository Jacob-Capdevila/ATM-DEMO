// === SECTION 1: DOM ELEMENT BINDINGS ===
const btn20 = document.getElementById('btn-20');
const btn40 = document.getElementById('btn-40');
const btn60 = document.getElementById('btn-60');
const btnCustom = document.getElementById('btn-custom');
const btnCancel = document.getElementById('btn-cancel');

const statusOverlay = document.getElementById('status-overlay');
const statusTitle = document.getElementById('status-title');
const statusMessage = document.getElementById('status-message');
const btnStatusClose = document.getElementById('btn-status-close');

// === SECTION 2: STATE VARIABLES ===
const currentBalance = 50.00; 

// === SECTION 3: HARDWARE LOCK MANAGEMENT ===
function lockHardware() {
    btn20.disabled = true;
    btn40.disabled = true;
    btn60.disabled = true;
    btnCustom.disabled = true;
    btnCancel.disabled = true;
}

function unlockHardware() {
    btn20.disabled = false;
    btn40.disabled = false;
    btn60.disabled = false;
    btnCustom.disabled = false;
    btnCancel.disabled = false;
}

// === SECTION 4: CORE TRANSACTION ENGINE ===
function processWithdrawal(amount) {
    lockHardware();
    statusOverlay.classList.remove('hidden');
    
    if (amount <= currentBalance) {
        statusTitle.innerText = "Transaction Approved";
        statusTitle.style.color = "#4CAF50"; 
        statusMessage.innerText = `Please take your $${amount}.`;
        
        setTimeout(() => { 
            window.location.href = "index.html"; 
        }, 4000);
        
    } else {
        statusTitle.innerText = "Insufficient Funds";
        statusTitle.style.color = "#d9534f"; 
        statusMessage.innerText = "Your account balance is too low for this request.";
        
        btnStatusClose.classList.remove('hidden');
        
        setTimeout(() => {
            btnStatusClose.focus(); 
        }, 100);
    }
}

// === SECTION 5: STANDARD AMOUNT EVENT LISTENERS ===
btn20.addEventListener('click', () => processWithdrawal(20));
btn40.addEventListener('click', () => processWithdrawal(40));
btn60.addEventListener('click', () => processWithdrawal(60));

// === SECTION 6: CUSTOM AMOUNT & HARDWARE VALIDATION ===
btnCustom.addEventListener('click', function() {
    btnCustom.blur(); 
    
    setTimeout(() => {
        let userInput = prompt("Enter amount in multiples of $20:");
        
        if (userInput !== null && userInput !== "") {
            let amount = parseFloat(userInput);
            
            if (amount > 0 && amount % 20 === 0) {
                processWithdrawal(amount);
            } else {
                alert("Hardware Error: This terminal can dispense $20 bills only. Please enter a valid multiple.");
                btnCustom.focus(); 
            }
        } else {
            btnCustom.focus(); 
        }
    }, 50);
});

// === SECTION 7: ERROR RECOVERY & CANCEL NAVIGATION ===
btnCancel.addEventListener('click', function() {
    window.location.href = "index.html"; 
});

btnStatusClose.addEventListener('click', function() {
    statusOverlay.classList.add('hidden');
    btnStatusClose.classList.add('hidden');
    unlockHardware();
    btn20.focus(); 
});