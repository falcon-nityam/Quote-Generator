// Getting html elements
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuoteBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader')

// Show loader
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Hide loader
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();

    const proxyUrl='https://cors-anywhere.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response= await fetch(proxyUrl + apiUrl);
        const data=await response.json();

        console.log(data)
        // If Author is blank, add 'Unknown'
        if(data.quoteAuthor === ''){
            authorText.innerHTML = 'Unknown'; 
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // reduce font size for long quotes
        if(data.quoteText.length > 50){
            authorText.classList.add('long-quote'); 
        }else{
            authorText.classList.remove('long-quote');
        }
        quoteText.innerHTML= data.quoteText;

        // Stop Loader, Show Quote
        removeLoadingSpinner()

        // console.log(data)
    } catch (error) {
        // is get error we call for next quote
        getQuote()
        console.log('Whoops, no quote', error)
    }
}

function shareQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`

    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', shareQuote)

// onLoad
getQuote()