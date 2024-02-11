importScripts("scripts/utils.js")

let last_time = 0;
let last_url = "";

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

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.refresh_session) {
            (async () => {
                const [username, password] = await get_local_username_password();
                if (!(username && password)) {
                    console.log("Username and password is not filled yet.");
                    sendResponse({failed: true});
                }

                if (is_login_attempted_recently(sender.tab.url)) {
                    sendResponse({failed: true});
                }

                set_last_url(sender.tab.url);
                try {
                    await refresh_session(username, password);
                } catch (InvalidLogin) {
                    sendResponse({failed: true});
                }
                sendResponse({success: true});
            })();

            return true;
        }
    }
)

function is_login_attempted_recently(url, recent_threshold_seconds = 10) {
    // prevent infinite loop from tabs.reload()
    if (last_url !== url)
        return false;

    const time_diff_in_millis = Date.now() - last_time
    return time_diff_in_millis <= recent_threshold_seconds * 1000;
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