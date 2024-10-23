
# GraphApp Messenger

<pre>  
                .oPYo.                    8          .oo                              
                8    8                    8         .P 8                              
                8      oPYo..oPYo. .oPYo. 8oPYo.   .P  8 .oPYo. .oPYo.                
                8   oo 8  `'.oooo8 8    8 8    8  oPooo8 8    8 8    8                
                8    8 8    8    8 8    8 8    8 .P    8 8    8 8    8                
                `YooP8 8    `YooP8 8YooP' 8    8.P     8 8YooP' 8YooP'                
                :....8 ..::::.....:8 ....:..:::...:::::..8 ....:8 ....:               
                :::::8 ::::::::::::8 ::::::::::::::::::::8 :::::8 :::::               
                :::::..::::::::::::..::::::::::::::::::::..:::::..:::::               
                                                                                
                        o     o                                                    
                        8b   d8                                                    
                        8`b d'8 .oPYo..oPYo..oPYo..oPYo. odYo. .oPYo. .oPYo. oPYo. 
                        8 `o' 8 8oooo8Yb..  Yb..  8oooo8 8' `8 8    8 8oooo8 8  `' 
                        8     8 8.      'Yb.  'Yb.8.     8   8 8    8 8.     8     
                        8     8 `Yooo'`YooP'`YooP'`Yooo' 8   8 `YooP8 `Yooo' 8     
                :::::::::::..::::..:.....:.....:.....:.....:..::..:....8 :.....:..::::
                ::::::::::::::::::::::::::::::::::::::::::::::::::::ooP'.:::::::::::::
                ::::::::::::::::::::::::::::::::::::::::::::::::::::...:::::::::::::::

</pre>

## About it

This project is a challenge for the recruitment process at Sellia. It is a small chat room developed with a GraphQL API built using Express, Apollo Server, WebSocket, and MongoDB. 
this repo is for the frontend, it is a Vue 3 application that consumes data through GraphQL queries and mutations, and handles real-time message exchange through GraphQL subscriptions.

> [Backend is here](https://github.com/jfcodiaz/GraphAppMsj-Api)

### Features
#### Frontend
- SPA built in Vue3 with Vuex for data store
- Login with a username (No authentication required)
- Connect to backend via WebSocket using GraphQL subscriptions
- List all history messages paginated (with a reverse infinite scroll)
- List messages according to the time they were sent
- Display the user who sent the message
- Format messages as input (left) and sent (right)
- Show how long ago the message was sent
- Show new incoming messages and scroll to the bottom if the user is below 70% of the scroll
- Only allow usernames with letters and numbers (no special characters), and the username cannot begin with numbers
- Validate that empty messages cannot be sent
- Prepopulate the database with default fake old messages when setting up the project
- Design responsive for mobile (Sass and Media Queries)

#### Backend
- GraphQL API
- Mutation for sending new messages
- Mutation for registering ("login")
- Query for old messages
- GraphQL subscription for receiving new messages
- Connect to MongoDB using Mongoose

## Run on Docker

You can run it on localhost (including backend) using the docker image `jfcodiaz/graphappmsj:latest`:

Run in a terminal
```sh
docker run --name graphappmsj -d -p 8085:80 -p 4000:4000 -p 27017:27017 jfcodiaz/graphappmsj:latest
```
When the download and startup process finishes, you will be able to access it at:

- Frontend: [http://localhost:8085/](http://localhost:8085/)
- Backend:  [http://localhost:4000/graphql](http://localhost:4000/graphql)
- MongoDB at port `27017` which you can access with Compass or any Mongo client

Stop the container
```sh
docker stop graphappmsj
```
Start it again
```sh
docker start graphappmsj
```
Remove the container
```sh
docker rm graphappmsj
```

## Setup for development with Docker

If you want to check it and set it up locally for development:

> **First, set up the backend project**, [it's available in this repository](https://github.com/jfcodiaz/GraphAppMsj-Api) 

Clone this repository 
```sh
git clone git@github.com:jfcodiaz/GraphAppMsj_vue.git
```
Enter the repository folder
```sh
cd GraphAppMsj_vue
```
> Make sure port `8085` is available.

### If you use Linux or Mac

Run the initialization script, it configures everything automatically 
```sh
sh setup
```
and that's it!

Then you can access [http://localhost:8085/](http://localhost:8085/) in your browser.

### Otherwise...
1. Copy the `.env.example` file as `.env`
```sh
cp .env.example .env
```
2. Start the containers
```sh
docker-compose up 
```
3. Open another terminal and enter the `chat-frontend` container
```sh
docker exec -it chat-frontend sh
```
4. Install node dependencies
```sh
yarn install
```
5. Run the development server
```sh
yarn run serve
```
Then you can access [http://localhost:8085/](http://localhost:8085/) in your browser.

### If you prefer to set up without Docker
Enter the `GraphAppMsj_vue/code` folder
```sh
cd GraphAppMsj_vue
cd code
```
Copy the `.env.example` to `.env`
```sh
cp .env.example .env
```
Install node dependencies
```sh
yarn install
```

Run the development server
```sh
yarn run serve
```
Then you can access [http://localhost:8085/](http://localhost:8085/) in your browser.

<pre>
  _____        _            _____     _             
 |  __ \      | |          |  __ \  /_/            
 | |__) |__ _ | | __ ___   | |  | | _   __ _  ____
 |  ___// _` || |/ // _ \  | |  | || | / _` ||_  /
 | |   | (_| ||   <| (_) | | |__| || || (_| | / / 
 |_|    \__,_||_|\_\\___/  |_____/ |_| \__,_|/___|
                                                  

</pre>