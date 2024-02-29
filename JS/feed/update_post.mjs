import { API_BASE_URL } from "../auth/constants.mjs";
import { UPDATE_POST_URL } from "../auth/constants.mjs";

const update_link = document.querySelector('update_post');
const update_post_form = document.getElementById('update_post_form');

function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}

//FUNCTION TO FETCH POST DETAIL USING ID AND TITLE-------------------------
const postId = getPostIdFromQuery();
console.log(postId);
const postTitle = getPostTitleFromQuery();
console.log(postTitle);

/*
update_post_form.addEventListener('submit', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const title = urlParams.get('title');
    const body = urlParams.get('body');
    const tags = urlParams.get('tags');
    const media = urlParams.get('media');

    // Populate form fields with retrieved data
    document.getElementById('update_title').value = title;
    document.getElementById('update_body').value = body;
    document.getElementById('update_tags').value = tags;
    document.getElementById('update_media').value = media;
});
*/


















/*
function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}

//FUNCTION TO FETCH POST DETAIL USING ID AND TITLE
const postId = getPostIdFromQuery();
const postTitle = getPostTitleFromQuery();

if (!postId) {
    console.error('Post ID not provided in the URL');
    return;
}
if (!postTitle) {
    console.error('Post Title not provided in the URL');
    return;
}

const update_post_btn = document.getElementById('update_post_btn');
const update_title = document.getElementById('update_title');
const update_body = document.getElementById('update_body');
const update_tags = document.getElementById('update_tags');
const update_media = document.getElementById('update_media');


// Retrieve the access token from local storage
const storedAccessToken = localStorage.getItem('accessToken');

// Check if an access token is available
if (storedAccessToken) {
    console.log('Access Token loaded from local storage:', storedAccessToken);

    //for making authenticated API requests.
} else {
    console.log('No Access Token found in local storage');
}


update_post_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Splitting the tags input value into an array
    const tagsArray = tags.value.split(',');
    //user inputs from the form
    const update_Post = {
        title: update_title.value,
        body: update_body.value,
        tags: tagsArray,
        media: update_media.value,
    };
    console.log(update_Post);


    //api call here with accesstoken
    try {
        const response = await fetch(API_BASE_URL + UPDATE_POST_URL, {
            method: 'PUT',
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
                    window.location.href = "http://127.0.0.1:8080/feed/";
                }, 500);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});*/