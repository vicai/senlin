import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch/dom';
import React from 'react';
import styles from './Tweet.scss'

export default function Tweet({ hit }) {
  return (
    <div className={styles.hit}>
      <div className={styles.tweetHeader}>
        <div className={styles.tweetHeaderLeft}>
          <Highlight attributeName='user_id' hit={ hit } />
        </div>
        <div className={styles.tweetHeaderRight}>
          <Highlight attributeName='created_at' hit={ hit } />
        </div>
      </div>
      <Highlight attributeName='text' hit={ hit } />
    </div>
  );
};
