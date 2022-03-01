import logo from './logo.svg';
import './App.css';
import ApiQuery from './components/Movies';
import Top from './components/Top';
import React, { Component } from 'react';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ``,
      page: 1,
      top: false,
    }

    // Bind our custom functions
    this.handleTop = this.handleTop.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleTop (event) {
    this.setState(prevState => ({
      top: !prevState.top
    }));
  }

  handleInput (event) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      this.setState({
        search: event.target.value,
        page: 1
      });
    }, 500)
  }

  render () {
    return (
      <div className="App">
        {this.state.top &&
          <Top
            handleChange={this.handleTop}
          />
        }
        <header className="App-header">
          <div className="App-header__brand">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>OMDB Movies React App</h1>
          </div>
          <div className="App-header__control">
            <button onClick={this.handleTop}>
              My Top 9
            </button>
          </div>
        </header>
        <main>
          <input
            type="text"
            placeholder="Search for movies..."
            value={this.state.value}
            onChange={this.handleInput}
          />

          <div className="App-movies">
            {this.state.search &&
              <ApiQuery
                search={this.state.search}
                page={this.state.page}
              />
            }
          </div>
        </main>

        <footer>
          <p>Built by Daniel Drave</p>
        </footer>
      </div>
    );
  }
}

export default App;
