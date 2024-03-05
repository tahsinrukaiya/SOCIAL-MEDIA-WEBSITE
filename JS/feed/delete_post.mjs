
import { API_BASE_URL } from "../auth/constants.mjs";
import { DELETE_POST_URL } from "../auth/constants.mjs";

const delete_btn = document.getElementById('delete_btn');
const cancel_btn = document.getElementById('cancel_Btn');


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
async function deletPostData() {

    const postId = getPostIdFromQuery();
    const postTitle = getPostTitleFromQuery();

    // Retrieve the access token from local storage
    const storedAccessToken = localStorage.getItem('accessToken');

    // Check if an access token is available
    if (storedAccessToken) {
        console.log('Access Token loaded from local storage:', storedAccessToken);

        //for making authenticated API requests.
    } else {
        console.log('No Access Token found in local storage');
    }


    delete_btn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_BASE_URL + DELETE_POST_URL + postId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedAccessToken}`,
                },
            });

            if (!response.ok) {
                //more details about the error returned by the server
                const errorText = await response.text();
                console.error("Error from server:", errorText);
                throw new Error("Network Issue");
            }
            else {
                console.log("Post deletion successful!");

                // Triggering the Bootstrap modal
                var delete_modal = new bootstrap.Modal(document.getElementById('delete_modal'));
                delete_modal.show();

                // To reload the page after the modal is closed
                delete_modal._element.addEventListener('hidden.bs.modal', function () {
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
    })
};

deletPostData();