![Totalisator banner](/readme-assets/logo.png)
## TOTALISATOR 3.0 - Web Application

### LAUNCHING INSTRUCTIONS
1. `git clone https://github.com/verbusharas/totalisator3.git`
2. Rename `application-example.properties` to `application.properties` and configure it according to your database and credentials, or in case of a live demonstration - switch with the developer provided application.properties file.
4. Run tot-server-side (Spring Boot Application)
5. Run tot-client-side (React Web Application)
6. Try out the application on localhost:3000
7. In case of wanting to use demo soccer fixtures api, launch tot-demo-fixtures-api/App.js (Node Express Application). I recommend using nodemon for enabling live updates. Start API with command `nodemon app.js`. Server will run on port 3001.

 ### APPLICATION DESCRIPTION AND FEATURES
 
#### How to use
 This is an betting game app for predicting score outcomes of soccer matches. All instructions how to use are provided in webpages themselves in lithuanian and english languages. 
 
#### Totalisators
Registered users can create or participate in prediction tournaments called "Totalisators". Each totalisator can host unlimited amount of players and matches to predict. 

#### Managers
User who decides to create a new totalisator becomes a manager of that totalisator and can start inviting players form his/her friend list. Manager can attend the tournament together with other players but is also responsible for selecting which matches for players to predict and can customize point calculation settings, add/remove players. 

#### Soccer match selection
Matches can be selected from official FIFA fixtures registered for specified date. These fixtures are provided by external provider Soccer's API. For demonstration purposes a demo fixture feed app is included in order to be able to tryout functionality with fake fixtures. 

#### Player predictions
When manager registers a new match - all users are notified in their totalisator overview page and are asked to provide a score prediction. Once the match goes live - player predictions are no longer accepted and are defaulted to 0 - 0 if missing. 

#### Points and standings
Live match results appear in the top menu throughout the duration of the soccer game. After the monitored match is finished - the point payouts are calculated and distributed among players. The closer the prediction the more points are received. The received awards are added to overall tournament totals that are always displayed in form of tournament standings table.
