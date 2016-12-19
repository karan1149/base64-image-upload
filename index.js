var request = require('request');
function Uploader(){
  this.apiURL = null;

  // get and set API URL
  this.setApiUrl = function(url){
    this.apiUrl = url;
  }
  this.getApiUrl = function(){
    return this.apiUrl;
  }

  // overload upload method to make options object optional
  // b64 string can include MIME or not, options can include mime or not
  // options override string for MIME
  // options has optional keys: headers, params, mime
  this.upload = function(b64, options, cb){
    if (arguments.length < 2 || arguments.length > 3){
      throw "Argument error. Make sure the arguments provided are valid.";
    }
    // handle two arguments provided
    if (arguments.length == 2){
      cb = options;
      options = {};
    }
    var descriptor = {};
    var commaIndex = b64.indexOf(",");
    if (commaIndex == -1){
      descriptor = {bare: b64, mime: null};
    } else {
      semicolonIndex = b64.indexOf(";");
      descriptor = {bare: b64.substring(commaIndex + 1), mime: b64.substring(5, semicolonIndex)};
    }
    var mime = descriptor.mime;
    if (options.mime){
      mime = options.mime;
    }
    if (!mime){
      throw "No mime specified. You need to specify a mime string (e.g. 'image/png') either in the base64 input or the options argument.";
    }
    file = new Buffer(descriptor.bare, 'base64');
    var paramsString = "";
    for (key in options.params){
      paramsString = paramsString.concat("&" + key + "=" + options.params[key]);
    }
    if (paramsString){
      paramsString = "?".concat(paramsString.substring(1));
    }
    var requestHeaders = {};
    if (options.headers){
      requestHeaders = options.headers;
    }
    requestHeaders["Content-Type"] = mime;
    var requestUrl = "";
    if (!options.url){
      if (!this.getApiUrl()){
        throw "No API URL specified. Use setApiUrl to set a URL";
      }
      requestUrl = this.getApiUrl() + paramsString;
    } else {
      requestUrl = options.url + paramsString;
    }
    request.post({url: requestUrl, body: file, headers: requestHeaders}, cb);
  }
}


module.exports = new Uploader();
