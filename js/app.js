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

        music.play().catch(() => {});

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
            .querySelector(".countdown-section")
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
                    `translateX(${
                        scroll *
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

const confirmAttendance =
    document.getElementById(
        "confirmAttendance"
    );

if(confirmAttendance){

    confirmAttendance.addEventListener(
        "click",
        async () => {

            const names =
                document.getElementById(
                    "guestNames"
                ).value.trim();

            if(!names){

                alert(
                    "Por favor escribe tu nombre."
                );

                return;
            }

            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                ).value;

            const formURL =
                "https://docs.google.com/forms/d/e/1FAIpQLSdq3MiHJxZNzmvJNGin0tgNK5GL844JdcRE19gl-jRHpk1y1w/formResponse";

            const formData =
                new FormData();

            formData.append(
                "entry.1227858822",
                names
            );

            formData.append(
                "entry.868589647",
                attendance
            );

            try{

                await fetch(
                    formURL,
                    {
                        method:"POST",
                        mode:"no-cors",
                        body:formData
                    }
                );

                document.getElementById(
                    "successMessage"
                ).innerHTML =
                    "✅ ¡Gracias por confirmar tu asistencia!";

                document.getElementById(
                    "guestNames"
                ).value = "";

            }
            catch(error){

                alert(
                    "Ocurrió un error al enviar la información."
                );

            }

        }
    );

}

