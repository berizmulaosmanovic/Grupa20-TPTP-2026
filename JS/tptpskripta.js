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

// VALIDACIJA FORME (Finalna verzija)
const forma = document.getElementById("kontaktForma");
if (forma) {
    forma.addEventListener("submit", function(event) {
        event.preventDefault();

        const polja = {
            ime: document.getElementById("ime"),
            prezime: document.getElementById("prezime"),
            email: document.getElementById("email"),
            telefon: document.getElementById("telefon"),
            poruka: document.getElementById("poruka")
        };

        let validno = true;

        // Očisti sve prethodne greške i stilove
        Object.values(polja).forEach(p => {
            if(p) {
                p.classList.remove("invalid"); // Briše crvenu klasu
                const errorSpan = document.getElementById(p.id + "Error");
                if(errorSpan) errorSpan.innerText = "";
            }
        });

        // 1. Validacija Imena
        if (polja.ime.value.trim().length < 2) {
            prikaziGresku("ime", "Ime mora imati barem 2 znaka!");
            validno = false;
        }

        // 2. Validacija Prezimena
        if (polja.prezime.value.trim().length < 2) {
            prikaziGresku("prezime", "Prezime mora imati barem 2 znaka!");
            validno = false;
        }

        // 3. Validacija Emaila (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(polja.email.value.trim())) {
            prikaziGresku("email", "Unesite ispravnu email adresu!");
            validno = false;
        }

        // 4. Validacija Telefona
const telefonVrijednost = polja.telefon.value.trim();
// Regex: dozvoljava + na početku i samo cifre (minimalno 6 cifara)
const telefonRegex = /^\+?[0-9]{6,}$/; 

if (!telefonRegex.test(telefonVrijednost)) {
    prikaziGresku("telefon", "Broj smije sadržavati samo cifre (min. 6)!");
    validno = false;
}

        // 5. Validacija Poruke
        if (polja.poruka.value.trim().length < 10) {
            prikaziGresku("poruka", "Poruka mora imati barem 10 znakova!");
            validno = false;
        }

        const statusPolje = document.getElementById("porukaStatus");
        if (validno) {
            statusPolje.innerText = "Uspješno poslano!";
            statusPolje.style.color = "#00ff00"; 
            forma.reset();
        } else {
            statusPolje.innerText = "Greška: Popunite polja ispravno.";
            statusPolje.style.color = "red";
        }
    });
}

function prikaziGresku(idPolja, poruka) {
    const el = document.getElementById(idPolja);
    el.classList.add("invalid"); // Dodaje klasu definisanu u CSS-u
    const errorSpan = document.getElementById(idPolja + "Error");
    if(errorSpan) {
        errorSpan.innerText = poruka;
        errorSpan.style.color = "red";
        errorSpan.style.fontSize = "0.7rem";
        errorSpan.style.display = "block";
    }
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
// Poruke koje se mijenjaju svakih 2 minute
const poruke = [
    { rank: "Novajlija",        boja: null,        sjena: null },
    { rank: "Istraživač",       boja: "var(--sekundarna-boja)", sjena: null },
    { rank: "Kolekcionar",      boja: "#ff6f61",   sjena: null },
    { rank: "Gaming Historian", boja: "#00ff00",   sjena: "0 0 10px #00ff00" },
    { rank: "Legenda!",         boja: "#ffd166",   sjena: "0 0 15px #ffd166" },
];

let trenutniIndex = 0;
const INTERVAL_MS = 2 * 60 * 1000; // 2 minute
const pocetak = Date.now();

window.onscroll = function() {
    izracunajXP();
};

function izracunajXP() {
    // Bar se puni na osnovu vremena (puni se za ukupno 8 minuta = svih 5 rankova)
    const ukupnoVrijeme = poruke.length * INTERVAL_MS; // 5 x 2min = 10min
    const proteklo = Date.now() - pocetak;
    const scrolled = Math.min(Math.round((proteklo / ukupnoVrijeme) * 100), 100);

    document.getElementById("xp-bar").style.width = scrolled + "%";
    document.getElementById("procenat-tekst").innerText = scrolled + "%";

    // Rank se mijenja na osnovu vremena
    const noviIndex = Math.min(
        Math.floor(proteklo / INTERVAL_MS),
        poruke.length - 1
    );

    if (noviIndex !== trenutniIndex) {
        trenutniIndex = noviIndex;
        const rank = document.getElementById("rank-tekst");
        const p = poruke[trenutniIndex];
        rank.innerText = p.rank;
        rank.style.color = p.boja || "";
        rank.style.textShadow = p.sjena || "";
    }
}

// Pozovi i bez scrolla da se rank odmah postavi
setInterval(izracunajXP, 1000); // Provjeri svakih 5s čak i bez scrolla
izracunajXP();
});
