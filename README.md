Readable- A content and comment web app


Redux based react project for the React Nanodegree @ Udacity

This project was bootstrapped with from Create React App.

To get started:

 clone this repository.

Clone and run the server by following the instructions here: https://github.com/udacity/reactnd-project-readable-starter

cd to inside the repository directory of this application and   run npm install

then run   npm start  to launch the application.


This application consists of  4 main views:

  AppHome: This view list all the available categories which routes to different views based on the category. This view  consist of a  sub component called ListPosts  which
           lists all the post for the defined view. You can also sort by timestamp and vote date

  PostDetails view is details view for a specific post. There is were you will find comments associated with that post.

  Postform and Comment form are the views which allows a user to add a post or a comment.

  EditCommentModal and editPost modal leverages the modal capabilities and allow a user to edit a  post or comment.
