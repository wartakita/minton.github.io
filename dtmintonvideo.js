let allMatches = [];
let watchLinks = {};
let selectedDate = new Date().toISOString().split('T')[0];
document.getElementById('dateFilter').value = selectedDate;

function getApiUrl(date) {
    return `https://extranet-lv.bwfbadminton.com/api/tournaments/day-matches?tournamentCode=2B01A412-B4FA-4839-B3ED-3B067519CEB1&date=${date}`;
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function createPlayerHTML(player) {
    return `
        <div class="player" title="${player.avatar?.title || player.nameDisplay}">
          <img src="${player.avatar?.thumbnailUrl || 'https://via.placeholder.com/40'}" alt="${player.nameDisplay}" />
          <div>
            <div><strong>${player.nameDisplay}</strong></div>
            <div style="font-size: 0.8rem; color: #555;">
              <img src="${player.countryFlagUrl}" alt="${player.countryCode}" class="flag" style="width:16px; height:16px; vertical-align:middle; margin-right:4px;" />
              ${player.countryCode}
            </div>
          </div>
        </div>
      `;
}

function createTeamHTML(team) {
    const playersHTML = team.players.map(createPlayerHTML).join('');
    return `
        <div class="team">
          <div class="team-header">
            <img src="${team.countryFlagUrl}" alt="${team.countryCode}" class="flag" />
            <strong>${team.countryCode}</strong>
          </div>
          <div class="players">${playersHTML}</div>
        </div>
      `;
}

function createScoreTable(score) {
    if (!score || score.length === 0) return '<p>Tidak ada skor tersedia</p>';
    let rows = score.map(set => `
        <tr>
          <td>Set ${set.set}</td>
          <td>${set.home}</td>
          <td>${set.away}</td>
        </tr>
      `).join('');
    return `
        <table class="scoreboard">
          <thead>
            <tr>
              <th>Set</th>
              <th>Tim 1</th>
              <th>Tim 2</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      `;
}

function renderMatches(matches) {
    const container = document.getElementById('matches-container');
    container.innerHTML = matches.map(match => {
        const watchLink = watchLinks[match.id];
        return `
          <article class="match-card">
            <div class="tournament-name">${match.tournamentName}</div>
            <div class="match-info">
              <div><strong>Waktu:</strong> ${formatTime(match.matchTime)}</div>
              <div><strong>Status:</strong> <span class="status">${match.matchStatusValue}</span></div>
              <div><strong>Jenis:</strong> ${match.matchTypeValue}</div>
              <div><strong>Lapangan:</strong> ${match.courtName}</div>
              <div><strong>Babak:</strong> ${match.roundName}</div>
            </div>
            <div class="teams">
              ${createTeamHTML(match.team1)}
              ${createTeamHTML(match.team2)}
            </div>
            <div style="margin-top: 15px;">
              <h4>Skor:</h4>
              ${createScoreTable(match.score)}
              ${watchLink ? `<a href="${watchLink}" class="watch-button" target="_blank">Tonton</a>` : ''}
            </div>
          </article>
        `;
    }).join('');
}

function updateFilters() {
    const status = document.getElementById('statusFilter').value;
    const country = document.getElementById('countryFilter').value;
    const keyword = document.getElementById('playerSearch').value.toLowerCase();
    const filtered = allMatches.filter(match => {
        const matchCountries = [match.team1.countryCode, match.team2.countryCode];
        const allPlayers = [...match.team1.players, ...match.team2.players];
        const playerMatch = keyword === '' || allPlayers.some(p => p.nameDisplay.toLowerCase().includes(keyword));
        return (!status || match.matchStatusValue === status) &&
            (!country || matchCountries.includes(country)) &&
            playerMatch;
    });
    renderMatches(filtered);
}

async function loadWatchLinks() {
    try {
        const res = await fetch('https://wartakita.github.io/minton.github.io/watch_links.json');
        if (!res.ok) throw new Error('Gagal memuat watch_links.json');
        watchLinks = await res.json();
    } catch (e) {
        console.error(e);
    }
}

async function loadMatches(date) {
    try {
        const response = await fetch(getApiUrl(date));
        if (!response.ok) throw new Error('Gagal mengambil data API');
        const matches = await response.json();
        allMatches = matches;
        renderMatches(allMatches);

        const statusFilter = document.getElementById('statusFilter');
        const statusValues = [...new Set(matches.map(m => m.matchStatusValue).filter(Boolean))];
        statusFilter.innerHTML = '<option value="">Semua Status</option>';
        statusValues.sort().forEach(status => {
            const opt = document.createElement('option');
            opt.value = status;
            opt.textContent = status;
            statusFilter.appendChild(opt);
        });

        const countries = [...new Set(matches.flatMap(m => [m.team1.countryCode, m.team2.countryCode]))];
        const countryFilter = document.getElementById('countryFilter');
        countryFilter.innerHTML = '<option value="">Semua Negara</option>';
        countries.sort().forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = code;
            countryFilter.appendChild(opt);
        });
    } catch (error) {
        document.getElementById('matches-container').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

document.getElementById('dateFilter').addEventListener('change', e => {
    selectedDate = e.target.value;
    loadMatches(selectedDate);
});
document.getElementById('statusFilter').addEventListener('change', updateFilters);
document.getElementById('countryFilter').addEventListener('change', updateFilters);
document.getElementById('playerSearch').addEventListener('input', updateFilters);

setInterval(async () => {
    const response = await fetch(getApiUrl(selectedDate));
    if (!response.ok) return;
    const latest = await response.json();
    const isChanged = JSON.stringify(latest) !== JSON.stringify(allMatches);
    if (isChanged) {
        allMatches = latest;
        renderMatches(allMatches);
        updateFilters();
    }
}, 5000);

(async () => {
    await loadWatchLinks();
    loadMatches(selectedDate);
})();
