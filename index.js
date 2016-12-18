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

  this.getB64Descriptor = function(b64){
    var commaIndex = b64.indexOf(",");
    if (commaIndex == -1){
      return {bare: b64, mime: null};
    } else {
      semicolonIndex = b64.indexOf(";");
      return {bare: b64.substring(commaIndex + 1), mime: b64.substring(5, semicolonIndex)};
    }
  }


  // overload upload method to make options object optional
  // b64 string can include MIME or not, options can include mime or not
  // options override string for MIME
  // options has optional keys: headers, params, mime
  this.upload = function(b64, options, cb){
    var descriptor = this.getB64Descriptor(b64);
    var mime = descriptor.mime;
    if (options.mime){
      mime = options.mime;
    }
    console.log(descriptor, mime);
    if (!mime){
      throw "No mime specified. You need to specify a mime string (e.g. 'image/png') either in the base64 input or the options argument.";
    }
    if (!this.getApiURL()){
      throw "No API URL specified. Use setApiUrl to set a URL";
    }
    file = new Buffer(descriptor.bare, 'base64');
    var paramsString = "?";
    for (key in options.params){
      paramsString = paramsString.concat(key + "=" + options.params.key);
    }
    if (paramsString == "?"){
      paramString == "";
    }
    var requestHeaders = {};
    if (options.headers){
      requestHeaders = options.headers;
    }
    requestHeaders["Content-Type"] = mime;
    console.log(this.getApiURL() + paramsString, requestHeaders);
    request.post({url: this.getApiURL() + paramsString, body: file, headers: requestHeaders}, cb);
  }

  this.upload = function(b64, cb){
    this.upload(b64, {}, cb);
  }
}


module.exports = new Uploader();
