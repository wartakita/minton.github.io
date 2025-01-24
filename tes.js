// Function to initialize JWPlayer    
var playerInstance = jwplayer("player");

function playChannel(channel) {
    // Base configuration    
    const setupConfig = {
        playlist: [{
            title: channel.title,
            sources: [{
                default: false,
                type: channel.type, // Use type from JSON (dash or hls)    
                file: channel.file
            }]
        }],
        width: "100%",
        height: "100%",
        aspectratio: "16:9",
        autostart: true,
        logo: {
            file: 'https://example.com/logo.png',
            link: 'https://example.com',
            position: 'top-right'
        }
    };

    // Add DRM ClearKey if available    
    if (channel.keyId && channel.key) {
        setupConfig.playlist[0].sources[0].drm = {
            clearkey: {
                keyId: channel.keyId,
                key: channel.key
            }
        };
    }

    // Setup player and error handling    
    playerInstance.setup(setupConfig);

    // Event listener for error    
    playerInstance.on('error', function() {
        // If error occurs and iframeLink exists, replace the player with an iframe    
        if (channel.iframeLink) {
            // Ganti konten player dengan iframe jika terjadi error    
            const playerContainer = document.getElementById('player');
            playerContainer.innerHTML = `<div class="iframe-container">    
                        <iframe src="${channel.iframeLink}" frameborder="0" sandbox="allow-scripts allow-same-origin" allowfullscreen="true"></iframe>    
                    </div>`;
        }
    });

    // Scroll to player section    
    scrollToPlayer();
}

// Function to scroll to player section    
function scrollToPlayer() {
    const playerElement = document.getElementById('player');
    playerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Load JSON and populate channels    
fetch('https://wartakita.github.io/minton.github.io/tes.json')
    .then(response => response.json())
    .then(data => {
        const channelsContainer = document.getElementById('channels');
        data.forEach(channel => {
            const channelDiv = document.createElement('div');
            channelDiv.className = `col-12 col-md-4 mb-3 channel ${channel.category}`;
            channelDiv.innerHTML = `    
                        <button class="btn btn-block btn-primary w-100" onclick='playChannel(${JSON.stringify(channel)})'>    
                            ${channel.title}    
                        </button>    
                    `;
            channelsContainer.appendChild(channelDiv);
        });

        // Add event listener for search input    
        document.getElementById('searchInput').addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterChannelsBySearch(query, data);
        });
    });

// Filter Channels by Category    
function filterChannels(category) {
    let channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        if (category === 'all' || channel.classList.contains(category)) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
}

// Filter Channels by Search Query    
function filterChannelsBySearch(query, data) {
    let channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        const channelTitle = channel.querySelector('button').innerText.toLowerCase();
        if (channelTitle.includes(query)) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
}
