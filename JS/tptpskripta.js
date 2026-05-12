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

// Ispravio i rasčistio funkciju jer su 'const' već zadane
    
    if (tijelo.body.classList.contains("dark-mode")) {
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

// Funkcija za validaciju forme
function validirajFormu(event) {
    // 1. Zaustavi automatsko slanje forme
    event.preventDefault();

    // 2. Dohvatanje vrijednosti iz polja
    const ime = document.getElementById("ime").value.trim();
    const prezime = document.getElementById("prezime").value.trim();
    const email = document.getElementById("email").value.trim();
    const poruka = document.getElementById("poruka").value.trim();
    const statusPolje = document.getElementById("porukaStatus");

    // 3. Resetovanje boje i teksta statusa
    statusPolje.innerText = "";
    statusPolje.style.color = "red";

    // 4. Provjera pravila (Validacija)
    if (ime === "" || prezime === "") {
        statusPolje.innerText = "Greška: Ime i prezime su obavezni.";
        return;
    }

    if (ime.length < 2) {
        statusPolje.innerText = "Greška: Ime mora imati bar 2 slova.";
        return;
    }

    // Ručna provjera emaila (tražimo @ i tačku)
    if (!email.includes("@") || !email.includes(".")) {
        statusPolje.innerText = "Greška: Email adresa nije ispravna.";
        return;
    }

    if (poruka.length < 10) {
        statusPolje.innerText = "Greška: Poruka mora biti duža od 10 karaktera.";
        return;
    }

    // 5. Ako je sve prošlo, ispiši uspjeh
    statusPolje.innerText = "Uspješno: Vaša poruka je poslana!";
    statusPolje.style.color = "green";
    
    // Ovdje možeš dodati i reset forme nakon uspjeha
    document.getElementById("kontaktForma").reset();
}

// 6. Povezivanje funkcije sa formom (dodaj na dno fajla)
const forma = document.getElementById("kontaktForma");
if (forma) {
    forma.addEventListener("submit", validirajFormu);
}

// Smooth scroll za bookmark navigaciju
document.querySelectorAll('a[href^="#"]').forEach(sidro => {
    sidro.addEventListener('click', function (e) {
        e.preventDefault(); // Spriječi trenutni skok

        const cilj = document.querySelector(this.getAttribute('href'));
        if (cilj) {
            cilj.scrollIntoView({
                behavior: 'smooth' // Ovo omogućava glatko kretanje
            });
        }
    });
});
