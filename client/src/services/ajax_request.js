var AjaxRequest = function(url){
    this.url = url;
    this.country = [];
    this.bucketList = [];
}

AjaxRequest.prototype.getCountry = function (country, callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url + country);
    request.onload = function(){
        if(request.status === 200){
            var jsonString = request.responseText;
            this.country = JSON.parse(jsonString);
            callback(this.country);
        }
    }.bind(this);
    request.send();
}

AjaxRequest.prototype.postToBucketList = function (callback, bucketList) {
    var request = new XMLHttpRequest();
    request.open("POST", this.url );
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            this.bucketList = JSON.parse(jsonString);
            callback(this.bucketList);
        }
    }.bind(this);
    // console.log("ajax",bucketList)
    request.send(bucketList);
}

module.exports = AjaxRequest;