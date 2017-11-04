import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch/dom';
import React from 'react';

export default function Tweet({ hit }) {
  return (
    <div className='hit' style={{marginTop: '10px'}}>
      <div>{hit.text}</div>
      <div>{hit.created_at}</div>
      <div>{hit.user_id}</div>
      <span className='hit-name'>
        <Highlight attributeName='text' hit={ hit } />
      </span>
    </div>
  );
};
