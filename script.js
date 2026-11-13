// ===================================
// 1. TYPING ROLE ANIMATION
// ===================================

const roles = [
    "Java Developer",
    "Web Developer",
    "Java and SQL Developer",
    "Computer Science Graduate"
];

const roleElement = document.getElementById("role");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    roleElement.textContent = currentRole.substring(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeRole, 85);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeRole, 40);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeRole, 1400);
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 300);
    }
}

typeRole();


// ===================================
// 2. REVEAL ELEMENTS ON SCROLL
// ===================================

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll("section, .stats").forEach(element => {
    revealObserver.observe(element);
});


// ===================================
// 3. SCROLL PROGRESS BAR
// ===================================

const progressBar = document.getElementById("bar");

function updateProgress() {
    const page = document.documentElement;

    const scrollableHeight =
        page.scrollHeight - page.clientHeight;

    const progress = scrollableHeight > 0 ?
        (page.scrollTop / scrollableHeight) * 100 :
        0;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
}

window.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);
updateProgress();


// ===================================
// 4. ACTIVE NAVIGATION LINK
// ===================================

const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let currentSection = "";

    pageSections.forEach(section => {
        if (section.getBoundingClientRect().top < 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "on",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// ===================================
// 5. MARQUEE INFINITE SCROLL
// ===================================

const track = document.querySelector(".track");

if (track) {
    track.innerHTML += track.innerHTML;
}


// ===================================
// 6. ANIMATED STATISTICS COUNTERS
// ===================================

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);

        entry.target.querySelectorAll("[data-c]").forEach(counter => {
            const target = Number(counter.dataset.c);
            const duration = 1400;
            const startTime = performance.now();

            function animateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const value = target * (1 - Math.pow(1 - progress, 3));

                counter.textContent = Number.isInteger(target) ?
                    Math.floor(value) :
                    value.toFixed(1);

                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(animateCounter);
        });
    });
}, {
    threshold: 0.4
});

document.querySelectorAll(".stats").forEach(element => {
    counterObserver.observe(element);
});


// ===================================
// 7. CARD SPOTLIGHT EFFECT
// ===================================

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--mx",
            event.clientX - rect.left + "px"
        );

        card.style.setProperty(
            "--my",
            event.clientY - rect.top + "px"
        );
    });
});


// ===================================
// 8. PHOTO PARALLAX EFFECT
// ===================================

const profilePhoto = document.querySelector(".photo img");

if (profilePhoto && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", event => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        profilePhoto.style.transform =
            `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });

    const photoContainer = document.querySelector(".photo");

    photoContainer.addEventListener("mouseleave", () => {
        profilePhoto.style.transform = "none";
    });
}


// ===================================
// 9. COLOUR THEME SWITCHER
// ===================================

const paletteButtons = document.querySelectorAll(".pal button");

paletteButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.body.dataset.theme = button.dataset.t;

        paletteButtons.forEach(item => {
            item.classList.toggle("on", item === button);
        });
    });
});


// ===================================
// 10. BACK TO TOP BUTTON
// ===================================

const topButton = document.getElementById("top");

window.addEventListener("scroll", () => {
    if (topButton) {
        topButton.classList.toggle("show", window.scrollY > 700);
    }
});

if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ===================================
// 11. AUTOMATIC FOOTER YEAR
// ===================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}