import { API_BASE_URL, user_name } from "../auth/constants.mjs";
import { ALL_POSTS_URL } from "../auth/constants.mjs";

const main_container = document.getElementById('main_container');
const post_container = document.getElementById('post_container');


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
    const posts = await response.json();
    console.log(posts);

    //Get the logged-in user's info from localStorage
    const loggedInUserInfo = localStorage.getItem('user_profile');

    // Declaring loggedInUserName outside the if-block
    let loggedInUserName;

    // Check if the string is not null or undefined
    if (loggedInUserInfo) {
      // Parse the JSON string into an object
      const loggedInUserProfile = JSON.parse(loggedInUserInfo);

      //accessing the profile information
      console.log("user_name:", loggedInUserProfile.userName);
      console.log("user_email:", loggedInUserProfile.userEmail);
      console.log("user_avatar:", loggedInUserProfile.userAvatar);

      // Assign the loggedInUserName variable from loggedInUserProfile
      loggedInUserName = loggedInUserProfile.userName;
      console.log(loggedInUserName);
    }
    else {
      console.log("No user profile found in localStorage.");
    }

    //to loop over the array that is from the response
    for (let i = 0; i < posts.length; i++) {

      // Check if the post has media before displaying
      if (posts[i].media && posts[i].title && posts[i].id) {

        // Get the author information from the post
        const postAuthor = posts[i].author;

        // Check if the logged-in user is the author of the post
        const isAuthor = loggedInUserName === postAuthor.name;
        console.log(isAuthor);

        post_container.innerHTML += `
        <a class="main" href="single_post.html?id=${posts[i].id}&title=${posts[i].title}">
       <div class="col-8 pt-3 px-3 pb-3 shadow">
              <div class="p-2 mt-3 pt-3 px-3 bg-secondary border border-primary rounded  text-black mx-3">
                  <h6 class="name">ID: ${posts[i].id}</h6>
                  <h6 class="pt-2 mx-3">Title: ${posts[i].title}</h6>
                  <div class="image_container">
                      <img src=${posts[i].media} class="post_image">
                  </div>
                  <p class="mx-3 pt-3">By:${posts[i].author.name}</p></a>
                  
                  <p class="mx-3 pt-3">Description: ${posts[i].body}</p></a>
                  <p class="mx-3 pt-3">Tags: ${posts[i].tags}</p>
                  <p class="mx-3">Created on: ${posts[i].created}</p>
                  <p class="mx-3">Updated on: ${posts[i].updated}</p>
                  <div class="container mx-2">
                      <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                      <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
                  </div>
                  <div class="container mx-2 d-flex flex-row-reverse bg-secondary">
                  ${isAuthor ? `
                 <a class="delete px-3" href = "delete_post.html">Delete</button></a>
                 <a class="update" href = "update_post.html">Update</button></a>
                ` : ''}
                  </div> 
                  </div>        
  </div> `;
      }
    }
  }

  catch (error) {
    console.log(error);
  }
}

fetchWithToken(API_BASE_URL + ALL_POSTS_URL + `?_author=true`);




