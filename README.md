![alt text](UserStories.png)

---

![alt text](StretchUserStories.png)

---

# ** Reflection**

---

_Required_

🎯 What requirements did you achieve?

    🎯 Set up user sign-up and user login using Clerk.

    🎯 Use 1 or more Radix UI Primitive component, or something similar (e.g. use of a different component library to enhance UX, not just Tailwind).=used mui for the header and footer.

    🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route (e.g. /user/[userId]).
    =>here i created a profile page. when user is new and hasn't created a profile they see a link create profile this link is only available once when user is new to create the profile after on the page they see the update and delete links. this page(/profile) is protected and only users with account can view the respective links inside the page can only show the details of each user alone.

    🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.
    =>this in user/[username] the user detail allong with the associated posts can be seen and in posts all posts from all users are there.

    -🎯 Create and display an error/not found page if the user visits a page that doesn’t exist.

    for stretch user
    - i have done an update / delete for the user profile

    -🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.
    ->for this when one goes to profile if its there 1st time they can see create profile link (this can only be seen once if no profile created)after they can see the other links

    -done this 🏹 Allow users to view other profiles directly from posts they see on the global timeline, using a dynamic users route.

    -🐿️ As a user, I want to edit the content of my posts, so that I can correct any spelling mistakes or add content that I forgot.

    🐿️ As a user, I want to delete my posts, so that I can remove duplicated content accidentally posted.

    added meta data to most pages (createprofile,signin,signup had to remove as i had issue with use client and the metadata  but all others i have metadata for them)

🎯 Were there any requirements or goals that you were unable to achieve?

    🏹 Let users follow each other by establishing a follower and followee relationship between profiles.

    🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.

🎯 If so, what was it that you found difficult about these tasks?

    At the beginning, setting up the overall structure and connecting Clerk with Supabase felt quite challenging.
    I initially followed several tutorials online, but it still seemed overwhelming. However, taking a step back and focusing on just implementing the 'Create Profile' feature first really helped me break down the task and gradually gain a better understanding of the process.
    This week's assignment has been incredibly eye-opening. The complexity of the task truly humbled me, and it's clear that there's so much more to learn. I'm excited and eager to continue expanding my knowledge and skills.

---

_Optional_

🏹Requesting feedback about a specific part of your submission.

🏹What useful external sources helped you complete the assignment (e.g Youtube tutorials)?

    -class workshops helped me alot i refered back to it  alot when doing the assignment.

    -https://youtu.be/t90U6iuv8wo?si=kuDPz41otUkt7Ig9

    -https://youtu.be/ICNulnfQvd8?si=44Zu63u5fkHS_YLT

    -https://www.sandromaglione.com/articles/supabase-database-user-sign-up-and-row-level-security

    -https://youtu.be/HvOvdD2nX1k?si=C0wPQFsOX-enifTk

    -https://clerk.com/docs/integrations/databases/supabase when trying to save the clerk id into supabase went through all process till last one where it wasn't ok for me in the end i tried the method of just getting the id from clerk and saving it in the db and in the db each user again has a local id which later ill use for the postsid foreign key.

    -

🏹What errors or bugs did you encounter while completing your assignment? How did you solve them?

    when user signup the redirect route doesn't come up so i created a profile page where there are links that enables the user to add profile,update, delete.
    adding link is conditionally rendered and can only be viewed once when user is new and doesn't have  one to prevent having more than one data in db.
    the profile page is protected and can be viewed only signed in users.

🏹What went really well and what could have gone better?

---
