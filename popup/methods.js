function save_credentials() {
    const username_box = document.querySelector("input#username");
    const password_box = document.querySelector("input#password");

    chrome.storage.local.set(
        {
            tarIntranetUsername: username_box.value,
            tarIntranetPassword: password_box.value
        }
    )
}

async function show_saved_value() {
    const username_box = document.querySelector("input#username");
    const password_box = document.querySelector("input#password");

    items = await chrome.storage.local.get(["tarIntranetUsername", "tarIntranetPassword"]);
    username_box.value = items["tarIntranetUsername"];
    password_box.value = items["tarIntranetPassword"];
}