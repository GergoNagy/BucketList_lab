/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__(1);
var CountriesView = __webpack_require__(2);

function app(){

    var countriesData = new AjaxRequest('https://restcountries.eu/rest/v2/name/');
    var countriesView = new CountriesView(countriesData);
    


    var form = document.querySelector('#searchForm');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        this.country = document.getElementById('searchText').value;
        countriesData.getCountry(this.country, countriesView.render);
    })


    
}


window.addEventListener('load', app);





/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__(1);
var CountriesView = function(){

}

var bucketRender = function(data){
    console.log("bucket data log", data)
}

CountriesView.prototype.render = function (data){

    var countries = document.querySelector('#countries')
    countries.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var output = document.createElement('div')
        var element = data[i];
        output.innerHTML += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${element.flag}">
                        <h5>${element.name}</h5>
                         <a id="button-${i}" data-country='${JSON.stringify(element)}' class="btn btn-primary" href="#">Add to the bucket list</a>
                        </div>
                    </div>
                    `;
     
        countries.appendChild(output);

        var button = document.querySelector("#button-" + i);
        button.addEventListener('click', function(e){
            e.preventDefault();

            var newCountry = this.dataset.country;
            var countryData = new AjaxRequest('http://localhost:3000/api/bucketlist')
            var countryView = new CountriesView(countryData);

            countryData.postToBucketList(bucketRender, newCountry );


            // console.log(this.dataset.country);
            // console.log("kdjfhgdjfh",newCountry);
            // return this.dataset.country
            //new ajaxrequest to post to mongo

            
        })
    }


    
}

module.exports = CountriesView;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map