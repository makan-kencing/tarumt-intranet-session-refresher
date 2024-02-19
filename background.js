importScripts("scripts/utils.js")

let last_time = 0;
let last_url = "";

function set_last_url(url) {
    last_time = Date.now();
    last_url = url;
}

HOSTNAME_TO_ENDPOINT = {
    "web.tarc.edu.my": "https://web.tarc.edu.my/portal/",
    "reg.tarc.edu.my": "https://reg.tarc.edu.my/portal/"
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
                    console.error("Username and password is not filled yet.");
                    set_last_login_status(LoginStatus.NO_CREDENTIALS);
                    sendResponse({failed: true});
                    return;
                }

                if (is_login_attempted_recently(sender.url)) {
                    console.log("Logged in recently. Probably no access to the site. Redirecting to usual place.");
                    clear_login_status();
                    sendResponse({failed: true});
                    return;
                }

                set_last_url(sender.url);
                endpoint = HOSTNAME_TO_ENDPOINT[request.hostname];
                try {
                    await refresh_session(endpoint, username, password);
                } catch (InvalidLogin) {
                    console.error("Login is invalid. Please check username and password are correct.")
                    set_last_login_status(LoginStatus.FAILED_LOGIN);
                    sendResponse({failed: true});
                    return;
                }
                clear_login_status();
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

async function refresh_session(endpoint, username, password){
    let res = await fetch(endpoint + "loginProcess.jsp", {
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
