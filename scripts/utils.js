const LoginStatus = {
    FAILED_LOGIN: "failed_login",
    NO_CREDENTIALS: "no_credentials"
}

const Storage = {
    USERNAME: "tarIntranetUsername",
    PASSWORD: "tarIntranetPassword",
    LAST_LOGIN_STATUS: "lastLoginStatus"
}

async function get_local_username_password() {
    const items = await chrome.storage.local.get([Storage.USERNAME, Storage.PASSWORD]);
    return [items[Storage.USERNAME], items[Storage.PASSWORD]];
}

function set_local_username_password(username, password) {
    chrome.storage.local.set(
        {
            [Storage.USERNAME]: username,
            [Storage.PASSWORD]: password
        }
    );
}

async function get_last_login_status() {
    const items = await chrome.storage.local.get(Storage.LAST_LOGIN_STATUS);
    return items[Storage.LAST_LOGIN_STATUS];
}

function set_last_login_status(login_status) {
    chrome.storage.local.set(
        {
            [Storage.LAST_LOGIN_STATUS]: login_status
        }
    )
}

function clear_login_status() {
    chrome.storage.local.remove(Storage.LAST_LOGIN_STATUS);
}
