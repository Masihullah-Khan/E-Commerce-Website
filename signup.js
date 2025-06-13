document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // 💡 Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const res = await fetch('/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await res.text();
        console.log("Signup Response:", res.status, result);

        if (res.ok) {
            localStorage.setItem("loggedIn", "true");
            alert("Signup successful! Redirecting to Home page...");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 100);
        } else {
            alert(result); // Show error message from backend
        }

    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong during signup!");
    }
});
