const VIDEO_JSON_URL = 'https://wartakita.github.io/minton.github.io/video.json';
const matchesContainer = document.getElementById('matches');
const statusDiv = document.getElementById('status');
const filterSelect = document.getElementById('filterType');
const statusFilter = document.getElementById('filterStatus');
const searchInput = document.getElementById('searchPlayer');
const resetBtn = document.getElementById('resetBtn');
const dateInput = document.getElementById('filterDate');
const timezoneSelect = document.getElementById('timezoneSelect');
let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let videoLinks = {};
let allMatches = [];
let currentDate = new Date().toISOString().split('T')[0];
dateInput.value = currentDate;

Intl.supportedValuesOf('timeZone').forEach(tz => {
  const opt = document.createElement('option');
  opt.value = tz;
  opt.textContent = tz;
  if (tz === selectedTimezone) opt.selected = true;
  timezoneSelect.appendChild(opt);
});

timezoneSelect.addEventListener('change', () => {
  selectedTimezone = timezoneSelect.value;
  renderMatches(allMatches);
});

function notify(message) {
  if (Notification.permission === 'granted') {
    new Notification('PecintaMinton', { body: message });
  }
}
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

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
  const API_URL = `https://extranet-lv.bwfbadminton.com/api/tournaments/day-matches?tournamentCode=2B01A412-B4FA-4839-B3ED-3B067519CEB1&date=${date}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Gagal memuat data pertandingan');
    return await response.json();
  } catch (err) {
    throw err;
  }
}

function normalizeStatus(value) {
  if (!value) return '';
  const val = value.toLowerCase();
  if (val.includes('completed')) return 'Completed';
  if (val.includes('running')) return 'Running';
  if (val.includes('not started')) return 'Not Started';
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
  team.players.forEach(p => div.appendChild(createPlayerElement(p)));
  return div;
}

function formatScore(scores) {
  if (!scores || scores.length === 0) return 'Belum ada skor';
  return scores.map(s => `Set ${s.set}: ${s.home} - ${s.away}`).join(' | ');
}

function createMatchElement(match) {
  const localTime = new Date(match.matchTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: selectedTimezone });
  const el = document.createElement('div');
  el.className = 'match-container';
  el.innerHTML = `
    <div class="match-header">
      <div><strong>Waktu:</strong> ${localTime}</div>
      <div><strong>Status:</strong> ${match.matchStatusValue}</div>
      <div><strong>Round:</strong> ${match.roundName}</div>
    </div>`;
  const teams = document.createElement('div');
  teams.className = 'teams';
  teams.appendChild(createTeamElement(match.team1, match.team1seed));
  teams.appendChild(createTeamElement(match.team2, match.team2seed));
  el.appendChild(teams);
  const score = document.createElement('div');
  score.className = 'score';
  score.textContent = `Skor: ${formatScore(match.score)}`;
  el.appendChild(score);
  const info = document.createElement('div');
  info.className = 'match-info';
  info.innerHTML = `
    <div><strong>Turnamen:</strong> ${match.tournamentName}</div>
    <div><strong>Jenis:</strong> ${match.matchTypeValue}</div>
    <div><strong>Lokasi:</strong> ${match.locationName} - ${match.courtName}</div>
    <div><strong>Durasi:</strong> ${match.duration || '-'} menit</div>`;
  el.appendChild(info);
  const watch = document.createElement('button');
  watch.className = 'watch-btn';
  watch.textContent = 'Tonton';
  watch.onclick = () => {
    const link = videoLinks[match.id];
    if (link) window.open(link, '_blank');
    else alert('Video belum tersedia.');
  };
  el.appendChild(watch);

  const detailBtn = document.createElement('button');
  detailBtn.className = 'watch-btn';
  detailBtn.style.marginLeft = '10px';
  detailBtn.textContent = 'Detail';
  detailBtn.onclick = () => showDetailModal(match);
  el.appendChild(detailBtn);
  return el;
}

function renderMatches(matches) {
  matchesContainer.innerHTML = '';
  if (!matches.length) {
    const msg = document.createElement('div');
    msg.className = 'error';
    msg.textContent = 'Tidak ada pertandingan ditemukan.';
    matchesContainer.appendChild(msg);
    return;
  }
  matches.forEach(m => matchesContainer.appendChild(createMatchElement(m)));
}

function applyFilters() {
  const type = filterSelect.value;
  const status = statusFilter.value;
  const keyword = searchInput.value.toLowerCase();
  const filtered = allMatches.filter(m => {
    const typeMatch = !type || m.matchTypeValue === type;
    const statusMatch = !status || normalizeStatus(m.matchStatusValue) === status;
    const playerNames = [...m.team1.players, ...m.team2.players].map(p => p.nameDisplay.toLowerCase()).join(' ');
    return typeMatch && statusMatch && (!keyword || playerNames.includes(keyword));
  });
  renderMatches(filtered);
}

filterSelect.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
dateInput.addEventListener('change', async () => {
  statusDiv.textContent = 'Memuat ulang...';
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

let lastMatchCount = 0;
async function updateMatchesLoop() {
  try {
    const updated = await loadMatches(currentDate);
    if (updated.length !== lastMatchCount) {
      notify(`${updated.length - lastMatchCount} pembaruan pertandingan.`);
      lastMatchCount = updated.length;
    }
    allMatches = updated;
    applyFilters();
  } catch (err) {
    console.warn('Gagal update:', err);
  }
}

async function init() {
  statusDiv.textContent = 'Memuat video & data...';
  await loadVideoLinks();
  allMatches = await loadMatches(currentDate);
  lastMatchCount = allMatches.length;
  statusDiv.style.display = 'none';
  renderMatches(allMatches);
  setInterval(updateMatchesLoop, 30000);
}

window.addEventListener('DOMContentLoaded', init);
