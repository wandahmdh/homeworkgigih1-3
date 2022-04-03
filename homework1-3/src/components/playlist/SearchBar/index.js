import React, {Component} from 'react'
import config from '../../utils/config'

export default class SearchBar extends Component{
  state ={
    text: '',
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { text } = this.state;

    var requestOptions = {
      headers: {
        Authorization: 'Bearer ' + this.props.accessToken,
          'content-type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
        requestOptions
      ).then((data) => data.json());

      const tracks = response.tracks.items;
      this.props.onSuccess(tracks);
    }
    catch (e) {
      console.log(e);
    }
  }

    render() {
      return (
        <div className='searchBar'>
          <form className='searchForm' onSubmit={(e) => this.handleSubmit(e)} >
            <input 
              className='search'
              type = 'text' name='query' placeholder='Search here'
              onChange={(e) => this.handleInput(e)} required
            />
            <input type='submit' className='searchBtn' value="Search" />
          </form>     
        </div>
      );
    }
}

export {SearchBar}