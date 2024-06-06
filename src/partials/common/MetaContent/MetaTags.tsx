import React from "react";
import { Helmet } from "react-helmet";

function MetaTags({ children }) {
  return (
    <Helmet>
      {children}
      <meta name="og:url" content={window.location.href} />
      <meta name="twitter:url" content={window.location.href} />
    </Helmet>
  );
}

export default MetaTags;
