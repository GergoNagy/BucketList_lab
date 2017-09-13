var AjaxRequest = require('./services/ajax_request.js');
var CountriesView = require('./views/countries_view.js');

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



