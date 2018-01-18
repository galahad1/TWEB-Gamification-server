# TWEB-Gamification-server

Authors: Galahad and Avend0Black

This is an express server for gamification.

## Purpose
The goal of this server is the gamification of any work environment.
For the client you will give points for any achievement you want when using your applications.
As an example we implemented a client in the context of a login. We give points depending of the password's strength. You can find the client application [here](https://github.com/lassalleloan/TWEB-Gamification-client/)


As we work with contexts you can easily define different weight to the points of a given application's context (1 point in the login context may match 0.1 point in an other context, hour connected to a given work application, for instance).

## Use
As we deployed our server with heroku you can access it with :
https://stormy-hamlet-80891.herokuapp.com/


## Save points

You can use a POST method to /event endpoint to manage points of the users.
Here's an example of the JSON payload. If the user dosen't exist, it will create him.

https://stormy-hamlet-80891.herokuapp.com/event

`{
	"app":"mail",
	"type":"login",
	"properties":
	{
		"username":"test",
		"strength": "3"
	}
}`

* app is the application that made the post request.
* type is the context from which the users will earns points. It is used to give different weights depending of the type.
* username: The player who make points
* strength: Is the strength of the password in the login of the mail application.

## Register player
You also can register an user without giving him points
https://stormy-hamlet-80891.herokuapp.com/user

`{
	"username":"Bernard"
}`


## Scoreboard

To display the Scoreboard simply make a GET request on https://stormy-hamlet-80891.herokuapp.com/scoreboard

`{
  "username": "test",
  "score": 4300,
  "recentScore": 4300
}`

* username: username of a player
* score: Total score of an user
* recentScore: score made this last 30 days
