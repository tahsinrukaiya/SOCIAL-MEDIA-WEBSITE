import { API_BASE_URL } from "./constants.mjs";
import { registerForm } from "./constants.mjs";
import { user_name } from "./constants.mjs";
import { email_address } from "./constants.mjs";
import { password } from "./constants.mjs";


if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
    })

    //Function to create a user on Noroff API
    async function registerUser(url, data) {
        try {
            //making an api call
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.error("something went wrong!");
        }
    }

    const user = {
        name: user_name.value,
        email: email_address.value,
        password: password.value,
    };

    registerUser(`${API_BASE_URL}/social/auth/register`, user);
    alert("SUCCESSFUL!");
}




















/*TRIAL WITH THE API V2----------------------
const API_BASE = "https://v2.api.noroff.dev/";
const API_AUTH = "/auth";
const API_REGISTER = "/register";
const API_LOGIN = "/login";
const API_KEY_URL = "/create-api-key";

//INPUTS FROM USER-----------------------------
const form = document.getElementById('form');
const user_name = document.getElementById('user_name');
const email_address = document.getElementById('email_address');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');


function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
    return JSON.parse(localStorage.getItem(key));
}

async function getPost() {

}

async function getAPIKey() {
    const response = await fetch(API_BASE + API_AUTH + API_KEY_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${load("token")}`
        },
        body: JSON.stringify({
            name: "Test key"
        })
    });
    if (response.ok) {
        return await response.json();
    }
    console.error(await response.json());
    throw new error("could not register user");
}

getAPIKey().then(console.log);

async function registerUser(user_name, email_address, password) {
    const response = await fetch(API_BASE + API_AUTH + API_KEY_URL, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ user_name, email_address, password })
    });
}

async function registerUser() {

}

*/





