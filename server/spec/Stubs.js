// Methods for stubbing HTTP requests and responses
module.exports = {

// What server is sending back. All this starts empty, gets updated
// by writeHead and then sent back as Response data.
  response: function() {
    this._ended = false;
    this._responseCode = null;
    this._headers = null;
    this._data = null;

    // Populates responseCode and Headers, binds to this Object in response
    // 
    this.writeHead = function(responseCode, headers) {
      this._responseCode = responseCode;
      this._headers = headers;
    }.bind(this);

    this.end = function(data) {
      this._ended = true;
      this._data = data;
    }.bind(this);
  },

  // This comes from the user supplying these parameters.
  request: function(url, method, postdata) {
    this.url = url;
    this.method = method;
    this._postData = postdata;
  
    this.setEncoding = function() { /* noop */ };

    this.addListener = this.on = function(type, callback) {
      if (type == 'data') {
        callback(JSON.stringify(this._postData));
      }

      if (type == 'end') {
        callback();
      }

    }.bind(this);
  }
};

// var storage = {
//     '/classes/room1/': [],
//   };

// var data = {url: 'http://127.0.0.1:3000/classes/chatterbox/', username: "Barney Flinestone", text: "Yaba Daba Doo", results: []};
// var stringified = JSON.stringify(data);

// exports.stringified = stringified;