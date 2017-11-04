import _ from 'lodash';
import { InstantSearch } from 'react-instantsearch/dom';
import { Link } from 'react-router-dom';
import React from 'react';
import Search from './Search';

export default class Home extends React.Component {
  render() {
    return (
      <div className='container home'>
        <InstantSearch
          appId="7D30WV9CHU"
          apiKey="1d1a3ab0dfa4d5ec5867d7825dd5dac7"
          indexName="tweets"
        >
          <Search />
        </InstantSearch>
      </div>
    );
  }
}
