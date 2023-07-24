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

async function render() {
    const {name, version, description} = await loadVersion();
    document.title = `${name} (${version})`;
    document.getElementById("meta").innerText = `${name} (${version})`;
    document.getElementById("title").innerText = description;
}

(async () => {
    await new Promise(res => setTimeout(res, 500));
    render();
})();
