var AjaxRequest = require('../services/ajax_request.js');
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

