// --- CLUB LIBERTAD - CORE LOGIC ---

// Mock Data for Matches
const matchData = {
    proximas: [
        {
            id: 1,
            fecha: "Lunes 12 Enero",
            hora: "7:00 PM",
            lugar: "Cancha Principal",
            equipoA: {
                nombre: "Titanes",
                jugadores: ["Carlos Ruiz", "Mario G.", "Luis P.", "Andre S.", "Roberto F.", "Santi M."]
            },
            equipoB: {
                nombre: "Libertad A",
                jugadores: ["Juan Perez", "Diego M.", "Felipe R.", "Kevin L.", "Alex B.", "Hugo T."]
            }
        },
        {
            id: 2,
            fecha: "Viernes 16 Enero",
            hora: "7:00 PM",
            lugar: "Cancha Principal",
            equipoA: {
                nombre: "Rayo Azul",
                jugadores: ["Henry", "Raul S.", "Tito J.", "Nico W.", "Fabio Q.", "Jose M."]
            },
            equipoB: {
                nombre: "Libertad B",
                jugadores: ["Marcos D.", "Dani V.", "Seba C.", "Ivan G.", "Lucas N.", "Mateo R."]
            }
        }
    ],
    pasadas: [
        {
            id: 101,
            fecha: "Viernes 09 Enero",
            resultado: "2 - 1",
            sets: ["25-22", "19-25", "15-12"],
            equipoA: {
                nombre: "Libertad A",
                jugadores: ["Jordan B.", "Chris P.", "Matt D.", "Steve G.", "Tony S.", "Bruce W."]
            },
            equipoB: {
                nombre: "Halcones",
                jugadores: ["Clark K.", "Barry A.", "Arthur C.", "Victor S.", "Oliver Q.", "Dick G."]
            }
        }
    ]
};

// Birthday Data
const birthdayData = {
    thisMonth: [
        { nombre: "Carlos Ruiz", fecha: "12 Enero", emoji: "🏐" },
        { nombre: "Mario G.", fecha: "15 Enero", emoji: "👕" },
        { nombre: "Juan Perez", fecha: "22 Enero", emoji: "🔥" },
        { nombre: "Andre S.", fecha: "28 Enero", emoji: "💪" }
    ],
    nextMonth: [
        { nombre: "Luis P.", fecha: "05 Febrero", emoji: "👟" },
        { nombre: "Santi M.", fecha: "14 Febrero", emoji: "❤️" },
        { nombre: "Alex B.", fecha: "21 Febrero", emoji: "⚡" }
    ]
};

// Initialize the Page
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    renderMatches();
    renderBirthdays();
    initHeroVideo();
});

// Force Video Playback for Mobile/Windows
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    if (video) {
        // Double ensure it's muted (some browsers require this via JS)
        video.muted = true;

        // Attempt to play
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                console.log("Video playing automatically");
            }).catch(error => {
                // Autoplay was prevented
                console.log("Autoplay prevented, waiting for interaction");
                // We can add a one-time listener to the body to play on first touch/click
                document.body.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }
    }
}

// Render Birthdays
function renderBirthdays() {
    const thisMonthContainer = document.getElementById('birthday-container-this');
    const nextMonthContainer = document.getElementById('birthday-container-next');

    if (thisMonthContainer) {
        birthdayData.thisMonth.forEach(person => {
            thisMonthContainer.innerHTML += createBirthdayCard(person);
        });
    }

    if (nextMonthContainer) {
        birthdayData.nextMonth.forEach(person => {
            nextMonthContainer.innerHTML += createBirthdayCard(person);
        });
    }
}

function createBirthdayCard(person) {
    return `
        <div class="birthday-card">
            <div class="bday-avatar-wrapper">
                <div class="bday-avatar">${person.emoji}</div>
                <div class="bday-crown">👑</div>
            </div>
            <h5 class="bday-name">${person.nombre}</h5>
            <span class="bday-date">${person.fecha}</span>
            <div class="bday-decoration">🎉</div>
        </div>
    `;
}

// Navbar Scroll Effect
function initNavbar() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Render Match Cards
function renderMatches() {
    const nextContainer = document.getElementById('next-dates-container');
    const pastContainer = document.getElementById('past-dates-container');

    if (nextContainer) {
        matchData.proximas.forEach(match => {
            nextContainer.innerHTML += createMatchCard(match, 'proxima');
        });
    }

    if (pastContainer) {
        matchData.pasadas.forEach(match => {
            pastContainer.innerHTML += createMatchCard(match, 'pasada');
        });
    }
}

