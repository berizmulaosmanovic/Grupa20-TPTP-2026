function toggleNightMode() {
    // Ova funkcija se izvršava čim klikneš na dugme
    document.body.classList.toggle("dark-mode");
    
    // Možeš promijeniti i tekst na dugmetu da bude jasnije
    const dugme = document.getElementById("dugme");
    if (document.body.classList.contains("dark-mode")) {
        dugme.innerText = "Day Mode";
    } else {
        dugme.innerText = "Night Mode";
    }
}