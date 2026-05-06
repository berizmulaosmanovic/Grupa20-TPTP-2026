const prekidac = document.getElementById("dugme");
const tijelo = document.body

const ucitajMod = () => {
    const trenutnimod =  localStorage.getItem("nightMode");
    // Ako je nightMode postavljen na "true", primijeni tamni mod
    if (trenutnimod === "true") {
        tijelo.classList.add("dark-mode");
        prekidac.innerText = "Day Mode";
    } else {
        tijelo.classList.remove("dark-mode");
        prekidac.innerText = "Night Mode";
    }
};

ucitajMod(); // Poziv funkcije prilikom učitavanja stranice
function toggleNightMode() {
    // Ova funkcija se izvršava čim se klikne na dugme
    document.body.classList.toggle("dark-mode");
    
   
    const dugme = document.getElementById("dugme");
    if (document.body.classList.contains("dark-mode")) {
        dugme.innerText = "Day Mode";

        localStorage.setItem("nightMode", "true"); // Spremi stanje u localStorage
    } else {
        dugme.innerText = "Night Mode";
        localStorage.setItem("nightMode", "false"); // Spremi stanje u localStorage
    }
}