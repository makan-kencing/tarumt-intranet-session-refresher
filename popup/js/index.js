const reset_button = document.querySelector("button#cancel");
const submit_button = document.querySelector("button#save");

reset_button.addEventListener("click", () => {window.close()});
submit_button.addEventListener("click", () => {
    clear_input_box_red();
    clear_error();
    clear_login_status();
    save_credentials();
});

show_saved_value();
show_err_if_exists();
