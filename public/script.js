async function loadVersion() {
    return new Promise((res) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/version", true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                res(JSON.parse(xhr.responseText));
            } else {
                rej();
            }
        }
        xhr.onerror = function () {
            rej();
        }
        xhr.send();
    });
}

async function updateTitle() {
    const {name, version} = await loadVersion();
    document.title = `${name} (${version})`;
}

(async () => {
    await new Promise(res => setTimeout(res, 500));
    updateTitle();
})();
