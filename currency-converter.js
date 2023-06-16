const axios = require('axios');

//the promises way of doing it
// const getExchangeRate = (fromCurrency, toCurrency)=> {
//     axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1').then((response)=>{
//         const rate = response.data.rates;
//         const euro = 1/rate[fromCurrency];
//         const exchangeRate = euro * rate[toCurrency];
//         console.log(exchangeRate);
//     })
// }

//async way of doing it 

const getExchangeRate = async (fromCurrency, toCurrency)=> {
    //api key = 4ecce5edea21098ad8a08cfd78e408d1
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=4ecce5edea21098ad8a08cfd78e408d1&format=1');
    const rate = response.data.rates;
    const base = 1/rate[fromCurrency];
    const exchangeRate = base * rate[toCurrency];
    if(isNaN(exchangeRate)){
        throw new Error(`Unable to get from ${fromCurrency} to ${toCurrency}`);
    }
    return exchangeRate;
}

//getExchangeRate('USD','EUR');


//use API to get the list of countries using toCurrency as their official currency
const getCountries = async (toCurrency)=>{
    const response = await axios.get(`http://api.countrylayer.com/v2/currency/${toCurrency}?access_key=b748212ae4e437c4c0b7c946eec05da2`);
    return response.data.map(country=>country.name);

}

//getCountries('usd');

const ConvertCurrency = async (fromCurrency, toCurrency, amount)=>{
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`
}

ConvertCurrency('CAD','USD', 400).then((message)=>{console.log(message)}).catch((error)=>{console.log(error.message);})
