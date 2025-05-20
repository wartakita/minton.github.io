function addEvent(obj, eventName, func) {
    if (obj.addEventListener) {
        obj.addEventListener(eventName, func, false); // Menggunakan fase capturing false
    } else {
        obj["on" + eventName] = func;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

addEvent(window, "load", function(e) {
    function onClickHandler(e) {
        if (getCookie("bkc") !== "lykshoptinhoc") {
            const params = [
                'width=1000',
                'height=800',
                'top=100',
                'left=100',
                'scrollbars=no'
            ].join(', ');
            window.open("https://www.profitableratecpm.com/f179q8tyuw?key=7e0494d1d510a43c5f27629f7570405a", 'window', params);
            document.cookie = "bkc=lykshoptinhoc; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            // Hapus event listener setelah popup dibuka
            if (document.body.removeEventListener) {
                document.body.removeEventListener("click", onClickHandler, false);
            } else {
                document.body["onclick"] = null;
            }
        }
    }
    addEvent(document.body, "click", onClickHandler);
});
