# Base64 Image Upload
This is a simple NPM package for uploading (using a POST request) image data to APIs with restrictive interfaces.

Specifically, there is a scarcity of documentation online on how to upload base64-encoded images to APIs that only accept binary data, not `application/x-www-form-urlencoded` or `multipart/form-data`, and this package makes it easy to do so. This package will also work with base64-encoded strings that are not images.

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

## Interface
### uploader.setApiUrl(url)
Set the API URL to upload images to.

### uploader.getApiUrl()
Get the current API URL. Returns null if it was never set.

### uploader.upload(base64String, [options], callback)
Base64String can be bare (e.g. `iVBORw0K...`) or use the Data URI scheme (e.g. `data:image/png;base64,iVBORw0K...`). If the string is bare, options.mime needs to contain a valid MIME type string (e.g. "image/png" or "image/jpeg").

Callback should take in two arguments, error and response. The response object will have the same structure as that returned by the [request](https://github.com/request/request) package. Specifically, response.statusCode and response.body are what you expect.

#### options

Object that can be (optionally) used as the second argument in a call to `uploader.upload`.

###### mime
String that contains the mime type of the file to upload (e.g. "image/png" or "image/jpeg"). If mime is specified both in options and through the Data URI, options will override the Data URI.

###### headers
HTTP headers to add to the POST request. Content-Type will be automatically appended based on the MIME type specified in options.mime or the Data URI.

###### params
Parameters to add to the API URL as a query string. For example, if options.params = {"hello": "world"}, and uploader.getApiUrl() == "https://yourimageapi.com/upload", then the POST request will be made to "https://yourimageapi.com/upload?hello=world".

###### url
If provided, used instead of `uploader.getApiUrl()` to get base API URL for the current upload.

## Dependencies
[request](https://github.com/request/request): Version >= 2.79.0

## License
ISC

### Development Note

I discovered a need for this package while trying to upload images to the sparsely documented Groupme Image Service. Most APIs allow images to be sent as part of form structures specified by `application/x-www-form-urlencoded` or `multipart/form-data`, but Groupme did not. After trying nearly every possible combination of encoding and packaging of POST requests, I found the one that worked and packaged it in this NPM package.
