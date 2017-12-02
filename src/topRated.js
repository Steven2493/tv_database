import React, { Component } from 'react';
import TopRatedCard from './topRatedCard';

class TopRated extends Component {
  constructor(){
    super()
    this.state = {
      topRatedArray: [],
    }
  }

  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=08669db599dad51e2ebab82b43bf0630&language=en-US&page=1')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          topRatedArray: responseJson.results.slice(0,5)
        })
      })
      .catch((error) => {
        console.log(error)
    })
  }
  render(){
    return(
        <TopRatedCard tvArray={this.state} />
    )
  }
}

export default TopRated;
