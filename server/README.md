# Server
## Prerequisite
- Node.js v16.18.0
- MySQL Community Server v8.0.30
## Setup
1. Install packages
    ```bash
    npm install
    ```
2. Prepare the `.env` file
    - Make a copy of `.env.empty`
    - Rename the copy to `.env`
    - Fill in the environmental variables in there
## How to run
1. Make sure setup is completed
2. Start the server 
    ```
    npm start
    ```
    Please make sure port `PORT` indicate in `.env` is free (default is 3001).  
    Open [http://localhost:3001/status](http://localhost:3001/status) to validate.
    ```
    > server@1.0.0 start
    > node ./src/server.js

    Server running on port 3001
    Connected to MySQL server
    ```
## Common Problem
1. XXX is not a command
    - Makesure the correpdonding program has been added to system PATH
2. Failed to start: `Access denied for user`
    - Locate `/src/database/sql.js`
    - Replace `process.env.XXX` in the following part with the value in `.env` of `sql.js`
        ```
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database:  process.env.DATABASE_NAME
        ```
    