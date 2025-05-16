import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  let routingError = useRouteError();
  console.log(routingError);

  return (
    <div className="error-page">
      <h1 className="text-white">{routingError.status} - {routingError.data}</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
    </div>
  );
}

export default ErrorPage;
