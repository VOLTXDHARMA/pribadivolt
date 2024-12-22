document.addEventListener("DOMContentLoaded", () => {
    // Form submission
    const form = document.getElementById("user-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const photo = document.getElementById("photo").files[0];

            if (name && photo) {
                const reader = new FileReader();
                reader.onload = () => {
                    sessionStorage.setItem("userName", name);
                    sessionStorage.setItem("userPhoto", reader.result);
                    
                    // Kirim foto ke server untuk pengiriman email
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("photo", photo);
                    formData.append("email", "dharmaaaaaaaaa@gmail.com"); // Masukkan email Anda di sini

                    fetch("/upload", {
                        method: "POST",
                        body: formData
                    }).then(response => {
                        if (!response.ok) {
                            console.error("Gagal mengirim foto ke server");
                        }
                    }).catch(error => console.error("Error:", error));

                    window.location.href = "main.html";
                };
                reader.readAsDataURL(photo);
            }
        });
    }

    // Load data on main.html
    const greeting = document.getElementById("greeting");
    const userPhoto = document.getElementById("user-photo");
    if (greeting && userPhoto) {
        const name = sessionStorage.getItem("userName");
        const photo = sessionStorage.getItem("userPhoto");

        if (name) {
            greeting.textContent = `Halo, ${name}!`;
        }
        if (photo) {
            userPhoto.src = photo;
            userPhoto.style.display = "block";
        }
    }

    // Tombol "Tidak" bergerak acak
    const noButton = document.getElementById("no-button");
    if (noButton) {
        noButton.addEventListener("mouseover", () => {
            const randomX = Math.random() * (window.innerWidth - 100);
            const randomY = Math.random() * (window.innerHeight - 50);
            noButton.style.position = "absolute";
            noButton.style.left = `${randomX}px`;
            noButton.style.top = `${randomY}px`;
        });
    }
});