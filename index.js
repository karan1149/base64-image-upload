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

  this.getB64Descriptor = function(String b64){
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
  this.upload = function(String b64, Object options, Function cb){
    var descriptor = this.getB64Descriptor(b64);
    var mime = descriptor.mime;
    if (options.mime){
      mime = options.mime;
    }
    console.log(descriptor, mime);
    file = new Buffer(descriptor.bare, 'base64');
    var paramsString = "?";
    for (key in options.params){
      paramsString = paramsString.concat(key + "=" + options.params.key);
    }
    if (paramsString == "?"){
      paramString == "";
    }
    request.post(this.getApiURL + paramsString)
  }

  this.upload = function(String b64, Function cb){
    this.upload(b64, {}, cb);
  }
}


module.exports = new Uploader();
