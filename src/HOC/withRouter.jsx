import { useLocation, useParams } from 'react-router-dom';
import React from 'react';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    return <Component {...props} router={{ location, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter
