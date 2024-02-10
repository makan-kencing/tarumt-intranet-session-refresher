const REDIRECT_STRING = "window.parent.location.href=\"https://web.tarc.edu.my/portal/sessionExpired.jsp?errmsg=invalid-App-Access\""

new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === 1 && addedNode.innerText === REDIRECT_STRING) {
                console.log('Found window.location redirect. Removing it.');
                addedNode.remove();
                // We've done what we needed to do, no need for the MutationObserver anymore:
                observer.disconnect();
                return;
            }
        }
    }
})
    .observe(document.documentElement, { childList: true, subtree: true });