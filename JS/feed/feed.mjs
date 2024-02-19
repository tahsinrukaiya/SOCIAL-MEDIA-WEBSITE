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

    //to loop over the array that is from the response
    for (let i = 0; i < 10 && i < posts.length; i++) {
      post_container.innerHTML += `
   <div class="col pt-3 px-3 pb-3">
              <div class="p-2 bg-light border border-primary rounded  text-black mx-3">
                  <h6 class="name">ID: ${posts[i].id}</h6>
                  <h6 class="pt-2 mx-3">Title: ${posts[i].title}</h6>
                  <div class="image_container">
                      <img src="${posts[i].media}" class="post_image">
                  </div>
                  <p class="mx-3 pt-3">${posts[i].body}</p>
                  <p class="mx-3">${posts[i].created}</p>
                  <p class="mx-3">${posts[i].updated}</p>
                  <div class="container mx-2">
                      <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                      <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
                  </div>
              </div>
  </div>`;
    }
  }
  catch (error) {
    console.log(error);
  }
}

fetchWithToken(API_BASE_URL + ALL_POSTS_URL);
