document.addEventListener("DOMContentLoaded", function() {
    const servers = [{
            name: "Server 1",
            embed: "https://example.com/embed1"
        },
        {
            name: "Server 2",
            embed: "https://example.com/embed2"
        },
        {
            name: "Server 3",
            embed: "https://example.com/embed3"
        }
    ];

    const serverList = document.getElementById('serverList');
    const iframe = document.getElementById("videoIframe");
    const playerLoad = document.getElementById("playerload");
    const toast = document.getElementById("toast");
    let currentServerIndex = 0;
    let loadTimeout;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    function loadServer(index) {
        if (index >= servers.length) {
            playerLoad.style.display = "none";
            showToast("All servers failed to load. Please try again later.");
            return;
        }

        const embedURL = servers[index].embed;
        playerLoad.style.display = "block"; // Show loading animation
        iframe.src = embedURL;

        clearTimeout(loadTimeout);
        loadTimeout = setTimeout(() => {
            playerLoad.style.display = "none";
            showToast(`Loading ${servers[index].name} timed out. Trying next server...`);
            loadServer(index + 1);
        }, 10000); // 10 seconds timeout fallback

        iframe.onload = function() {
            clearTimeout(loadTimeout);
            playerLoad.style.display = "none"; // Hide loading animation when iframe loads
        };

        iframe.onerror = function() {
            clearTimeout(loadTimeout);
            playerLoad.style.display = "none"; // Hide loading animation if iframe fails to load
            showToast(`Failed to load ${servers[index].name}. Trying next server...`);
            loadServer(index + 1); // Try next server
        };

        document.querySelectorAll('.DagPlayOpt').forEach(opt => opt.classList.remove('on'));
        serverList.children[index].firstChild.classList.add('on');
        currentServerIndex = index;
    }

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function decodeBase64(str) {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    }

    function loadServerFromUrl(url) {
        playerLoad.style.display = "block"; // Show loading animation
        iframe.src = url;

        clearTimeout(loadTimeout);
        loadTimeout = setTimeout(() => {
            playerLoad.style.display = "none";
            showToast("Loading video timed out. Please try another server.");
        }, 10000);

        iframe.onload = function() {
            clearTimeout(loadTimeout);
            playerLoad.style.display = "none";
        };

        iframe.onerror = function() {
            clearTimeout(loadTimeout);
            playerLoad.style.display = "none";
            showToast("Failed to load the video from the provided URL.");
        };

        document.querySelectorAll('.DagPlayOpt').forEach(opt => opt.classList.remove('on'));
        const currentOption = document.querySelector(`.DagPlayOpt[data-embed="${url}"]`);
        if (currentOption) {
            currentOption.classList.add('on');
        }
    }

    const embedParam = getParameterByName('embed');
    if (embedParam) {
        // Decode base64 if necessary
        const decodedEmbedParam = decodeBase64(embedParam);
        // Split the embed parameter by commas to handle multiple embed URLs
        const embedUrls = decodedEmbedParam.split(',');
        if (embedUrls.length > 1) {
            // Generate server options from embed URLs
            embedUrls.forEach((url, index) => {
                const li = document.createElement('li');
                const div = document.createElement('div');
                div.className = 'DagPlayOpt';
                div.dataset.embed = url;
                div.innerHTML = `<i class="fas fa-play"></i> <span>Server ${index + 1}</span>`;
                li.appendChild(div);
                serverList.appendChild(li);

                div.addEventListener('click', function() {
                    loadServerFromUrl(url);
                });

                // Trigger click on the first server option
                if (index === 0) {
                    div.click();
                }
            });
        } else {
            // Single embed URL
            playerLoad.style.display = "block"; // Show loading animation
            iframe.src = embedUrls[0];

            clearTimeout(loadTimeout);
            loadTimeout = setTimeout(() => {
                playerLoad.style.display = "none";
                showToast("Loading video timed out. Please try refreshing the page.");
            }, 10000);

            iframe.onload = function() {
                clearTimeout(loadTimeout);
                playerLoad.style.display = "none";
            };

            iframe.onerror = function() {
                clearTimeout(loadTimeout);
                playerLoad.style.display = "none";
                showToast("Failed to load the video from the provided URL.");
            };
        }
    } else {
        // Generate server options from predefined servers
        servers.forEach((server, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.className = 'DagPlayOpt';
            div.dataset.embed = server.embed;
            div.innerHTML = `<i class="fas fa-play"></i> <span>${server.name}</span>`;
            li.appendChild(div);
            serverList.appendChild(li);

            div.addEventListener('click', function() {
                loadServer(index);
            });

            // Trigger click on the first server option
            if (index === 0) {
                div.click();
            }
        });
    }

    // Function to update time in WIB
    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeString = now.toLocaleTimeString('en-GB', options);
        document.getElementById('timeDisplay').textContent = `${timeString} WIB`;
    }

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to set time immediately
});
