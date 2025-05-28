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

const serverList = document.getElementById("serverList");
const iframe = document.getElementById("videoIframe");

servers.forEach((server, i) => {
    const btn = document.createElement("button");
    btn.textContent = server.name;
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".server-buttons button").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        e.target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        iframe.classList.add("fade-out");
        setTimeout(() => {
            iframe.src = server.embed;
            iframe.classList.remove("fade-out");
        }, 300);
    });
    if (i === 0) btn.click();
    serverList.appendChild(btn);
});
