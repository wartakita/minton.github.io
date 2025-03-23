// Array URL yang diblokir
var BLOCKED_URLS = ['https://bwftv.live', 'https://allengland2025.blogspot.com'];

// Array URL forwarding
var FORWARDING_URLS = ['https://minton1.digitalgadgetku.com', 'https://embedminton.blogspot.com'];

// Pilih URL forwarding pertama dari array
var FORWARDING_URL = FORWARDING_URLS[0];

// Pemeriksaan URL referer
if (BLOCKED_URLS.includes(document.referrer)) {
    location.href = FORWARDING_URL;
}

// URL tambahan untuk pemeriksaan
var b = 'https://goldgen2021.blogspot.com';
if (document.referrer.indexOf(b) !== -1) {
    location.href = 'https://www.google.com/';
}
