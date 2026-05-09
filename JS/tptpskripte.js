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
    tijelo.classList.toggle("dark-mode");
    
   
    if (tijelo.classList.contains("dark-mode")) {
        prekidac.innerText = "Day Mode";

        localStorage.setItem("nightMode", "true"); // Spremi stanje u localStorage
    } else {
        prekidac.innerText = "Night Mode";
        localStorage.setItem("nightMode", "false"); // Spremi stanje u localStorage
    }
} // Izvukao funkciju filtriraj od toggleNightMode jer su to dvije odvojene funkcije.

prekidac.addEventListener("click", toggleNightMode); // Dodajemo event listener na dugme da pozove funkciju toggleNightMode kada se klikne

    function filtriraj(kategorija) { // Postaviti id "kartica" na odgovarajuce elemente i
                                      //  pozvati funkciju sa odgovarajućom kategorijom   
           const sveKartice = document.querySelectorAll(".kartica");
           sveKartice.forEach(kartica => {
               if (kategorija === "sve" || kartica.classList.contains(kategorija)) {
                   kartica.style.display = "block";
               } else {
                   kartica.style.display = "none";
               }
           }); 
    }
    function azurirajTimer() {
        // Prvo nam treba početni datum, koji je 29.10.1972. 
        // Zatim ćemo izračunati razliku između tog datuma i trenutnog vremena
        // Na kraju ćemo tu razliku pretvoriti u dane, sate, minute i sekunde
        const pocetnidatum = new Date("October 29, 1972 ").getTime();
        const sada = new Date().getTime();
        const razlika = sada - pocetnidatum;
        
        const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));
        const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minute = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
        const sekundi = Math.floor((razlika % (1000 * 60)) / 1000);
        document.getElementById("timer").innerText = `${dani}d ${sati}h ${minute}m ${sekundi}s`;
    }
    setInterval(azurirajTimer, 1000); // Ova funkcija će se pozivati svakih 1000 milisekundi (1 sekund)
azurirajTimer(); // Poziv funkcije odmah da ne čekamo prvi interval 

