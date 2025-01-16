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

// Initialize JWPlayer dynamically with videoId or M3U8    
function initializePlayer(videoId, m3u8, embedLink, title) {
    const videoUrl = `https://tvpull.careryun.com/live/ballbar_${videoId}.m3u8`;
    jwplayer("player").setup({
        file: videoUrl,
        image: "https://da.gd/oeye", // Ganti dengan URL gambar yang benar    
        width: "100%",
        height: "100%"
    });
    jwplayer().on('error', function() {
        console.error('Error with videoId, switching to M3U8');
        jwplayer("player").setup({
            file: m3u8,
            image: "https://da.gd/oeye", // Ganti dengan URL gambar yang benar    
            width: "100%",
            height: "100%"
        });
        jwplayer().on('error', function() {
            console.error('Error with M3U8, switching to iframe');
            switchToIframe(embedLink);
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
                            <button class="btn btn-primary btn-sm watch-match" data-video-id="${match.videoId}" data-m3u8="${match.m3u8}" data-embed-link="${match.embedLink}" data-title="${match.teams}">Watch Match</button>    
                        `;
                listItem.addEventListener('click', () => {
                    initializePlayer(match.videoId, match.m3u8, match.embedLink, match.teams);
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
                    initializePlayer(match.videoId, match.m3u8, match.embedLink, match.teams);
                } else {
                    console.error('Match not found for videoId:', videoId);
                }
            })
            .catch(error => {
                console.error('Error fetching matches:', error);
            });
    }
    loadMatches();
});
