const clear_button = document.querySelector("#clear")
const reset_button = document.querySelector("button#cancel");
const submit_button = document.querySelector("button#save");

clear_button.addEventListener("click", () => {
    clear_storage();
    clear_input_box_red();
    clear_error();
    clear_login_status();
    show_saved_value();
})
reset_button.addEventListener("click", () => {window.close()});
submit_button.addEventListener("click", () => {
    clear_input_box_red();
    clear_error();
    clear_login_status();
    save_credentials();
});

show_saved_value();
show_err_if_exists();
