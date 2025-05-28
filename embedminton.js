document.addEventListener("DOMContentLoaded", function () {
      const servers = [
        { name: "Server 1", embed: "https://example.com/embed1" },
        { name: "Server 2", embed: "https://example.com/embed2" },
        { name: "Server 3", embed: "https://example.com/embed3" }
      ];

      const serverList = document.getElementById('serverList');
      const iframe = document.getElementById("videoIframe");
      const playerLoad = document.getElementById("playerload");
      const toast = document.getElementById("toast");
      let loadTimeout;

      function showToast(message) {
        toast.textContent = message;
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 4000);
      }

      function loadServerFromUrl(url) {
        playerLoad.style.display = "block";
        iframe.src = url;
        clearTimeout(loadTimeout);
        loadTimeout = setTimeout(() => {
          playerLoad.style.display = "none";
          showToast("Loading video timed out. Please try another server.");
        }, 10000);

        iframe.onload = function () {
          clearTimeout(loadTimeout);
          playerLoad.style.display = "none";
        };

        iframe.onerror = function () {
          clearTimeout(loadTimeout);
          playerLoad.style.display = "none";
          showToast("Failed to load the video from the provided URL.");
        };
      }

      function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
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

      const embedParam = getParameterByName('embed');
      if (embedParam) {
        const decodedEmbedParam = decodeBase64(embedParam);
        const embedUrls = decodedEmbedParam.split(',');
        embedUrls.forEach((url, index) => {
          const btn = document.createElement('button');
          btn.textContent = `Server ${index + 1}`;
          btn.addEventListener('click', () => loadServerFromUrl(url));
          serverList.appendChild(btn);
          if (index === 0) btn.click();
        });
      } else {
        showToast("Parameter 'embed' tidak ditemukan atau tidak valid.");
        servers.forEach((server, index) => {
          const btn = document.createElement('button');
          btn.textContent = server.name;
          btn.addEventListener('click', () => loadServerFromUrl(server.embed));
          serverList.appendChild(btn);
          if (index === 0) btn.click();
        });
      }

      function updateTime() {
        const now = new Date();
        const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = now.toLocaleTimeString('en-GB', options);
        document.getElementById('timeDisplay').textContent = `${timeString} WIB`;
      }

      setInterval(updateTime, 1000);
      updateTime();
    });
