const REDIRECT_RE = /window[\w.]+\.location\.href=https:(.+)/;

new MutationObserver(
    (mutations, observer) => {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            let match = REDIRECT_RE.exec(addedNode.innerText);
            if (addedNode.nodeType === 1 && match) {
                console.log('Found window.location redirect. Removing it.');
                addedNode.remove();
                // We've done what we needed to do, no need for the MutationObserver anymore:
                observer.disconnect();

                window.addEventListener("load", rewrite_page);
                request_refresh_session(match[1]);
                return;
            }
        }
    }
})
    .observe(document.documentElement, { childList: true, subtree: true });

function rewrite_page() {
    document.body.innerHTML = `
    <style>
        body {
            margin: 0;
            padding: 0;
        }
    
        .center {
            margin: 0;
            padding: 0;
            
            display: flex; 
            height: 100vh; 
            width: 100vw; 
            align-items: center; 
            justify-content: center;       
        }
        .msg {
            font-family: Roboto sans-serif;
        }
    </style>
    
    <h1 class="center msg">
        Refreshing Session...
    </h1>
    `;
}

function request_refresh_session(original_redirect_url) {
    chrome.runtime.sendMessage(
        { refresh_session: true },
        (response) => {handle_worker_response(response, original_redirect_url)}
    );
}

function handle_worker_response(response, original_redirect_url) {
    if (response.success)
        window.location.reload();
    else if (response.failed) {
        window.location.href = original_redirect_url;
    }
}