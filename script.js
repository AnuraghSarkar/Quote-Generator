// Elements

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('.container')

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}


// Quote from API

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // If author is not shown
    if (data.quotes[0].author === "") {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data.quotes[0].author;
    }

    // Minimize font for long quotes

    if (data.quotes[0].text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    // Stop Loader and display code
    removeLoadingSpinner();
    quoteText.innerText = data.quotes[0].text;
  
  }

  catch (error) {
    console.log("Quote dismissed", error);
    getQuote();
  }
}

// Tweet Quote

function postTwitter() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}



// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', postTwitter);


// Onload
getQuote();

