const reset_button = document.querySelector("button[type=reset]");
const submit_button = document.querySelector("button[type=submit]");

reset_button.addEventListener("click", show_saved_value);
submit_button.addEventListener("click", save_credentials);

show_saved_value();