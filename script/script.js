var country = document.getElementById('country')
var labelDate = document.getElementById('dateLabel')
var inputDate = document.getElementById('date')
var searchInput = document.getElementById('search')
var activeCase = document.getElementById('caseActive')
var newCase = document.getElementById('caseNew')
var recCase = document.getElementById('caseRecover')
var totalCase = document.getElementById('caseTotal')
var death = document.getElementById('deaths')
var tests = document.getElementById('testTotal')
var notFound = document.getElementById('notFound')
var inputError = document.getElementById('inputError')
var inputResult = document.getElementById('inputResult')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const loader = document.querySelector('#loading');

function displayLoading() {
    loader.classList.add('display');
    setTimeout(() => {
        loader.classList.remove('display');
    }, 5000)
}

function hideLoading() {
    loader.classList.remove('display');
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

console.log(today)


function searchControl (){
    displayLoading()
    const countryName = searchInput.value
    const getDate = inputDate.value
    if (getDate == '') {
        var newDate = today
    } else {
        var newDate = getDate
    }
    fetch(`https://covid-193.p.rapidapi.com/history?country=${countryName}&day=${newDate}`, options)
    .then(response => response.json())
    .then(response => {
        hideLoading()
        if  (response.response.length == 0) {
            const toast = new bootstrap.Toast(notFound)
            inputResult.innerHTML = countryName
            toast.show()
        } else {
            country.innerHTML = response.response[0].country
            labelDate.innerHTML = `(${response.response[0].day})`
            activeCase.innerHTML = response.response[0].cases.active
            newCase.innerHTML = response.response[0].cases.new
            recCase.innerHTML = response.response[0].cases.recovered
            totalCase.innerHTML = response.response[0].cases.total
            death.innerHTML = response.response[0].deaths.total
            tests.innerHTML = response.response[0].tests.total
        }
    })
    .catch(err => console.error(err));
}

