import { CREATE_POST_URL } from "../auth/constants.mjs";
import { API_BASE_URL } from "../auth/constants.mjs";

const post_form = document.getElementById('post_form');
const create_post_btn = document.getElementById('create_post_btn');
const post_title = document.getElementById('post_title');
const post_media_url = document.getElementById('post_media_url');
const post_tag = document.getElementById('post_tag');
const post_body = document.getElementById('post_body');

post_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //user inputs from the form
    const userPost = {
        post_title: post_title.value,
        post_body: post_body.value,
        post_tag: post_tag.value,
        post_media_url: post_media_url.value,
    };
    console.log(userPost);

    //api call here with accesstoken
    try {
        const response = await fetch(API_BASE_URL + CREATE_POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPost),
        });

        if (!response.ok) {
            throw new Error("Network Issue");
        } else {
            console.log("post creation successfull!");
            location.reload();
        }

        const json = await response.json();
        const accessToken = json.accessToken;

        localStorage.setItem('accessToken', accessToken);
        console.log("CREATE POST SUCCESSFUL!", json);
        window.location.href = "http://127.0.0.1:8080/feed/index.html";
    }
    catch (error) {
        console.error(error);
    }
});







