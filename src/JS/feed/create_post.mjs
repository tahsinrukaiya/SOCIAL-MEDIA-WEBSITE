import { CREATE_POST_URL } from "../auth/constants.mjs";
import { API_BASE_URL } from "../auth/constants.mjs";


const post_form = document.getElementById('post_form');
const create_post_btn = document.getElementById('create_post_btn');
const title = document.getElementById('title');
const body = document.getElementById('body');
const tags = document.getElementById('tags');
const media = document.getElementById('media');


// Retrieve the access token from local storage
const storedAccessToken = localStorage.getItem('accessToken');

// Check if an access token is available
if (storedAccessToken) {
    console.log('Access Token loaded from local storage:', storedAccessToken);

    //for making authenticated API requests.
} else {
    console.log('No Access Token found in local storage');
}


post_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Splitting the tags input value into an array
    const tagsArray = tags.value.split(',');
    //user inputs from the form
    const userPost = {
        title: title.value,
        body: body.value,
        tags: tagsArray,
        media: media.value,
    };
    console.log(userPost);
    //api call here with accesstoken
    try {
        const response = await fetch(API_BASE_URL + CREATE_POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedAccessToken}`,
            },
            body: JSON.stringify(userPost),
        });

        if (!response.ok) {
            //more details about the error returned by the server
            const errorText = await response.text();
            console.error("Error from server:", errorText);
            throw new Error("Network Issue");
        }
        else {
            console.log("Post creation successful!");

            // Triggering the Bootstrap modal
            var post_modal = new bootstrap.Modal(document.getElementById('post_modal'));
            post_modal.show();

            // To reload the page after the modal is closed
            post_modal._element.addEventListener('hidden.bs.modal', function () {
                console.log('Modal closed');
                // Delay the page reload to ensure the modal is closed
                setTimeout(() => {
                    window.location.href = "/public/pages/feed/index.html";
                }, 500);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});







