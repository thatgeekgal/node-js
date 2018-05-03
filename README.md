# node-js

Cross-platform, open source server environment that runs JavaScript 

Single thread, non blocking I/O, Asynchronous progamming which makes Node.js a fast server environment for modern web apps requiring high concurrent traffics

Node.js can be used to buid both server side applications (e.g. file systems, database connection) and client side applications (e.g. browser, DOM manipulation)

Apache vs Nginx vs Node.js
-  Apache (PHP): multi-threaded, blocking I/O, synchronous programming (memory intensive)
-  Nginx (PHP): single-threaded, event loop, non-blocking I/O, asynchronous programming (memory efficient)
-  Node.js (JavaScript): single-threaded, event loop, non-blocking I/O, asynchronous programming (memory efficient)

*How PHP or ASP handles*

Client (web browser) <-------> Server (web server) <--------> File system / Database
1. Client sends a file request to the server's file system
2. Client waits while the file system opens and reads the file
3. Server returns the content to the client
4. Server ready to handle the next reqeust
                    
*How Node.js handles*
Client (web browser) <-------> Server (web server) <--------> File system / Database
Client (web browser) <-------> Server (web server) <--------> File system / Database
Client (web browser) <-------> Server (web server) <--------> File system / Database
...
1. Client sends a file request to the server's file system
2. Server ready to handle the next request
3. When the file system opens and read the file, the server returns the content to the client.

## Express

Fast, unopinionated, minimalist web framework for Node.js

In order to auto-refresh changes,
`sudo npm install nodemon -g`
`nodemon server.js`

## Examples

1. Web Server to host files
2. RESTful Routes with parameters
3. Save data
    - data in memory
    - save to a text file (JSON)
    - Firebase (Google database as service)
    - CouchDB, MongoDB, Nedb
4. GET request by loadJSON()
5. POST request by httpPost() for security/hidden data and media/large file upload
    - `npm install body-parser --save` (POST request sends body including all info, to parse it, use body-parser package)
6. CORS (allow other sites to send GET or POST requests)
    - `npm install cors --save`
7. Sentimental Analysis
8. Twitter API
9. Weather API
10. Firebase 

## Sentimental Analysis

Keep a dictionary of words that either have a positive or a negative score associated with them

We will use AFINN-111 technique (comparative score vs total score), which is a list of English words rated for valenece with an integer between minus five (negative) and plus five (positive).

- total score: sum of scores for all words
- comparative score: sum of scores for all words / total number of words

`afinn111-text-to-json`: convert txt to JSON

