// === SECTION 1: DOM ELEMENT BINDINGS ===
const btnBalance = document.getElementById('btn-balance');
const btnWithdraw = document.getElementById('btn-withdraw');
const btnTransfer = document.getElementById('btn-transfer');
const btnCancel = document.getElementById('btn-cancel');
const idleScreen = document.getElementById('idle-screen');

// === SECTION 2: SESSION INITIALIZATION ===
function startSession() {
    if (!idleScreen.classList.contains('hidden')) {
        idleScreen.classList.add('hidden');
        resetTimer(); 
        btnBalance.focus(); 
    }
}

// === SECTION 3: IDLE DISMISSAL LISTENERS ===
document.addEventListener('keydown', startSession);
idleScreen.addEventListener('click', startSession);

// === SECTION 4: MENU ROUTING LISTENERS ===
btnBalance.addEventListener('click', function() {
    console.log("Routing to Balance screen...");
    alert("Navigating to Balance Inquiry");
});

btnWithdraw.addEventListener('click', function() {
    console.log("Routing to Withdrawal screen...");
    window.location.href = "withdraws.html";
});

btnTransfer.addEventListener('click', function() {
    console.log("Routing to Transfer screen...");
    alert("Navigating to Transfer Account Selection");
});

btnCancel.addEventListener('click', function() {
    console.log("Transaction Canceled");
    alert("Returning Card. Have a nice day.");
});