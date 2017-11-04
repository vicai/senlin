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

export default function Search() {
  return (
    <div className='container'>
      <CurrentRefinements />
      <ClearAll />
      <SearchBox />
      <RefinementList attributeName='text' />
      <Hits hitComponent={Tweet} />
      <div className={styles.pagination}>
        <Pagination className={styles.pagination} />
      </div>
    </div>
  );
}