function createMatchCard(match, type) {
    const isPast = type === 'pasada';
    return `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
            <div class="match-card h-100">
                <div class="match-header">
                    <div class="mb-2">
                        <span class="badge bg-accent text-dark-blue px-3 py-2 fs-5 fw-bold">${match.fecha}</span>
                    </div>
                    <h5 class="mb-0 fw-bold opacity-75">${isPast ? 'FINALIZADO' : match.hora}</h5>
                </div>
                <div class="match-body text-center">
                    ${!isPast ? `
                        <div class="py-4">
                            <h6 class="fw-bold mb-2">12 JUGADORES CONFIRMADOS</h6>
                            <p class="text-muted small">Los equipos se definirán en la cancha</p>
                        </div>
                    ` : `
                        <div class="py-4 match-past-score-container">
                            <h6 class="fw-bold mb-1 text-uppercase letter-spacing-1 opacity-50">Score Final</h6>
                            <div class="match-score-display">
                                ${match.resultado}
                            </div>
                            <div class="d-flex justify-content-center gap-3 mt-2 flex-wrap">
                                <span class="badge bg-light text-dark border fw-medium">Equipo 1</span>
                                <span class="text-muted fw-bold">vs</span>
                                <span class="badge bg-light text-dark border fw-medium">Equipo 2</span>
                            </div>
                        </div>
                    `}
                    <button class="btn btn-primary btn-sm rounded-pill px-4" 
                        onclick="showDetails(${match.id}, '${type}')">
                        ${isPast ? 'Ver Lista de Equipos' : 'Ver Lista de Inscritos'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show Modal Details
window.showDetails = function (id, type) {
    const list = type === 'proxima' ? matchData.proximas : matchData.pasadas;
    const match = list.find(m => m.id === id);

    if (!match) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const isPast = type === 'pasada';
    if (modalTitle) modalTitle.innerText = isPast ? `${match.fecha}` : `Inscritos — ${match.fecha}`;

    if (modalBody) {
        if (isPast) {
            modalBody.innerHTML = `
                <div class="result-summary-banner mb-4 p-3 rounded-4 text-center">
                    <span class="text-uppercase letter-spacing-2 small opacity-75 d-block mb-1">Resultado Final</span>
                    <div class="display-4 fw-black mb-0">${match.resultado}</div>
                </div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="player-card-container">
                            <div class="team-header-pill team-1">EQUIPO 1</div>
                            <div class="p-4 player-card-bg rounded-4 h-100 shadow-sm">
                                <ul class="player-list mt-2">
                                    ${match.equipoA.jugadores.map((p, i) => `
                                        <li class="player-item">
                                            <div class="player-dot"></div>
                                            <span class="fw-semibold">${p}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="player-card-container">
                            <div class="team-header-pill team-2">EQUIPO 2</div>
                            <div class="p-4 player-card-bg rounded-4 h-100 shadow-sm">
                                <ul class="player-list mt-2">
                                    ${match.equipoB.jugadores.map((p, i) => `
                                        <li class="player-item">
                                            <div class="player-dot"></div>
                                            <span class="fw-semibold">${p}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const allPlayers = [...match.equipoA.jugadores, ...match.equipoB.jugadores];
            modalBody.innerHTML = `
                <div class="p-4 player-card-bg rounded-4 shadow-sm">
                    <h5 class="text-navy fw-extrabold mb-4 border-bottom border-primary border-opacity-10 pb-2 text-center text-uppercase">Convocados Confirmados</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="player-list">
                                ${allPlayers.slice(0, 6).map((p, i) => `
                                    <li class="player-item">
                                        <span class="player-number text-accent-blue fw-bold">${i + 1}</span>
                                        <span class="fw-semibold">${p}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="player-list">
                                ${allPlayers.slice(6, 12).map((p, i) => `
                                    <li class="player-item">
                                        <span class="player-number text-accent-blue fw-bold">${i + 7}</span>
                                        <span class="fw-semibold">${p}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="mt-4 p-3 bg-light rounded-3 text-center">
                        <p class="mb-0 small text-muted"><i class="bi bi-info-circle me-1"></i> Los equipos se sortearán minutos antes de iniciar el juego.</p>
                    </div>
                </div>
            `;
        }
    }

    const myModal = new bootstrap.Modal(document.getElementById('teamModal'));
    myModal.show();
};

// Jersey Carousel Logic
window.toggleJersey = function () {
    currentJersey = currentJersey === 1 ? 2 : 1;
    switchJersey(currentJersey);
};

window.switchJersey = function (id) {
    const items = document.querySelectorAll('.jersey-item');
    items.forEach(item => item.classList.remove('active'));

    const target = document.getElementById(`jersey-${id}`);
    if (target) target.classList.add('active');
    currentJersey = id; // Ensure state is synced
};

// Auto Carousel
let currentJersey = 1;
setInterval(() => {
    currentJersey = currentJersey === 1 ? 2 : 1;
    switchJersey(currentJersey);
}, 5000);
