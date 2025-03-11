// Set untuk melacak pertandingan yang sudah dikirim notifikasi
const sentNotifications = new Set(JSON.parse(localStorage.getItem('sentNotifications')) || []);

// Fungsi untuk menyimpan Set ke localStorage
function saveSentNotifications() {
    localStorage.setItem('sentNotifications', JSON.stringify(Array.from(sentNotifications)));
}

// Fungsi untuk memformat tanggal ke model "24 December 2024"
function formatDate(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Fungsi untuk memuat data dari JSON
async function loadMatches() {
    try {
        document.getElementById('loader').style.display = 'block'; // Tampilkan loader
        const matches = await fetchMatches();

        renderMatches(matches);
        populateFilters(matches);
        filterMatches();
        updateCountdown();
        setInterval(updateCountdown, 1000); // Update countdown setiap detik
    } catch (error) {
        console.error("Failed to load matches:", error);
        document.getElementById('noMatches').classList.add('show');
    } finally {
        document.getElementById('loader').style.display = 'none'; // Sembunyikan loader
    }
}

async function fetchMatches() {
    const response = await fetch('https://wartakita.github.io/minton.github.io/Matches.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const matches = await response.json();

    // Mengambil data liveUrl dari API baru
    const liveUrls = await fetchLiveUrls(matches);
    matches.forEach(match => {
        match.liveUrl = liveUrls[match.videoId] || match.m3u8Url || match.iframeURL;
    });

    return matches;
}

async function fetchLiveUrls(matches) {
    const videoIds = matches.map(match => match.videoId);
    const liveUrls = {};

    const promises = videoIds.map(async videoId => {
        try {
            const apiResponse = await fetch(`https://api.90min.to/v1/match/channels?matchId=${videoId}`);
            if (apiResponse.ok) {
                const apiData = await apiResponse.json();
                if (apiData.status && apiData.result.length > 0) {
                    liveUrls[videoId] = apiData.result[0].streaming_urls[0];
                }
            }
        } catch (error) {
            console.error(`Failed to fetch live URL for matchId ${videoId}:`, error);
        }

        // Mengambil videoUrl dari API baru
        try {
            const apiResponse = await fetch(`https://833zb296.app/business/match/match_info?matchId=${videoId}`);
            if (apiResponse.ok) {
                const apiData = await apiResponse.json();
                if (apiData.code === "0000" && apiData.data.result.match.videoUrl) {
                    liveUrls[videoId] = apiData.data.result.match.videoUrl;
                }
            }
        } catch (error) {
            console.error(`Failed to fetch videoUrl for matchId ${videoId}:`, error);
        }
    });

    await Promise.all(promises);
    return liveUrls;
}

function renderMatches(matches) {
    const container = document.getElementById('scheduleContainer');
    container.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan data baru

    // Urutkan pertandingan berdasarkan statusnya (live terlebih dahulu)
    matches.sort((a, b) => {
        const now = new Date();
        const matchTimeA = new Date(`${a.date}T${a.time}`);
        const matchTimeB = new Date(`${b.date}T${b.time}`);

        const isLiveA = now >= matchTimeA && now <= new Date(matchTimeA.getTime() + 2 * 60 * 60 * 1000);
        const isLiveB = now >= matchTimeB && now <= new Date(matchTimeB.getTime() + 2 * 60 * 60 * 1000); // Pertandingan berlangsung selama 2 jam

        if (isLiveA && !isLiveB) return -1;
        if (!isLiveA && isLiveB) return 1;
        return 0;
    });

    matches.forEach(match => {
        const streamUrl = match.liveUrl || match.m3u8Url || match.iframeURL;
        const now = new Date();
        const matchTime = new Date(`${match.date}T${match.time}`);

        const isLive = now >= matchTime && now <= new Date(matchTime.getTime() + 2 * 60 * 60 * 1000); // Pertandingan berlangsung selama 2 jam

        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.setAttribute('data-date', match.date.toLowerCase());
        card.setAttribute('data-league', match.league.toLowerCase());
        card.setAttribute('data-teams', match.teams.toLowerCase());
        card.setAttribute('data-status', isLive ? 'live' : 'upcoming');

        const countdownTimer = !isLive ? `<span class="countdown" data-timer="${match.date}T${match.time}">Starting Soon...</span>` : '';

        card.innerHTML = `
                    <div class="match-info">
                        <span class="date"><i class="fas fa-calendar-alt"></i> ${formatDate(match.date)}</span>
                        <span class="teams"><i class="fas fa-users"></i> ${match.teams}</span>
                        <span class="details"><i class="fas fa-clock"></i> ${match.time} | ${match.league}</span>
                        ${isLive ? '<span class="live"><i class="fas fa-broadcast-tower"></i> Live Now</span>' : countdownTimer}
                    </div>
                    <button class="watch-button" onclick="playMatch('${match.videoId}', '${match.liveUrl}', '${match.m3u8Url}', '${match.iframeURL}', '${match.teams}')">
                        <i class="fas fa-play-circle"></i> Watch
                    </button>
                `;
        container.appendChild(card);
    });
}

// Fungsi untuk memperbarui countdown
function updateCountdown() {
    const countdownElements = document.querySelectorAll('[data-timer]');
    const now = new Date();

    countdownElements.forEach(element => {
        const matchTime = new Date(element.getAttribute('data-timer'));
        const diff = matchTime - now;

        if (diff <= 0) {
            element.textContent = ''; // Hapus countdown jika waktu telah berlalu
        } else {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            element.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    });
}

// Mulai JW Player
function playMatch(videoId, liveUrl, m3u8Url, iframeUrl, matchTitle) {
    let streamUrl = liveUrl || m3u8Url || iframeUrl;

    // Coba menggunakan liveUrl, jika gagal, gunakan m3u8Url, jika gagal lagi, gunakan iframeUrl
    fetch(liveUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Live URL failed');
            }
            return response;
        })
        .catch(error => {
            console.error("Failed to load live URL:", error);
            streamUrl = m3u8Url || iframeUrl;
        })
        .finally(() => {
            if (iframeUrl) {
                document.getElementById("jwplayerContainer").innerHTML = `<iframe src="${iframeUrl}" width="100%" height="100%" frameborder="0" scrolling="no"allow-scripts allow-same-origin" allowfullscreen="true"></iframe>`;
            } else {
                jwplayer("jwplayerContainer").setup({
                    file: streamUrl,
                    width: "100%",
                    aspectratio: "16:9",
                    image: " "
                });
            }

            document.getElementById("jwplayerContainer").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Tampilkan judul pertandingan
            document.getElementById('matchTitle').textContent = matchTitle;

            // Muat dan tampilkan daftar channel dan menu server
            loadChannels(videoId);
        });
}

// Fungsi untuk memuat dan menampilkan daftar channel dan menu server
async function loadChannels(videoId) {
    try {
        const response = await fetch(`https://api.90min.to/v1/match/channels?matchId=${videoId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data.status && data.result.length > 0) {
            renderChannels(data.result);
            renderServerMenu(data.result);
        } else {
            document.getElementById('channelsList').style.display = 'none';
            document.getElementById('serverMenu').style.display = 'none';
        }
    } catch (error) {
        console.error("Failed to load channels:", error);
        document.getElementById('channelsList').style.display = 'none';
        document.getElementById('serverMenu').style.display = 'none';
    }
}

// Fungsi untuk merender daftar channel
function renderChannels(channels) {
    const channelItems = document.getElementById('channelItems');
    channelItems.innerHTML = ''; // Kosongkan daftar channel sebelum menambahkan data baru

    channels.forEach(channel => {
        const item = document.createElement('li');
        item.innerHTML = `
                    <button onclick="playChannel('${channel.streaming_urls[0]}', '${channel.iframe_url}')">${channel.name}</button>
                `;
        channelItems.appendChild(item);
    });

    document.getElementById('channelsList').style.display = 'block';
}

// Fungsi baru untuk memutar video dari URL yang dipilih
function playChannel(streamUrl, iframeUrl) {
    if (iframeUrl) {
        document.getElementById("jwplayerContainer").innerHTML = `<iframe src="${iframeUrl}" width="100%" height="100%" frameborder="0" scrolling="no"allow-scripts allow-same-origin" allowfullscreen="true"></iframe>`;
    } else {
        jwplayer("jwplayerContainer").setup({
            file: streamUrl,
            width: "100%",
            aspectratio: "16:9",
            image: " "
        });
    }

    document.getElementById("jwplayerContainer").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Fungsi untuk merender menu server
function renderServerMenu(channels) {
    const serverMenu = document.getElementById('serverMenu');
    serverMenu.innerHTML = ''; // Kosongkan menu server sebelum menambahkan data baru

    let serverNumber = 1; // Inisialisasi nomor server

    channels.forEach((channel, index) => {
        channel.streaming_urls.forEach((streamUrl, streamIndex) => {
            const button = document.createElement('button');
            button.innerHTML = `<i class="fas fa-server"></i> Server ${serverNumber}`; // Gunakan nomor server
            button.onclick = () => playChannel(streamUrl, channel.iframe_url);
            serverMenu.appendChild(button);
            serverNumber++; // Tambahkan nomor server setiap kali membuat tombol baru
        });
    });

    document.getElementById('serverMenu').style.display = 'block';
}

// Fungsi untuk mengisi filter berdasarkan data JSON
function populateFilters(matches) {
    const dateFilter = document.getElementById('dateFilter');
    const leagueFilter = document.getElementById('leagueFilter');

    // Bersihkan opsi filter sebelumnya
    dateFilter.innerHTML = '<option value="">Filter by Date</option>';
    leagueFilter.innerHTML = '<option value="">Filter by League</option>';

    // Tambahkan opsi berdasarkan data unik dari JSON
    const uniqueDates = [...new Set(matches.map(match => match.date))];
    const uniqueLeagues = [...new Set(matches.map(match => match.league))];

    uniqueDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date.toLowerCase();
        option.textContent = formatDate(date);
        dateFilter.appendChild(option);
    });

    uniqueLeagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league.toLowerCase();
        option.textContent = league;
        leagueFilter.appendChild(option);
    });
}

