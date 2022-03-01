import React from 'react';

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove (id) {
    const movies = JSON.parse(localStorage.getItem(`omdb-movies`));
    const store = movies.filter(item => { return item.imdbId !== id });
    localStorage.setItem(`omdb-movies`, JSON.stringify(store));
    this.forceUpdate();
  }

  render () {
    let movies = localStorage.getItem(`omdb-movies`);
    movies = movies ? JSON.parse(movies) : [];

    return (
      <div className="App-top">
        <div className="App-top__inner">
          <div className="App-top__inner--header">
            <h2>My Top 9 Movies</h2>
            <button onClick={this.props.handleChange}>Close</button>
          </div>

          <div className="App-top__movies">
            {movies.map(item => (
              <p key={item.imdbId}>
                <span>{ item.title }</span>
                <button onClick={() => {this.remove(item.imdbId) }}>
                  Remove
                </button>
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Top;