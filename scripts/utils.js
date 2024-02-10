async function get_local_username_password() {
    const items = await chrome.storage.local.get(["tarIntranetUsername", "tarIntranetPassword"]);
    return [items.tarIntranetUsername, items.tarIntranetPassword];
}

function set_local_username_password(username, password) {
    chrome.storage.local.set(
        {
            tarIntranetUsername: username,
            tarIntranetPassword: password
        }
    );
}