import React, { useEffect } from "react";

const AdSense = ({
  client,
  slot,
  format = "auto",
  responsive = "true",
  style = {},
}) => {
  useEffect(() => {
    // Ensure the adsbygoogle script is loaded
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};

export default AdSense;
