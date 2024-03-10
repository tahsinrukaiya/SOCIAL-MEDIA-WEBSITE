import { API_BASE_URL } from "../auth/constants.mjs";
import { SINGLE_POST_URL } from "../auth/constants.mjs";
import { UPDATE_POST_URL } from "../auth/constants.mjs";

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

//API CALL TO GET PREVIOUS DATA FIRST
async function fetchPostData() {

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

    const token = localStorage.getItem('accessToken');

    // Defining optional query parameters
    const queryParams = {
        _author: true,
        _comments: true,
        _reactions: true,
    };

    // Converting query parameters to a string
    const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&');

    // Including the token and query parameters in the URL
    const url = `${API_BASE_URL}${SINGLE_POST_URL}${postId}?${queryString}`;

    // Including the token in the headers of the fetch request
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    //see if the response is correct
    if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        return;
    }

    const postDetail = await response.json();

    //NOW SETTING THE DATAS TO THE INPUT BOXES

    async function update_form() {
        try {
            const setTitle = (document.getElementById(
                "update_title"
            ).value = `${postDetail.title}`);

            const setTags = (document.getElementById(
                "update_tags"
            ).value = `${postDetail.tags}`);
            const setMedia = (document.getElementById(
                "update_media"
            ).value = `${postDetail.media}`);

            const setBody = (document.getElementById(
                "update_body"
            ).value = `${postDetail.body}`);

        }
        catch (error) {
            console.log(error);
        }
    }
    update_form();

    //TO UPDATE THE INPUT DATA AND UPLOAD IT

    //reference to update_post_form
    const update_post_form = document.getElementById('update_post_form');
    // Retrieve the access token from local storage
    const storedAccessToken = localStorage.getItem('accessToken');

    // Check if an access token is available
    if (storedAccessToken) {
        console.log('Access Token loaded from local storage:', storedAccessToken);

        //for making authenticated API requests.
    } else {
        console.log('No Access Token found in local storage');
    }

    if (update_form) {
        update_post_form.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Splitting the tags input value into an array
            const tagsArray = update_tags.value.split(',');

            //user updated inputs from the form
            const updated_post = {
                title: update_title.value,
                body: update_body.value,
                tags: tagsArray,
                media: update_media.value,
            };
            console.log(updated_post);

            //making api call here with accesstoken
            try {
                const response = await fetch(API_BASE_URL + UPDATE_POST_URL + postDetail.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedAccessToken}`,
                    },
                    body: JSON.stringify(updated_post),
                });

                //check if the server response was oks
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
    }
}
fetchPostData();


