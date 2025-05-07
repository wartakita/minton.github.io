let matches = {};

async function loadMatchesFromJson() {
    const response = await fetch('https://wartakita.github.io/minton.github.io/Matches.json');
    matches = await response.json();
    renderMatchList('all');
}

function renderMatchList(selectedCourt) {
    const container = document.getElementById('matchContainer');
    container.innerHTML = '';

    const filteredMatches = Object.entries(matches).filter(([key, match]) => {
        if (selectedCourt === 'all') return true;
        return match.court === selectedCourt;
    });

    if (filteredMatches.length === 0) {
        container.innerHTML = '<p>Tidak ada pertandingan untuk court ini.</p>';
        clearPlayer();
        return;
    }

    filteredMatches.forEach(([key, match]) => {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-item';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = match.title;
        matchDiv.appendChild(titleSpan);

        const serverSelect = document.createElement('select');
        serverSelect.style.marginLeft = '10px';
        serverSelect.style.backgroundColor = 'rgba(255,255,255,0.9)';
        serverSelect.style.color = '#000';
        serverSelect.style.border = 'none';
        serverSelect.style.borderRadius = '4px';
        serverSelect.style.padding = '2px 6px';
        serverSelect.style.cursor = 'pointer';

        for (const [serverKey, server] of Object.entries(match.servers)) {
            const option = document.createElement('option');
            option.value = serverKey;
            option.textContent = server.name;
            serverSelect.appendChild(option);
        }

        serverSelect.onchange = () => {
            loadMatch(match, serverSelect.value);
        };

        titleSpan.style.cursor = 'pointer';
        titleSpan.onclick = () => {
            serverSelect.selectedIndex = 0;
            loadMatch(match, serverSelect.value);
        };

        matchDiv.appendChild(serverSelect);
        container.appendChild(matchDiv);
    });

    clearPlayer();
}

function loadMatch(match, serverKey) {
    const playerArea = document.getElementById('playerArea');
    playerArea.innerHTML = '';

    const server = match.servers[serverKey];
    if (!server) {
        playerArea.textContent = 'Server tidak ditemukan.';
        return;
    }

    if (server.type === 'jw') {
        const playerDiv = document.createElement('div');
        playerDiv.id = 'jwplayerDiv';
        playerArea.appendChild(playerDiv);

        jwplayer("jwplayerDiv").setup({
            file: server.file,
            image: server.image,
            width: "100%",
            aspectratio: "16:9",
            autostart: true
        });
    } else if (server.type === 'iframe') {
        const iframe = document.createElement('iframe');
        iframe.src = server.url;
        iframe.frameBorder = 0;
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        playerArea.appendChild(iframe);
    }
}

function clearPlayer() {
    const playerArea = document.getElementById('playerArea');
    playerArea.innerHTML = '<div id="jwplayerDiv">Pilih pertandingan dan server untuk mulai menonton</div>';
}

document.getElementById('courtSelect').addEventListener('change', (e) => {
    renderMatchList(e.target.value);
});

loadMatchesFromJson();
