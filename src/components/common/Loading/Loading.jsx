import React from 'react';
import loading from '../../../assets/loading.jpg';

export default function Loading(props) {
  return (
    <img src={loading} alt="loading..." className={props.class} />
  );
}
