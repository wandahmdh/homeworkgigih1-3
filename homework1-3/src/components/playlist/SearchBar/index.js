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
        Authorization: 'Bearer' + this.props.accessToken,
          'content-type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
        requestOptions
      ).then((data) => data.json());

      const tracks = response.tracks.value;
      this.props.onSuccess(tracks);
    }
    catch (e) {
      alert(e);
    }
  }

    render() {
      return (
        <div className='container'>
          <form className='searchForm' onSubmit={(e) => this.handleSubmit(e)} >
            <input 
              type = 'text' name='query' placeholder='Search here'
              onChange={(e) => this.handleInput(e)} required
            />
            <input type='submit' className='btn Submit' value="Search" />
          </form>     
        </div>
      );
    }
}

export {SearchBar}