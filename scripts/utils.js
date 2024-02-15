const Storage = {
    USERNAME: "tarIntranetUsername",
    PASSWORD: "tarIntranetPassword"
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