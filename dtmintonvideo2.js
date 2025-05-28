document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('modal').style.display = 'none';
});

function showDetailModal(match) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    content.innerHTML = `
    <h2>Detail Pertandingan</h2>
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;margin-bottom:1rem">
      <div style="flex:1;min-width:150px">
        <h4><img src="${match.team1.countryFlagUrl}" width="20" style="vertical-align:middle"> ${match.team1.countryCode}</h4>
        ${match.team1.players.map(p => `<div style='display:flex;align-items:center;gap:6px;margin:2px 0'><img src="${p.avatar?.thumbnailUrl || 'https://via.placeholder.com/30'}" width="28" height="28" style="border-radius:50%">${p.nameDisplay}</div>`).join('')}
      </div>
      <div style="flex:1">
        <h4><img src="${match.team2.countryFlagUrl}" width="20" style="vertical-align:middle"> ${match.team2.countryCode}</h4>
        ${match.team2.players.map(p => `<div style='display:flex;align-items:center;gap:6px;margin:2px 0'><img src="${p.avatar?.thumbnailUrl || 'https://via.placeholder.com/30'}" width="28" height="28" style="border-radius:50%">${p.nameDisplay}</div>`).join('')}
      </div>
    </div>
    <p><strong>Turnamen:</strong> ${match.tournamentName}</p>
    <p><strong>Jenis:</strong> ${match.matchTypeValue}</p>
    <p><strong>Waktu:</strong> ${new Date(match.matchTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: selectedTimezone })}</p>
    <p><strong>Lokasi:</strong> ${match.locationName} - ${match.courtName}</p>
    <p><strong>Status:</strong> ${match.matchStatusValue}</p>
    <p><strong>Durasi:</strong> ${match.duration || '-'} menit</p>
    <p><strong>Skor:</strong> ${formatScore(match.score)}</p>
    <hr>
    <h3>Statistik & Analisis</h3>
    <ul>
      <li><strong>Total Pemain:</strong> ${match.team1.players.length + match.team2.players.length}</li>
      <li><strong>Negara:</strong> ${match.team1.countryCode} vs ${match.team2.countryCode}</li>
      <li><strong>Skor Tertinggi:</strong> ${Math.max(...match.score.map(s => Math.max(s.home, s.away)) || [0])}</li>
      <li><strong>Jumlah Set:</strong> ${match.score.length}</li>
    </ul>
  `;
    modal.style.display = 'flex';

    const ctx = document.createElement('canvas');
    ctx.id = 'scoreChart';
    content.appendChild(ctx);

    const labels = match.score.map((s, i) => `Set ${i + 1}`);
    const data = {
        labels,
        datasets: [{
                label: `${match.team1.countryCode}`,
                data: match.score.map(s => s.home),
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                fill: false,
                tension: 0.3
            },
            {
                label: `${match.team2.countryCode}`,
                data: match.score.map(s => s.away),
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                fill: false,
                tension: 0.3
            }
        ]
    };

    const chartType = match.score.length <= 3 ? 'bar' : 'line';
    new Chart(ctx, {
        type: chartType,
        data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Skor per Set'
                }
            }
        }
    });
}
