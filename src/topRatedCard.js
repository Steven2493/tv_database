import React, { Component } from 'react';

class TopRatedCard extends Component {

  render(){
    let tvInfo = this.props.tvArray.topRatedArray
    let poster = 'https://image.tmdb.org/t/p/w500'
    let tvObjects = tvInfo.map((tvObject) =>
      <div key={tvObject.id} className="tvCard">
        <img src={poster + tvObject.poster_path} className="topRatedPoster" alt="top rated poster"/>
        <p>Title: {tvObject.name}</p>
        <p>Release Date: {tvObject.first_air_date}</p>
          <p className="plotSummary">{tvObject.overview}</p>
      </div>
    );
    return(
      <div className="topRatedCard">
        {tvObjects}
      </div>
    )
  }
}

export default TopRatedCard;
