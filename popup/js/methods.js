function save_credentials() {
    const username_box = document.querySelector("input#username");
    const password_box = document.querySelector("input#password");

    set_local_username_password(username_box.value, password_box.value);
}

async function show_saved_value() {
    const username_box = document.querySelector("input#username");
    const password_box = document.querySelector("input#password");

    [username_box.value, password_box.value] = await get_local_username_password();
}