importScripts("scripts/refresh_session.js")

new MutationObserver(
    async (mutations, observer) => {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === 1 && addedNode.innerText.match("window.parent.location.href=")) {
                console.log('Found window.location redirect. Removing it.');
                addedNode.remove();
                // We've done what we needed to do, no need for the MutationObserver anymore:
                observer.disconnect();

                clear_page();
                request_refresh_session();
                return;
            }
        }
    }
})
    .observe(document.documentElement, { childList: true, subtree: true });

function clear_page() {
    document.body.innerHTML = "";
}

function request_refresh_session() {
    chrome.runtime.sendMessage({ refresh_session: true }, handle_worker_response);
}

function handle_worker_response(response) {
    console.log("Received response");
    console.log(response);
    if (response.success)
        window.location.reload();

    if (response.failed)
        window.location.href = "https://web.tarc.edu.my/portal/sessionExpired.jsp?errmsg=invalid-App-Access";
}