// Fungsi untuk memfilter kartu pertandingan
function filterMatches() {
    const dateFilter = document.getElementById('dateFilter').value.toLowerCase();
    const leagueFilter = document.getElementById('leagueFilter').value.toLowerCase();
    const teamSearch = document.getElementById('teamSearch').value.toLowerCase();

    const cards = document.querySelectorAll('.schedule-card');
    let visibleCount = 0;

    // Filter dan urutkan kartu pertandingan
    const filteredCards = Array.from(cards).filter(card => {
        const cardDate = card.getAttribute('data-date');
        const cardLeague = card.getAttribute('data-league');
        const cardTeams = card.getAttribute('data-teams');

        const matchesDate = !dateFilter || cardDate === dateFilter;
        const matchesLeague = !leagueFilter || cardLeague === leagueFilter;
        const matchesTeams = !teamSearch || cardTeams.includes(teamSearch);

        return matchesDate && matchesLeague && matchesTeams;
    }).sort((a, b) => {
        const statusA = a.getAttribute('data-status');
        const statusB = b.getAttribute('data-status');

        if (statusA === 'live' && statusB !== 'live') return -1;
        if (statusA !== 'live' && statusB === 'live') return 1;
        return 0;
    });

    cards.forEach(card => card.style.display = 'none');
    filteredCards.forEach(card => {
        card.style.display = 'flex';
        visibleCount++;
    });

    const noMatches = document.getElementById('noMatches');
    if (visibleCount === 0) {
        noMatches.classList.add('show');
    } else {
        noMatches.classList.remove('show');
    }
}

