const VIDEO_JSON_URL = 'https://wartakita.github.io/minton.github.io/video.json';
const matchesContainer = document.getElementById('matches');
const statusDiv = document.getElementById('status');
const filterSelect = document.getElementById('filterType');
const statusFilter = document.getElementById('filterStatus');
const searchInput = document.getElementById('searchPlayer');
const resetBtn = document.getElementById('resetBtn');
const dateInput = document.getElementById('filterDate');

let videoLinks = {};
let allMatches = [];
let currentDate = new Date().toISOString().split('T')[0];
dateInput.value = currentDate;

async function loadVideoLinks() {
    try {
        const response = await fetch(VIDEO_JSON_URL);
        if (!response.ok) throw new Error('Gagal memuat file video JSON');
        videoLinks = await response.json();
    } catch (error) {
        console.warn('Tidak dapat memuat video JSON:', error);
        videoLinks = {};
    }
}

async function loadMatches(date) {
    const API_URL = `https://extranet-lv.bwfbadminton.com/api/tournaments/day-matches?tournamentCode=294DE888-25E7-4633-A28B-03825F250F61&date=${date}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal memuat data pertandingan dari API');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

function normalizeStatus(value) {
    if (!value) return '';
    const val = value.toLowerCase();
    if (val.includes('completed') || val.includes('finished') || val.includes('done')) return 'Completed';
    if (val.includes('running') || val.includes('in progress')) return 'Running';
    if (val.includes('not started') || val.includes('scheduled') || val.includes('upcoming')) return 'Not Started';
    return value;
}

function createPlayerElement(player) {
    const div = document.createElement('div');
    div.className = 'player';
    div.innerHTML = `<img src="${player.avatar?.thumbnailUrl || 'https://via.placeholder.com/30'}" alt="${player.nameDisplay}" title="${player.nameDisplay}"><span>${player.nameDisplay}</span>`;
    return div;
}

function createTeamElement(team, seed) {
    const div = document.createElement('div');
    div.className = 'team';
    div.innerHTML = `<h3><img src="${team.countryFlagUrl}" alt="${team.countryCode}" title="${team.countryCode}" width="24" height="24" style="border-radius:50%; margin-right:6px;">${team.countryCode} ${seed ? `(Seed: ${seed})` : ''}</h3>`;
    team.players.forEach(player => div.appendChild(createPlayerElement(player)));
    return div;
}

function formatScore(scoreArray) {
    if (!scoreArray || scoreArray.length === 0) return 'Belum ada skor';
    return scoreArray.map(set => `Set ${set.set}: ${set.home} - ${set.away}`).join(' | ');
}

function createMatchElement(match) {
    const container = document.createElement('div');
    container.className = 'match-container';
    container.innerHTML = `
    <div class="match-header">
      <div><strong>Waktu:</strong> ${new Date(match.matchTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</div>
      <div><strong>Status:</strong> ${match.matchStatusValue}</div>
      <div><strong>Round:</strong> ${match.roundName}</div>
    </div>
  `;
    const teamsDiv = document.createElement('div');
    teamsDiv.className = 'teams';
    teamsDiv.appendChild(createTeamElement(match.team1, match.team1seed));
    teamsDiv.appendChild(createTeamElement(match.team2, match.team2seed));
    container.appendChild(teamsDiv);
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'score';
    scoreDiv.textContent = `Skor: ${formatScore(match.score)}`;
    container.appendChild(scoreDiv);
    const infoDiv = document.createElement('div');
    infoDiv.className = 'match-info';
    infoDiv.innerHTML = `
    <div><strong>Turnamen:</strong> ${match.tournamentName}</div>
    <div><strong>Jenis Pertandingan:</strong> ${match.matchTypeValue}</div>
    <div><strong>Lokasi:</strong> ${match.locationName} - ${match.courtName}</div>
    <div><strong>Durasi:</strong> ${match.duration ? match.duration + ' menit' : '-'}</div>
  `;
    container.appendChild(infoDiv);
    const watchBtn = document.createElement('button');
    watchBtn.className = 'watch-btn';
    watchBtn.textContent = 'Tonton';
    watchBtn.onclick = () => {
        const videoUrl = videoLinks[match.id];
        if (videoUrl) window.open(videoUrl, '_blank');
        else alert('Video untuk pertandingan ini belum tersedia.');
    };
    container.appendChild(watchBtn);
    return container;
}

function renderMatches(matches) {
    matchesContainer.innerHTML = '';
    matches.forEach(match => matchesContainer.appendChild(createMatchElement(match)));
}

function applyFilters() {
    const selectedType = filterSelect.value;
    const selectedStatus = statusFilter.value;
    const keyword = searchInput.value.toLowerCase();

    const filtered = allMatches.filter(match => {
        const typeMatch = !selectedType || match.matchTypeValue === selectedType;
        const statusMatch = !selectedStatus || normalizeStatus(match.matchStatusValue) === selectedStatus;
        const playerNames = [...match.team1.players, ...match.team2.players].map(p => p.nameDisplay.toLowerCase()).join(' ');
        const nameMatch = !keyword || playerNames.includes(keyword);
        return typeMatch && statusMatch && nameMatch;
    });

    renderMatches(filtered);
}

filterSelect.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
dateInput.addEventListener('change', async () => {
    statusDiv.innerHTML = '<div class="spinner"></div><div>Memuat data pertandingan...</div>';
    currentDate = dateInput.value;
    allMatches = await loadMatches(currentDate);
    renderMatches(allMatches);
});

resetBtn.addEventListener('click', async () => {
    filterSelect.value = '';
    statusFilter.value = '';
    searchInput.value = '';
    dateInput.value = currentDate;
    allMatches = await loadMatches(currentDate);
    renderMatches(allMatches);
});

async function init() {
    try {
        statusDiv.innerHTML = '<div class="spinner"></div><div>Memuat data video...</div>';
        await loadVideoLinks();
        statusDiv.textContent = 'Memuat data pertandingan...';
        allMatches = await loadMatches(currentDate);
        if (!allMatches || allMatches.length === 0) {
            statusDiv.textContent = 'Tidak ada data pertandingan untuk tanggal ini.';
            return;
        }
        statusDiv.style.display = 'none';
        renderMatches(allMatches);

        // Real-time update tiap 1 menit
        setInterval(async () => {
            try {
                const updatedMatches = await loadMatches(currentDate);
                if (updatedMatches && updatedMatches.length > 0) {
                    allMatches = updatedMatches;
                    applyFilters();
                }
            } catch (err) {
                console.warn('Gagal memperbarui data pertandingan:', err);
            }
        }, 30000);
    } catch (error) {
        statusDiv.className = 'error';
        statusDiv.textContent = 'Terjadi kesalahan saat memuat data: ' + error.message;
    }
}

window.addEventListener('DOMContentLoaded', init);
