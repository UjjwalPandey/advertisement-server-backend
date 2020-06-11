# Ad-Server Application

Build a Ad-server application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

    ```bash
        npm install express
        npm install body-parser
        npm install express-rate-limit

    ```

2. Run Server

    ```bash
        node server.js
    ```

You can browse the apis at <http://localhost:3000>

3. APIs

    i)  /api/getAdvertisementList
        cURL:
        ``` bash   
            curl --header "Content-Type: application/json" --request POST --data '{"user_id":"1002"}' http://localhost:3000/api/getAdvertisementList
        ```

    ii) /api/recordUserInteraction
        cURL:
        ``` bash
            curl --header "Content-Type: application/json" --request POST --data '{"user_id":"1001","advertisement_id":"1004", "action_type":"views"}' http://localhost:3000/api/recordUserInteraction
        ```