// Fungsi untuk mereset filter
function resetFilters() {
    document.getElementById('dateFilter').value = '';
    document.getElementById('leagueFilter').value = '';
    document.getElementById('teamSearch').value = '';
    filterMatches();
}

// Debounce untuk meningkatkan performa filter
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Event Listener
document.getElementById('teamSearch').addEventListener('input', debounce(filterMatches, 300));
document.getElementById('dateFilter').addEventListener('change', filterMatches);
document.getElementById('leagueFilter').addEventListener('change', filterMatches);

// Panggil loadMatches setelah dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', loadMatches);

// Scroll to Top Functionality
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopButton").style.display = "block";
    } else {
        document.getElementById("scrollToTopButton").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Memuat data baru setiap 1 menit
setInterval(loadMatches, 1 * 60 * 1000);

// Fungsi untuk membuka modal disclaimer
function openDisclaimer() {
    document.getElementById('disclaimerModal').style.display = 'block';
}

// Fungsi untuk menutup modal disclaimer
function closeDisclaimer() {
    document.getElementById('disclaimerModal').style.display = 'none';
}

// Menutup modal disclaimer ketika klik di luar modal
window.onclick = function(event) {
    if (event.target == document.getElementById('disclaimerModal')) {
        closeDisclaimer();
    }
}
