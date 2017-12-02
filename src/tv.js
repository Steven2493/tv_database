import React, { Component } from 'react';

class Tv extends Component {

  render(){
    let tvInfo = this.props.tvData
    let poster = 'https://image.tmdb.org/t/p/w500' + tvInfo.poster
    return(
      <div>
        <div className="posterContainer">
          <img src={poster} className="tvPoster" alt="tv Poster"/>
        </div>
        <div className="tvInfoContainer">
          <p className="title">{tvInfo.movieTitle}</p>
          <p className="plot">{tvInfo.plot}</p>
          <div className="stats">
            <h3>Release Date</h3>
            <p>{tvInfo.releaseDate}</p>
            <h3>Average Rating</h3>
            <p>{tvInfo.rating}/10</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Tv;
