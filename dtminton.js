// Function to get videoId dynamically from URL parameters  
function getVideoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('videoId'); // No default fallback  
}

// Function to update match title  
function updateMatchTitle(title) {
    const matchTitle = document.getElementById('match-title');
    matchTitle.textContent = title;
}

// Initialize JWPlayer dynamically with videoId or M3U8 or MPD  
function initializePlayer(videoId, m3u8, mpd, embedLink, title, keyId, key) {
    let videoUrl;
    let setupConfig = {
        playlist: [{
            sources: []
        }]
    };

    if (mpd) {
        videoUrl = mpd;
        setupConfig.playlist[0].sources.push({
            file: videoUrl,
            type: "dash"
        });
    } else if (m3u8) {
        videoUrl = m3u8;
        setupConfig.playlist[0].sources.push({
            file: videoUrl,
            type: "hls"
        });
    } else {
        videoUrl = `https://tvpull.careryun.com/live/ballbar_${videoId}.m3u8`;
        setupConfig.playlist[0].sources.push({
            file: videoUrl,
            type: "hls"
        });
    }

    if (keyId && key) {
        setupConfig.playlist[0].sources[0].drm = {
            clearkey: {
                keyId: keyId,
                key: key
            }
        };
    }

    jwplayer("player").setup({
        ...setupConfig,
        image: "https://da.gd/oeye", // Ganti dengan URL gambar yang benar  
        width: "100%",
        height: "100%",
        primary: "html5",
        hlshtml: true,
        dashjs: true
    });

    jwplayer().on('error', function() {
        console.error('Error with videoId, switching to M3U8');
        jwplayer("player").setup({
            playlist: [{
                sources: [{
                    file: m3u8,
                    type: "hls"
                }]
            }],
            image: "https://da.gd/oeye", // Ganti dengan URL gambar yang benar  
            width: "100%",
            height: "100%",
            primary: "html5",
            hlshtml: true
        });
        jwplayer().on('error', function() {
            console.error('Error with M3U8, switching to MPD');
            jwplayer("player").setup({
                playlist: [{
                    sources: [{
                        file: mpd,
                        type: "dash"
                    }]
                }],
                image: "https://da.gd/oeye", // Ganti dengan URL gambar yang benar  
                width: "100%",
                height: "100%",
                primary: "html5",
                dashjs: true
            });
            jwplayer().on('error', function() {
                console.error('Error with MPD, switching to iframe');
                switchToIframe(embedLink);
            });
        });
    });

    updateMatchTitle(title);
    scrollToPlayer();
}

// Function to switch to iframe player  
function switchToIframe(embedLink) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `  
                <iframe src="${embedLink}" width="100%" height="400px" frameborder="0" scrolling="no" sandbox="allow-scripts allow-same-origin" allowfullscreen="true"></iframe>  
            `;
}

// Function to scroll to the player section  
function scrollToPlayer() {
    const playerCard = document.getElementById('player-card');
    playerCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Function to format date from YYYY-MM-DD to DD-Month-YYYY  
function formatDate(dateString) {
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load matches from JSON  
function loadMatches() {
    const matchesList = document.getElementById('matches-list');
    fetch('https://wartakita.github.io/minton.github.io/Matches.json') // Ganti dengan URL file JSON Anda  
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
                listItem.innerHTML = `  
                            <div>  
                                <strong>${match.teams}</strong><br>  
                                <small>${match.time} - ${formatDate(match.date)}</small>  
                            </div>  
                            <div>  
                                <select class="form-select channel-select" aria-label="Select channel">  
                                    ${match.channels.map(channel => `  
                                        <option value="${channel.videoId},${channel.m3u8},${channel.mpd},${channel.embedLink},${channel.name},${channel.keyId},${channel.key}">${channel.name}</option>  
                                    `).join('')}  
                                </select>  
                                <button class="btn btn-primary btn-sm watch-match" data-video-id="${match.channels[0].videoId}" data-m3u8="${match.channels[0].m3u8}" data-mpd="${match.channels[0].mpd}" data-embed-link="${match.channels[0].embedLink}" data-title="${match.teams}" data-key-id="${match.channels[0].keyId}" data-key="${match.channels[0].key}">Watch Match</button>  
                            </div>  
                        `;
                listItem.querySelector('.channel-select').addEventListener('change', (event) => {
                    const [videoId, m3u8, mpd, embedLink, title, keyId, key] = event.target.value.split(',');
                    listItem.querySelector('.watch-match').setAttribute('data-video-id', videoId);
                    listItem.querySelector('.watch-match').setAttribute('data-m3u8', m3u8);
                    listItem.querySelector('.watch-match').setAttribute('data-mpd', mpd);
                    listItem.querySelector('.watch-match').setAttribute('data-embed-link', embedLink);
                    listItem.querySelector('.watch-match').setAttribute('data-title', title);
                    listItem.querySelector('.watch-match').setAttribute('data-key-id', keyId);
                    listItem.querySelector('.watch-match').setAttribute('data-key', key);
                });
                listItem.querySelector('.watch-match').addEventListener('click', () => {
                    const videoId = listItem.querySelector('.watch-match').getAttribute('data-video-id');
                    const m3u8 = listItem.querySelector('.watch-match').getAttribute('data-m3u8');
                    const mpd = listItem.querySelector('.watch-match').getAttribute('data-mpd');
                    const embedLink = listItem.querySelector('.watch-match').getAttribute('data-embed-link');
                    const title = listItem.querySelector('.watch-match').getAttribute('data-title');
                    const keyId = listItem.querySelector('.watch-match').getAttribute('data-key-id');
                    const key = listItem.querySelector('.watch-match').getAttribute('data-key');
                    initializePlayer(videoId, m3u8, mpd, embedLink, title, keyId, key);
                });
                matchesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching matches:', error);
            const errorMessage = document.createElement('li');
            errorMessage.className = 'list-group-item text-danger';
            errorMessage.textContent = 'Failed to load matches. Please try again later.';
            matchesList.appendChild(errorMessage);
        });
}

// Function to update WIB time  
function updateWIBTime() {
    const now = new Date();
    const wibOffset = 7 * 60 * 60 * 1000; // WIB is UTC+7  
    const wibTime = new Date(now.getTime() + wibOffset);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formattedTime = wibTime.toLocaleTimeString('en-US', options);
    document.getElementById('wib-time').textContent = formattedTime;
}

// Initialize on DOMContentLoaded  
document.addEventListener('DOMContentLoaded', function() {
    const videoId = getVideoId();
    if (videoId) {
        fetch('https://wartakita.github.io/minton.github.io/Matches.json') // Ganti dengan URL file JSON Anda  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const match = data.find(m => m.videoId === videoId);
                if (match) {
                    initializePlayer(match.videoId, match.m3u8, match.mpd, match.embedLink, match.teams, match.keyId, match.key);
                } else {
                    console.error('Match not found for videoId:', videoId);
                }
            })
            .catch(error => {
                console.error('Error fetching matches:', error);
            });
    }
    loadMatches();

    // Update WIB time every second  
    setInterval(updateWIBTime, 1000);
    updateWIBTime(); // Initial call to display time immediately  
});
