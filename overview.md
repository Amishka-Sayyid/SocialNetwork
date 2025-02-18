#**PROJECT FOLDERS OVERVIEW**

---

**page.js**

    here homepage details with links to various pages.

**api/saveprofile/route.js**

    here server side code for method POST to save the profile details.

**createProfile/page.js**

    form to save profile, use auth to verify and later link to send someone to their userpage.

**posts**

_posts/page_

    code for all posts to be viewed here from all users.

_posts/[id]/page.js_

    form to create posts.

**profile**

    this page is the protected page and here is where each user can be able to create,update,delete profile.

    also they have access to all their posts with option to update and delete.

    i used this page for that since ive ensured its protected as ill pass the clerkid in param to later update/delete profile.
    and for the posts i put the links to update/delete here as each user will see their own post with those links and nobody else's.

_profile/[id]/update-profile_

    form to update profile

_profile/[id]/update-profile_

    form to delete profile

**signin /signup**
those folders are for their respective purpose

**user/[username]**

    the page of each user that have their profile detail and all their own posts. everyone could see this page. but the link add/edit posts only owner can see the other's visiting can not see those 2 links.

**viewpost**
this folder is for the individual posts.
_viewpost/[id]/page_

    fetch post data and display's on the page along with username (when clicked shows userpage)

_viewpost/[id]/updatepost/page.js_

    form to update post.

_viewpost/[id]/updatepost/page.js_

    form to delete post

---

Initially, my focus was on developing the user profile and everything related to it. However, upon reviewing the project now, I realize I could have put more thought into the planning and organization of the pages. There’s definitely room for improvement in how I group the folders and structure the project to make it more efficient.
