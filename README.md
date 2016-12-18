# Base64 Image Upload
This is a simple NPM package for uploading (using a POST request) image data to APIs with restrictive interfaces. 

Specifically, there is a scarcity of documentation online on how to upload base64-encoded images to (increasingly rare) APIs that only accept binary data, not `application/x-www-form-urlencoded` or `multipart/form-data`, and this package makes it easy to do so.

## Install 
```javascript
npm install base64-image-upload --save
```
## Usage
```javascript
var uploader = require('base64-image-upload');
```

## License 
ISC

### Note

I discovered a need for this package while trying to upload images to the sparsely documented Groupme Image Service. Most APIs allow images to be sent as part of form structures specified by `application/x-www-form-urlencoded` or `multipart/form-data`, but Groupme did not. After trying nearly every possible combination of encoding and packaging of POST requests, I found the one that worked and packaged it in this NPM package.
