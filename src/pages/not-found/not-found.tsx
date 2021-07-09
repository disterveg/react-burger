import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound404() {
  return (
    <div className={''}>
      <div className={''}>
        <div className={''}>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <br />
          <br />
          <p>check the address or try <Link to='/' className={''}>homepage</Link></p>
        </div>
      </div>
    </div>
  );
}
