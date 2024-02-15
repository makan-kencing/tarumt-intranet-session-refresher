const StatusMessage = {
    NO_USERNAME: "Username is missing.",
    NO_PASSWORD: "Password is missing.",
    NO_USERNAME_PASSWORD: "Username and password is missing.",
    FAILED_LOGIN: "Username or password is incorrect."
}

function clear_input_box_red() {
    for (const box of document.querySelectorAll("input"))
        box.classList.remove("is-invalid");
}

function show_error(login_status) {
    const username_box = document.querySelector("input#username");
    const password_box = document.querySelector("input#password");

    const err_div = document.createElement("div");
    err_div.className = "alert alert-warning";
    err_div.id = "err-msg";
    switch (login_status) {
        case LoginStatus.NO_CREDENTIALS:
            if (!username_box.value && !password_box.value) {
                err_div.innerHTML = StatusMessage.NO_USERNAME_PASSWORD;
                username_box.classList.add("is-invalid");
                password_box.classList.add("is-invalid");
            } else if (!username_box.value) {
                err_div.innerHTML = StatusMessage.NO_USERNAME;
                username_box.classList.add("is-invalid");
            } else {
                err_div.innerHTML = StatusMessage.NO_PASSWORD;
                password_box.classList.add("is-invalid");
            }
            break;
        case LoginStatus.FAILED_LOGIN:
            err_div.innerHTML = StatusMessage.FAILED_LOGIN;
            username_box.classList.add("is-invalid");
            password_box.classList.add("is-invalid");
            break;
    }
    const form = document.querySelector("div#form");
    form.appendChild(err_div);
}

function clear_error() {
    const err_div = document.querySelector("div#err-msg");
    if (err_div)
        err_div.remove();
}

async function show_err_if_exists() {
    const login_status = await get_last_login_status();
    if (login_status)
        show_error(login_status);
}