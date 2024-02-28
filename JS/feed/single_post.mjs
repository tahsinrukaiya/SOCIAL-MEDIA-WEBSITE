import { API_BASE_URL } from "../auth/constants.mjs";
import { SINGLE_POST_URL } from "../auth/constants.mjs";


function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}

//FUNCTION TO FETCH POST DETAIL USING ID AND TITLE-------------------------
async function fetchPostDetail() {

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

    // Include the token and query parameters in the URL
    const url = `${API_BASE_URL}${SINGLE_POST_URL}${postId}?${queryString}`;

    // Include the token in the headers of the fetch request
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
    const post_detail_container = document.getElementById('post_detail_container');

    post_detail_container.innerHTML = `<div class="col-8 pt-3 px-3 pb-3 shadow">
          <div class="p-2 mt-3 pt-3 px-3 bg-secondary border border-primary rounded  text-black mx-3">
              <h6 class="name">ID: ${postDetail.id}</h6>
              <h6 class="pt-2 mx-3">Title: ${postDetail.title}</h6>
              <div class="image_container">
                  <img src=${postDetail.media} class="post_image">
              </div>
              <p class="mx-3 pt-3">By: ${postDetail.author.name}</p>
              <p class="mx-3 pt-3">Description: ${postDetail.body}</p>
              <p class="mx-3 pt-3">Tags: ${postDetail.tags}</p>
              <p class="mx-3">Created on: ${postDetail.created}</p>
              <p class="mx-3">Updated on: ${postDetail.updated}</p>
              <div class="container mx-2">
                  <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                  <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
              </div>
              </div> 
</div>`;
}
fetchPostDetail();