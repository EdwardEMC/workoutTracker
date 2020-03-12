# workoutTracker

An application to track a users exercises.

As a user I want to be able to track my workouts
So that I can know what exercise I've done
In order to find out the best workout routine.

Landing on the homepage will display one option for a new user, new workout and two options for returning users, continue workout and new workout.

![home](/public/images/homeSS.jpg?raw=true "home")

Creating or continuing a workout will allow a user to add exercises to that workout. If a workout is created a new collection is added to the database with a timestamp of the current time/day.

![workout](/public/images/workoutSS.jpg?raw=true "workout")

Clicking on the dashboard will give the user their stats for the last 7 days, dynamically updated to the current day. These stats include the workout durations, pounds lifted and the different exercises performed.

![stats](/public/images/statsSS.jpg?raw=true "stats")

# Built with
Semantics /
Jquery /
MongoDb /
Mongoose /
Node.js

# Authors
Edward Coad

# Acknowledgements
mlab /
stackoverflow.com /
w3school.com /
heroku.com