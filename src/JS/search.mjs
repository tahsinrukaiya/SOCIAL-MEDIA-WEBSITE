import { API_BASE_URL } from "./auth/constants.mjs";
import { ALL_POSTS_URL } from "./auth/constants.mjs";

const post_container = document.getElementById('post_container');

document.addEventListener('DOMContentLoaded', () => {
    const search_form = document.getElementById('search_form');

    search_form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input field value
        const search_input_value = document.getElementById('search_input').value;


        console.log('Search input value:', search_input_value);

        // working with search input value in API call

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

                //Get the logged-in user's info from localStorage
                const loggedInUserInfo = localStorage.getItem('user_profile');

                // Declaring loggedInUserName outside the if-block
                let loggedInUserName;

                // Check if the string is not null or undefined
                if (loggedInUserInfo) {
                    // Parse the JSON string into an object
                    const loggedInUserProfile = JSON.parse(loggedInUserInfo);

                    // Assign the loggedInUserName variable from loggedInUserProfile
                    loggedInUserName = loggedInUserProfile.userName;
                }
                else {
                    console.log("No user profile found in localStorage.");
                }


                // Create a variable to store the HTML for matched posts
                let matchedPostsHTML = '';

                //to loop over the array that is from the response
                for (let i = 0; i < posts.length; i++) {

                    // Check if the post has media before displaying
                    if (posts[i].media && posts[i].title && posts[i].id) {

                        // Get the author information from the post
                        const postAuthor = posts[i].author;

                        // Check if the logged-in user is the author of the post
                        const isAuthor = loggedInUserName === postAuthor.name;

                        // Check if the search term is present in the title or body of the post
                        const searchTermFound = posts[i].title.includes(search_input_value) || posts[i].body.includes(search_input_value);
                        console.log("your search:", searchTermFound);



                        // Display the post only if it matches the search term
                        if (searchTermFound) {

                            console.log("Search term found!");
                            matchedPostsHTML += `
                    <a class="main" href="single_post.html?id=${posts[i].id}&title=${posts[i].title}">
                    <div class="col-8 pt-3 px-3 pb-3 shadow">
                    <div class="p-2 mt-3 pt-2 px-3 bg-secondary border border-primary rounded  text-black mx-3">
                        <h6 class="name">ID: ${posts[i].id}</h6>
                        <h6 class="pt-2 mx-3">Title: ${posts[i].title}</h6>
                        <div class="image_container">
                        <img src=${posts[i].media} class="img-fluid rounded mx-auto d-block" alt="...">
                           </div>
                        <p class="mx-3 pt-3">By:${posts[i].author.name}</p></a>
                        <p class="mx-3">Description: ${posts[i].body}</p></a>
                        <p class="mx-3">Tags: ${posts[i].tags}</p>
                        <p class="mx-3">Created on: ${posts[i].created}</p>
                        <p class="mx-3">Updated on: ${posts[i].updated}</p>
                        <div class="container mx-2">
                            <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                            <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
                        </div>
                        <div class="container mx-2 d-flex flex-row-reverse bg-secondary">
                        ${isAuthor ? `
                        <a class="delete_post px-3" href ="delete_post.html?id=${posts[i].id}&title=${posts[i].title}">Delete</a>
                       <a class="update_post" href ="update_post.html?id=${posts[i].id}&title=${posts[i].title}">Update</a>
                      ` : ''}
                        </div> 
                        </div>        
                     </div> `;
                        }
                    }
                }

                // Display the HTML for matched posts in the post_container
                post_container.innerHTML = matchedPostsHTML;
            }

            catch (error) {
                console.log(error);
            }

        }

        fetchWithToken(API_BASE_URL + ALL_POSTS_URL + `?_author=true`);
    });
});



