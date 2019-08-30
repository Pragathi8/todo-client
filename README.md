!____________________________________________________________TODO APP_________________________________________________________________!

Simple Todo App

===============================================================================================

Tech Stack

===============================================================================================

1. React for front-end
2. Redux for store management
3. Express for server
4. Firebase as database

Made it a PWA, using serviceWorker and writing all the required events

5. Indexed DB for offline data storage, and serviceWorker events for background sync

=================================================================================================

Enhancements / Known Issues

==================================================================================================

1. Data modified while online won't be displayed if page goes offline without reloading.
      Issue: Caching of data is only being done on page reload
             Not updating the cache on modifying operations

2. Date modified while offline won't be displayed if reloaded, but it will get stored when page goes online.
      Issue: Same reason as above, CACHE is not updated.
    
3. No offline Support for register, Can add a fallback page

4. After background sync, data changes in firebase won't be reflected since there is no subscription. 
   2nd Reload is needed.

5. Empty Check for adding a todo can be implemented.

6. Icon can be provided for toggling todo for user experience, and editing todo can also be added.

7. UI styling can be enhanced at many areas.

========================================================================================================================

For local Usage

1. Pre-requisites: Node is to be installed

2. clone this repository

3. 'npm install' in command prompt

4. clone the server-side present at the repo https://github.com/chaitu843/todo-server and do the 3rd step again for that project.

5. Now run two projects using 'npm run start' which will start your server in port 5000 and react project in port 3000

=========================================================================================================================

Deployed in heroku and accessible at https://evening-depths-45358.herokuapp.com

=========================================================================================================================


======================================================================================================