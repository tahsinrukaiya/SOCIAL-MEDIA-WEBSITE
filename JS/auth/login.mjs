import { API_BASE_URL } from "./constants.mjs";
import { LOGIN_URL } from "./constants.mjs";
import { logInForm } from "./constants.mjs";


const email = document.getElementById("email_address");
const password = document.getElementById("password");


if (logInForm) {
    logInForm.addEventListener("submit", (event) => {
        event.preventDefault();
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
                console.log("Log in Successfull!", response);
                window.location.href = "http://127.0.0.1:8080/profile/index.html";
                if (!response.ok) {
                    throw new Error("Network Issue");
                }

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

    })
}

