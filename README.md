# node-js

Server-side programming and Node

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
    - `npm install body-parser --save` (POST request sends body including all info, to part it, use body-parser package)
6. CORS (allow other sites to send GET or POST requests)
    - `npm install cors --save`

## Sentimental Analysis

Keep a dictionary of words that either have a positive or a negative score associated with them

We will use AFINN-111 technique (comparative score vs total score), which is a list of English words rated for valenece with an integer between minus five (negative) and plus five (positive).

- total score: sum of scores for all words
- comparative score: sum of scores for all words / total number of words

`afinn111-text-to-json`: convert txt to JSON

