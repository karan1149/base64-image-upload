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

var image = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
uploader.setApiUrl("https://yourimageapi.com/upload");
uploader.upload(image, {mime:"image/png", headers: {'X-Access-Token': '123456789'}}, function(err, response){
  if (!err && response.statusCode == 200){
    console.log(JSON.parse(response.body));
    // handle response
  } else {
    console.log(err, response);
    // handle errors
  }
});
```

Another example using the Data URI scheme in the base64 string. If this scheme is used, the MIME can be left out of the call to `uploader.upload`.

```javascript
var uploader = require('base64-image-upload');

var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
uploader.setApiUrl("https://yourimageapi.com/upload");
uploader.upload(image, {headers: {'X-Access-Token': '123456789'}}, function(err, response){
  if (!err && response.statusCode == 200){
    console.log(JSON.parse(response.body));
    // handle response
  } else {
    console.log(err, response);
    // handle errors
  }
});
```

Another example leaving out the (optional) options argument, if no headers, URL params, or MIME need to be specified.
```javascript
var uploader = require('base64-image-upload');

var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
uploader.setApiUrl("https://yourimageapi.com/upload");
uploader.upload(image, function(err, response){
  if (!err && response.statusCode == 200){
    console.log(JSON.parse(response.body));
    // handle response
  } else {
    console.log(err, response);
    // handle errors
  }
});
```


## License
ISC

### Note

I discovered a need for this package while trying to upload images to the sparsely documented Groupme Image Service. Most APIs allow images to be sent as part of form structures specified by `application/x-www-form-urlencoded` or `multipart/form-data`, but Groupme did not. After trying nearly every possible combination of encoding and packaging of POST requests, I found the one that worked and packaged it in this NPM package.
