document.addEventListener('DOMContentLoaded', function() {
    fetch('https://wartakita.github.io/minton.github.io/replaytes.json')
        .then(response => response.json())
        .then(data => {
            const matchesContainer = document.getElementById('matchesContainer');
            data.forEach(match => {
                const matchCard = `    
                        <div class="col-md-4 match-item" data-title="${match.title}" data-video-id="${match.id}" data-category="${match.category}">    
                            <div class="card">    
                                <img src="${match.thumbnail}" class="card-img-top" alt="${match.alt}">    
                                <div class="card-body">    
                                    <h5 class="card-title">${match.title}</h5>    
                                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videoModal" data-video-id="${match.id}">    
                                        <i class="fas fa-play"></i> Watch Replay    
                                    </button>    
                                </div>    
                            </div>    
                        </div>    
                    `;
                matchesContainer.innerHTML += matchCard;
            });

            // Initialize category filter    
            const categoryFilter = document.getElementById('categoryFilter');
            categoryFilter.addEventListener('change', filterMatches);

            // Initialize search functionality    
            document.getElementById('searchForm').addEventListener('submit', function(e) {
                e.preventDefault();
                filterMatches();
            });

            // Initial filter to display all matches    
            filterMatches();
        })
        .catch(error => console.error('Error loading matches:', error));
});

function filterMatches() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const matches = document.querySelectorAll('.match-item');

    matches.forEach(match => {
        const title = match.getAttribute('data-title').toLowerCase();
        const category = match.getAttribute('data-category');

        if ((categoryFilter === 'all' || category === categoryFilter) && title.includes(searchInput)) {
            match.style.display = 'block';
        } else {
            match.style.display = 'none';
        }
    });
}

// Modal functionality    
const videoModal = document.getElementById('videoModal');
videoModal.addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    const videoId = button.getAttribute('data-video-id');
    const iframe = document.getElementById('videoIframe');
    iframe.src = `https://peytonepre.com/embed/${videoId}`;
});

videoModal.addEventListener('hidden.bs.modal', function() {
    const iframe = document.getElementById('videoIframe');
    iframe.src = '';
});
