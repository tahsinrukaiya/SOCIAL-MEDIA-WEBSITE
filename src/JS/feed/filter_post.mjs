import { API_BASE_URL } from "../auth/constants.mjs";
import { ALL_POSTS_URL } from "../auth/constants.mjs";
import { formatDate } from "../date_format.mjs";


const posts_with_tag = document.getElementById('posts_with_tag');
const post_container = document.getElementById('post_container');

posts_with_tag.addEventListener('click', function () {
    console.log("post with tags is clicked");

    async function fetchFilteredData(url) {
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

                // Assign the loggedInUserName variable from loggedInUserProfile
                loggedInUserName = loggedInUserProfile.userName;
                console.log(loggedInUserName);
            }
            else {
                console.log("No user profile found in localStorage.");
            }


            // Filter posts that have some values in the tags array
            //This callback ensures that the post has values in the media, title, id, and tags properties, and that the tags property is an array with at least one element.
            //the filtering process will exclude posts where all tags are empty strings
            const filteredPosts = posts.filter(post =>
                post.media &&
                post.title &&
                post.id &&
                post.tags &&
                Array.isArray(post.tags) &&
                post.tags.some(tag => typeof tag === 'string' && tag.trim() !== '')
            );
            console.log(filteredPosts);


            // Initializing an empty string to accumulate HTML content
            let postsHTML = '';

            //to loop over the filtered array 
            for (let i = 0; i < filteredPosts.length; i++) {

                // Get the author information from the post
                const postAuthor = filteredPosts[i].author;

                // Format the created and updated dates using formatDate function
                const formattedCreatedDate = formatDate(posts[i].created);
                const formattedUpdatedDate = formatDate(posts[i].updated);

                // Check if the logged-in user is the author of the post
                const isAuthor = loggedInUserName === postAuthor.name;
                console.log(isAuthor);


                // Append the HTML content for the current post to the accumulator
                postsHTML += `
                <a class="main" href="single_post.html?id=${filteredPosts[i].id}&title=${filteredPosts[i].title}">
                    <div class="col-8 pt-3 px-3 pb-3 shadow">
                        <div class="p-2 mt-3 pt-2 px-3 bg-secondary border border-primary rounded text-black mx-3">
                            <h6 class="name">ID: ${filteredPosts[i].id}</h6>
                            <h6 class="pt-2 mx-3">Title: ${filteredPosts[i].title}</h6>
                            <div class="image_container">
                                <img src=${filteredPosts[i].media} class="img-fluid rounded mx-auto d-block">
                            </div>
                            <p class="mx-3 pt-3">By: ${filteredPosts[i].author.name}</p>
                            <p class="mx-3">Description: ${filteredPosts[i].body}</p>
                            <p class="mx-3">Tags: ${filteredPosts[i].tags}</p>
                            <p class="mx-3">Created on: ${formattedCreatedDate}</p>
                            <p class="mx-3">Updated on: ${formattedUpdatedDate}</p>
                            <div class="container mx-2">
                                <button type="button" class="btn btn-outline-success btn-sm">Like</button>
                                <button type="button" class="btn btn-outline-success btn-sm">Comment</button>
                            </div>
                            <div class="container mx-2 d-flex flex-row-reverse bg-secondary">
                                ${isAuthor ? `
                                    <a class="delete_post px-3" href="delete_post.html?id=${filteredPosts[i].id}&title=${filteredPosts[i].title}">Delete</a>
                                    <a class="update_post" href="update_post.html?id=${filteredPosts[i].id}&title=${filteredPosts[i].title}">Update</a>
                                ` : ''}
                            </div> 
                        </div>
                    </div>
                </a>
            `;
            }
            // Set the accumulated HTML content to the post_container.innerHTML after the loop
            post_container.innerHTML = postsHTML;
        }
        catch (error) {
            console.log(error);
        }
    }

    fetchFilteredData(API_BASE_URL + ALL_POSTS_URL + `?_author=true`);
})


