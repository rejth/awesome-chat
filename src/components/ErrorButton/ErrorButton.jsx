import React from 'react';

function ErrorButton() {
  const [renderError, setRenderError] = React.useState(false);

  // eslint-disable-next-line no-undef
  if (renderError) foo.bar = 0; // fake error for testing

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={() => setRenderError(true)}
    >
      Throw Error
    </button>
  );
}

export default ErrorButton;
