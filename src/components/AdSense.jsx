import { useEffect,useRef } from "react";

const AdSense = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Only push if not already initialized
    if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8181018973115872"
      data-ad-slot="9288280159"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;

