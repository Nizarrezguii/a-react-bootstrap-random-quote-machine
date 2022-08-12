import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuotes, setRandomQuotes] = React.useState([]);


  React.useEffect(()=>{
      async function fetchData(){
        const response = await fetch("https://type.fit/api/quotes")
        const data = await response.json();

        setQuotes(data);
        let randIndex = Math.floor(Math.random() * data.length);
        setRandomQuotes(data[randIndex]);
      }
      fetchData();
  },[])

  const getNewQuote = () => {
    let randIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuotes(quotes[randIndex]);
  }


  return (
    <div className="App container pt-5" id="quote-box">
      <div className="jumbotron" id="quote-box">
        <div className="card">
          <div className="card-header">
            <h2>Random Quote Machine</h2>
          </div>
          <div className="card-body">
            {randomQuotes ? (
                <>
                <h4 className="card-title" id="author" >- {randomQuotes.author || "no author"}</h4>
                <p className="card-text" id="text"> "{randomQuotes.text || "Empty"}"</p>
                </>
            ) : (
              <h2>nothing</h2>
            )}

            <div className="row d-flex mt-5">
              
              <button id="new-quote" className='col-lg-2 col-xs-2 float-start btn btn-danger ml-5 mb-3' onClick={getNewQuote}>New quote</button>
              
              <div className='col-lg-10'>
              <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + 
                  encodeURIComponent(
                    '"' + randomQuotes.text + '" ' + randomQuotes.author
                  )
                  } id="tweet-quote" target="/" className='btn btn-primary col-lg-1 float-end'>
                <i className='fa fa-twitter'></i>
              </a>
              <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + 
              encodeURIComponent(randomQuotes.author) +
              '&content=' +
              encodeURIComponent(randomQuotes.text) +
              '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
            } target='/' className='btn btn-primary col-lg-1 me-5 float-end'>
                <i className='fa fa-tumblr'></i>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
