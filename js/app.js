document.querySelectorAll(`
.parents-section,
.countdown-section,
.banner-section,
.event-info,
.gallery,
.final-section
`)
const eventDate = new Date(
    "August 22, 2026 15:00:00"
).getTime();

// ======================================
// ELEMENTOS
// ======================================

const welcomeScreen =
    document.getElementById("welcomeScreen");

const mainContent =
    document.getElementById("mainContent");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

const discoverBtn =
    document.querySelector(".btn-scroll");

const daysEl =
    document.getElementById("days");

const hoursEl =
    document.getElementById("hours");

const minutesEl =
    document.getElementById("minutes");

const secondsEl =
    document.getElementById("seconds");

// ======================================
// ABRIR INVITACIÓN
// ======================================

openInvitation.addEventListener(
    "click",
    () => {

        welcomeScreen.style.opacity = "0";

        setTimeout(() => {

            welcomeScreen.style.display =
                "none";

            mainContent.style.display =
                "block";

        }, 500);

        music.play().catch(() => { });

        launchConfetti();

    }
);

// ======================================
// BOTÓN DESCUBRIR
// ======================================

discoverBtn.addEventListener(
    "click",
    () => {

        document
            .querySelector(".event-info")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

// ======================================
// CONTROL DE MÚSICA
// ======================================

let isPlaying = true;

musicBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            music.pause();

            musicBtn.innerHTML = "🔇";

        } else {

            music.play();

            musicBtn.innerHTML = "🎵";

        }

        isPlaying = !isPlaying;

    }
);

// ======================================
// CUENTA REGRESIVA
// ======================================

function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        eventDate - now;

    if (distance <= 0) {

        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";

        return;
    }

    const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (
            distance %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (
            distance %
            (1000 * 60 * 60)
        ) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (
            distance %
            (1000 * 60)
        ) /
        1000
    );

    daysEl.innerHTML =
        String(days).padStart(2, "0");

    hoursEl.innerHTML =
        String(hours).padStart(2, "0");

    minutesEl.innerHTML =
        String(minutes).padStart(2, "0");

    secondsEl.innerHTML =
        String(seconds).padStart(2, "0");
}

setInterval(
    updateCountdown,
    1000
);

updateCountdown();

// ======================================
// CONFETI
// ======================================

function launchConfetti() {

    confetti({

        particleCount: 200,

        spread: 100,

        origin: {
            y: 0.6
        }

    });

}

// ======================================
// CONFETI EXTRA
// ======================================

setInterval(() => {

    if (
        welcomeScreen.style.display ===
        "none"
    ) {

        confetti({

            particleCount: 15,

            spread: 70,

            startVelocity: 20,

            origin: {
                x: Math.random(),
                y: Math.random() * 0.5
            }

        });

    }

}, 12000);

// ======================================
// DESTELLOS
// ======================================

setInterval(() => {

    if (
        welcomeScreen.style.display !==
        "none"
    ) return;

    const star =
        document.createElement("div");

    star.innerHTML = "✨";

    star.style.position = "fixed";

    star.style.left =
        Math.random() *
        window.innerWidth +
        "px";

    star.style.top =
        Math.random() *
        window.innerHeight +
        "px";

    star.style.fontSize = "22px";

    star.style.pointerEvents =
        "none";

    star.style.zIndex = "999";

    star.style.opacity = "0";

    star.style.transition =
        "all 1s ease";

    document.body.appendChild(
        star
    );

    setTimeout(() => {

        star.style.opacity = "1";

    }, 50);

    setTimeout(() => {

        star.style.opacity = "0";

    }, 1500);

    setTimeout(() => {

        star.remove();

    }, 2500);

}, 1500);

// ======================================
// EFECTO PARALLAX SUAVE
// ======================================

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        document
            .querySelectorAll(".cloud")
            .forEach((cloud, index) => {

                cloud.style.transform =
                    `translateX(${scroll *
                    (
                        0.05 +
                        index * 0.02
                    )
                    }px)`;

            });

    }
);

// ======================================
// APARICIÓN SUAVE
// ======================================

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );

document
    .querySelectorAll(
        `
.countdown-section,
.banner-section,
.event-info,
.actions,
.gallery,
.final-section
`
    )
    .forEach(section => {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(40px)";

        section.style.transition =
            "all .8s ease";

        observer.observe(section);

    });
    
    // ======================================
// CONFIGURACIÓN DE LA INVITACIÓN
// ======================================

const MAX_BOLETOS = 2;

const attendanceQuantity =
    document.getElementById(
        "attendanceQuantity"
    );

const confirmAttendance =
    document.getElementById(
        "confirmAttendance"
    );

// ======================================
// LLENAR SELECT AUTOMÁTICAMENTE
// ======================================

let opciones = "";

for (
    let i = MAX_BOLETOS;
    i >= 1;
    i--
) {

    opciones += `
        <option value="${i}">
            ${i}
        </option>
    `;

}

attendanceQuantity.innerHTML =
    opciones;

// ======================================
// CONFIRMAR ASISTENCIA
// ======================================

if (confirmAttendance) {

    confirmAttendance.addEventListener(
        "click",
        async () => {

            const nombre =
                document.getElementById(
                    "guestName"
                ).value.trim();

            if (!nombre) {

                alert(
                    "Por favor escribe tu nombre."
                );

                return;

            }

            const boletos =
                attendanceQuantity.value;

            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                ).value;

            const formURL =
                "https://docs.google.com/forms/d/e/1FAIpQLSdq3MiHJxZNzmvJNGin0tgNK5GL844JdcRE19gl-jRHpk1y1w/formResponse";

            const formData =
                new FormData();

            // Nombre

            formData.append(
                "entry.1227858822",
                nombre
            );

            // Asistencia

            formData.append(
                "entry.868589647",
                attendance
            );

            // Número de boletos

            formData.append(
                "entry.716004991",
                boletos
            );

            try {

                await fetch(
                    formURL,
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    }
                );

                document.getElementById(
                    "successMessage"
                ).innerHTML =
                    attendance === "Si asistire"
                        ? "💗 ¡Gracias por confirmar tu asistencia!"
                        : "💛 Gracias por avisarnos. Te extrañaremos y esperamos verte pronto.";

                document.getElementById(
                    "guestName"
                ).value = "";

            }
            catch (error) {

                console.error(error);

                document.getElementById(
                    "successMessage"
                ).innerHTML =
                    "✅ Información enviada.";

            }

        }
    );

}
    

const swiper = new Swiper(".mySwiper", {

    effect: "coverflow",

    centeredSlides: true,

    slidesPerView: 3,

    loop: true,
loopAdditionalSlides: 6,
    observer: true,

    observeParents: true,

    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },

    coverflowEffect: {
        rotate: 0,
        stretch: -20,
        depth: 120,
        modifier: 1,
        scale: 0.9,
        slideShadows: false
    }

});


