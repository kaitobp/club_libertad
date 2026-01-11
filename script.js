// --- CLUB LIBERTAD - CORE LOGIC ---

// Mock Data for Matches
const matchData = {
    proximas: [
        {
            id: 1,
            fecha: "Lunes 12 Ene",
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
            fecha: "Viernes 16 Ene",
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
            fecha: "Viernes 09 Ene",
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
        { nombre: "Carlos Ruiz", fecha: "12 Ene", emoji: "🏐" },
        { nombre: "Mario G.", fecha: "15 Ene", emoji: "👕" },
        { nombre: "Juan Perez", fecha: "22 Ene", emoji: "🔥" },
        { nombre: "Andre S.", fecha: "28 Ene", emoji: "💪" }
    ],
    nextMonth: [
        { nombre: "Luis P.", fecha: "05 Feb", emoji: "👟" },
        { nombre: "Santi M.", fecha: "14 Feb", emoji: "❤️" },
        { nombre: "Alex B.", fecha: "21 Feb", emoji: "⚡" }
    ]
};

// Initialize the Page
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    renderMatches();
    renderBirthdays();
});

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
                        <div class="row align-items-center mb-4">
                            <div class="col-5">
                                <div class="team-badge">E1</div>
                                <h6 class="team-name">Equipo 1</h6>
                            </div>
                            <div class="col-2">
                                <div class="vs-badge fw-bold">${match.resultado}</div>
                            </div>
                            <div class="col-5">
                                <div class="team-badge">E2</div>
                                <h6 class="team-name">Equipo 2</h6>
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
    if (modalTitle) modalTitle.innerText = isPast ? `Resumen - ${match.fecha}` : `Inscritos - ${match.fecha}`;

    if (modalBody) {
        if (isPast) {
            modalBody.innerHTML = `
                <div class="row g-4 mb-2">
                    <div class="col-md-6">
                        <div class="p-4 player-card-bg rounded-4 h-100 shadow-sm">
                            <h5 class="text-navy fw-extrabold mb-4 border-bottom border-primary border-opacity-10 pb-2">EQUIPO 1</h5>
                            <ul class="player-list">
                                ${match.equipoA.jugadores.map((p, i) => `
                                    <li class="player-item">
                                        <span class="player-number text-accent-blue fw-bold">${i + 1}</span>
                                        <span class="fw-semibold">${p}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-4 player-card-bg rounded-4 h-100 shadow-sm">
                            <h5 class="text-navy fw-extrabold mb-4 border-bottom border-primary border-opacity-10 pb-2">EQUIPO 2</h5>
                            <ul class="player-list">
                                ${match.equipoB.jugadores.map((p, i) => `
                                    <li class="player-item">
                                        <span class="player-number text-accent-blue fw-bold">${i + 1}</span>
                                        <span class="fw-semibold">${p}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                ${match.sets ? `
                    <div class="sets-container mt-4 p-4 rounded-4 shadow-lg">
                        <h6 class="text-white fw-bold text-center mb-4 opacity-75">SCOREBOARD OFICIAL</h6>
                        <div class="d-flex justify-content-center gap-4">
                            ${match.sets.map((score, i) => `
                                <div class="set-score text-center">
                                    <small class="d-block text-white text-opacity-50 mb-1">SET ${i + 1}</small>
                                    <span class="score-text fw-bold">${score}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
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
