let last_time = 0
let last_url = "";

chrome.webRequest.onHeadersReceived.addListener(
    async (details) => {
        if (details.statusCode !== 200)
            return;

        const [username, password] = await get_local_username_password();
        if (!(username && password)) {
            console.log("Username and password is not filled yet.");
            return;
        }

        if (is_session_expired(details.responseHeaders)) {
            if (is_login_attempted_recently(details.url)) {
                chrome.tabs.update({url: "https://web.tarc.edu.my/portal/sessionExpired.jsp?errmsg=invalid-App-Access"});
                return;
            }

            set_last_url(details.url);
            await refresh_session(username, password);
            chrome.tabs.reload(details.tabId);
        }
    },
    {
        urls: ["https://web.tarc.edu.my/portal/*"],
        types: ["main_frame"]
    },
    ["responseHeaders"]
);

function is_login_attempted_recently(url, recent_threshold_seconds = 10) {
    // prevent infinite loop from tabs.reload()
    if (last_url !== url)
        return false;

    const time_diff_in_millis = Date.now() - last_time
    return time_diff_in_millis <= recent_threshold_seconds * 1000;
}

function is_session_expired(response_headers) {
    for (let i = 0; i < response_headers.length; i++)
        if (response_headers[i].name === "Content-Length")
            if (parseInt(response_headers[i].value) <= 294)
                return true;
    return false;
}

function set_last_url(url) {
    last_time = Date.now();
    last_url = url;
}

class InvalidLogin extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidLogin";
    }
}

async function refresh_session(username, password){
    let res = await fetch("https://web.tarc.edu.my/portal/loginProcess.jsp", {
        method: "POST",
        body: `username=${username}&password=${encodeURI(password)}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include"
    });

    if (res.url.endsWith("invalidLogin"))
        throw new InvalidLogin("Username or password is incorrect.");
}