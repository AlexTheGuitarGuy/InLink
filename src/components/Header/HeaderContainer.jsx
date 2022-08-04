import React, { memo } from 'react';
import Header from './Header.jsx';
import { compose } from 'redux';

const HeaderContainer = () => {
  return <Header />;
};

export default compose(memo)(HeaderContainer);
