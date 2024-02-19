import { API_BASE_URL } from "../auth/constants.mjs";
import { ALL_POSTS_URL } from "../auth/constants.mjs";

const post_container = document.getElementById("post_container");

async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const posts = await response.json();
    console.log(posts);

    //to loop over the array we got from the response

    for (let i = 0; i < posts.length; i++) {
      post_container.innerHTML += `
      <div class="container-md mt-2 mx-2 d-flex justify-content-center align-items-center h-100 w-100"
      id="post_container">
      <div class="d-grid gap-3 w-75">
          <div class="p-2 bg-light border text-primary rounded">
            <h6 class="text-black name">Post id: ${posts[i].id}</h6>
              <h6 class="text-black name">Title: ${posts[i].title}</h6>
              <h6 class="pt-2 ms-2">${posts[i].body}</h6>
              <div class="image">
                  <img src="${posts[i].media}" class="post_image">
              </div>
              <p class="mx-3">Tags: ${posts[i].tags}</p>
              <h6 class="mx-3">Created on: ${posts[i].created}</h6>
              <h6 class="mx-3">Updated on: ${posts[i].updated}</h6>
              <div class="container mx-2">
                  <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                  <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
              </div>
              </div>
              </div>
  </div> `;
    }
  }
  catch (error) {
    console.log(error);
  }
}

fetchWithToken(API_BASE_URL + ALL_POSTS_URL);












