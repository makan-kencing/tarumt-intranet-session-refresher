const reset_button = document.querySelector("button#Cancle");
const submit_button = document.querySelector("button#Save");

reset_button.addEventListener("click", show_saved_value);
submit_button.addEventListener("click", save_credentials);

show_saved_value();
