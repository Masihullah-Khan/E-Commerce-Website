
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await res.text();
        console.log("Login Response:", res.status, result);

        if (res.ok) {
            localStorage.setItem('loggedIn', 'true'); // ✅ Set login status
            alert("🎉 Login successful! Redirecting to Home page...");
            window.location.href = 'index.html'; 
        } else {
            alert(result); // show backend error message
        }
    } catch (err) {
        console.error("❌ Login error:", err);
        alert("Something went wrong! Try again.");
    }
});
