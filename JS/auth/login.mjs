import { API_BASE_URL } from "./constants.mjs";
import { LOGIN_URL } from "./constants.mjs";


const email = document.getElementById("email_address");
const password = document.getElementById("password");

const userLogin = {
    email: email.value,
    password: password.value,
};

async function loginUser(url, data) {
    try {
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
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
}

loginUser((API_BASE_URL + LOGIN_URL), userLogin);