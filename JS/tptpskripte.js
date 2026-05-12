document.addEventListener("DOMContentLoaded", () => {
    const prekidac = document.getElementById("dugme");
    const tijelo = document.body;

    const ucitajMod = () => {
        const trenutnimod = localStorage.getItem("nightMode");
        
        if (trenutnimod === "true") {
            tijelo.classList.add("dark-mode");
            if (prekidac) {
                prekidac.innerText = "Day Mode";
            }
        } else {
            tijelo.classList.remove("dark-mode");
            if (prekidac) {
                prekidac.innerText = "Night Mode";
            }
        }
    };

    const toggleNightMode = () => {
      tijelo.classList.toggle("dark-mode");
        const jeDark = tijelo.classList.contains("dark-mode");
        localStorage.setItem("nightMode", jeDark ? "true" : "false");

        if (prekidac) {
            prekidac.innerText = jeDark ? "Day Mode" : "Night Mode";
        }
    };

    if (prekidac) {
        prekidac.addEventListener("click", toggleNightMode);
    }

    ucitajMod();

    // FILTRIRANJE KARTICA
    function filtriraj(kategorija) {
        const sveKartice = document.querySelectorAll(".kartica");
        sveKartice.forEach(kartica => {
            // Provjeravamo klasu ili data-kategoriju
            const kat = kartica.getAttribute("data-kategorija");
            if (kategorija === "sve" || kat === kategorija) {
                kartica.style.display = "block";
            } else {
                kartica.style.display = "none";
            }
        });
    }

    // Povezivanje filter dugmadi iz HTML-a
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const kat = btn.getAttribute('data-kategorija');
            filtriraj(kat);
        });
    });

    // TAJMER
    function azurirajTimer() {
        const pocetnidatum = new Date("October 29, 1972").getTime();
        const sada = new Date().getTime();
        const razlika = sada - pocetnidatum;
        
        const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));
        const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minute = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
        const sekundi = Math.floor((razlika % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerText = `${dani}d ${sati}h ${minute}m ${sekundi}s`;
        }
    }
    setInterval(azurirajTimer, 1000);
    azurirajTimer();

    // VALIDACIJA FORME
    const forma = document.getElementById("kontaktForma");
    if (forma) {
        forma.addEventListener("submit", function(event) {
            event.preventDefault();
            const ime = document.getElementById("ime").value.trim();
            const email = document.getElementById("email").value.trim();
            const poruka = document.getElementById("poruka").value.trim();
            const statusPolje = document.getElementById("porukaStatus");

            if (ime.length < 2 || !email.includes("@") || poruka.length < 10) {
                statusPolje.innerText = "Greška: Provjerite sva polja!";
                statusPolje.style.color = "red";
            } else {
                statusPolje.innerText = "Uspješno poslano!";
                statusPolje.style.color = "green";
                forma.reset();
            }
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(sidro => {
        sidro.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const cilj = document.querySelector(targetId);
            if (cilj) {
                e.preventDefault();
                cilj.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
