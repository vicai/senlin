import classNames from 'classnames';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  RefinementList,
  Pagination,
  CurrentRefinements,
  ClearAll
} from 'react-instantsearch/dom';
import React from 'react';
import Tweet from './Tweet';
import styles from './Search.scss';

const SideBar = () => {
  return (<div className='sideBar'>
    There is sideBar
  </div>);
}

const Content = () => {
  return (<div className={styles.resultContainer}>
    <Hits hitComponent={Tweet} />
  </div>);
}

class Search extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className='container'>
        <div className={styles.headerContainer}>
          <SearchBox translation={{placeholder: 'Search for Tweets'}} />
        </div>
        <RefinementList attributeName='text' />
        <main id='hits'>
          <Content />
        </main>
        <footer className={styles.footer}>
          <Pagination
            maxPages={10}
          />
        </footer>
      </div>
    );
  }
}

export default Search;
