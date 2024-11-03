function showLogin() {
    document.getElementById('signUpPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
}

function showSignUp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signUpPage').style.display = 'flex';
}

function signUp() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const displayName = document.getElementById('displayName').value;
    const password = document.getElementById('password').value;

    if (firstName && lastName && displayName && password) {
        localStorage.setItem('displayName', displayName);
        document.getElementById('signUpPage').style.display = 'none';
        document.getElementById('welcomeSection').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Welcome, ${displayName}, ready to conquer your day?`;
    } else {
        alert("Please fill in all fields.");
    }
}

function logIn() {
    const displayName = document.getElementById('loginDisplayName').value;
    const password = document.getElementById('loginPassword').value;

    if (displayName === localStorage.getItem('displayName') && password) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('welcomeSection').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Welcome, ${displayName}, ready to conquer your day?`;
    } else {
        alert("Incorrect Display Name or Password.");
    }
}

