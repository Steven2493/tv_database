import React, { Component } from 'react';
import './App.css';
import Tv from './tv';
import TopRated from './topRated';
import Autosuggest from 'react-autosuggest';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends Component {
  constructor(){
    super()
    this.state = {
      background: '',
      suggestions: [],
      value: ''
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({value}) => {
    // const trimmedValue = value.trim();
    const API_KEY = '&api_key=08669db599dad51e2ebab82b43bf0630';
    const URL = 'https://api.themoviedb.org/3/search/tv?query=';
    const trimmedValue = value.trim();
    if (trimmedValue.length > 1) {
        let url = URL + trimmedValue + API_KEY;
          fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => {
              const results = data.map(tvShow => {
                let tvShowObject = {}
                tvShowObject.id = tvShow.id
                tvShowObject.title = tvShow.name
                tvShowObject.poster = tvShow.poster_path
                tvShowObject.background = tvShow.backdrop_path
                tvShowObject.releaseDate = tvShow.first_air_date
                tvShowObject.rating = tvShow.vote_average
                tvShowObject.plot = tvShow.overview
                return tvShowObject
              });
              this.setState({
               suggestions: results.slice(0,5)
              });
            }).catch(error => console.log('Exception to get Suggestions'))
    }
    else {
      this.setState({
        suggestions: []
      })
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  }

  renderSuggestion = (suggestion) => {
    return (
     <a>
       <div className="searchResult-text">
         <div className="searchResult-name">
           {suggestion.title}
         </div>
       </div>
     </a>
    );
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter' || 'click')
      event.preventDefault();
    this.setState({
      background: suggestion.background,
      movieTitle: suggestion.title,
      popularity: suggestion.popularity,
      poster: suggestion.poster,
      releaseDate: suggestion.releaseDate,
      rating: suggestion.rating,
      voteCount: suggestion.voteCount,
      plot: suggestion.plot
    });
};

  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/search/movie?api_key=08669db599dad51e2ebab82b43bf0630&language=en-US&query=Interstellar&page=1&include_adult=false')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          background: responseJson.results[0].backdrop_path,
          movieTitle: responseJson.results[0].title,
          popularity: responseJson.results[0].popularity,
          poster: responseJson.results[0].poster_path,
          releaseDate: responseJson.results[0].release_date,
          rating: responseJson.results[0].vote_average,
          voteCount: responseJson.results[0].vote_count,
          plot: responseJson.results[0].overview
        })
      })
      .catch((error) => {
        console.log(error)
    })
  }

  componentDidUpdate(){
    let url = 'https://image.tmdb.org/t/p/original' + this.state.background
    document.body.style.backgroundImage = `url(${url})`

  }

  render() {
    const {value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search TvShow',
      value,
      onChange: this.onChange
    }

    return (
      <Tabs>
        <TabList>
          <div className="tabs">
            <Tab>Top Rated</Tab>
            <Tab>Popular Tv Show</Tab>
            <Tab>Search Tv Show</Tab>
          </div>
        </TabList>
          <TabPanel>
            <div className="topRatedContainer">
              < TopRated />
            </div>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <div className="tvContainer">
            <div className="searchBar">
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}/>
            </div>
            <Tv tvData={this.state}/>
            </div>
          </TabPanel>
    </Tabs>
    );
  }
}


export default App;
