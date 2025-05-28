import { useEffect, useRef, useState } from "react";

const AdSense = ({
  client = "ca-pub-8181018973115872",
  slot = "9288280159",
  format = "auto",
  style = { display: "block", textAlign: "center", minHeight: "100px" },
  responsive = true,
  className = "",
}) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  // Check for cookie consent
  useEffect(() => {
    const checkConsent = () => {
      const savedConsent = localStorage.getItem("cookieConsent");
      if (savedConsent) {
        try {
          const consent = JSON.parse(savedConsent);
          setHasConsent(consent.advertising === true);
        } catch (e) {
          setHasConsent(false);
        }
      }
    };

    checkConsent();
    // Listen for consent changes
    const interval = setInterval(checkConsent, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only load ads if consent is given
    if (!hasConsent) {
      return;
    }

    const loadAd = async () => {
      try {
        // Check if we're in development mode
        if (process.env.NODE_ENV === "development") {
          console.log("AdSense: Development mode - ads may not load");
          return;
        }

        // Wait for adsbygoogle script to be available
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait

        const checkAdSense = () => {
          if (window.adsbygoogle && adRef.current) {
            try {
              // Check if already processed
              const status = adRef.current.getAttribute(
                "data-adsbygoogle-status"
              );

              if (!status || status === "unfilled") {
                // Clear any existing content
                adRef.current.innerHTML = "";

                // Push the ad request
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdLoaded(true);
                console.log("AdSense: Ad loaded successfully");
              }
            } catch (error) {
              console.error("AdSense error:", error);
              setAdError(true);
            }
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(checkAdSense, 100);
          } else {
            console.warn("AdSense: Script not loaded after 5 seconds");
            setAdError(true);
          }
        };

        // Start checking for AdSense availability
        setTimeout(checkAdSense, 1000); // Wait 1 second before first attempt
      } catch (error) {
        console.error("AdSense initialization error:", error);
        setAdError(true);
      }
    };

    loadAd();
  }, [hasConsent]); // Depend on consent

  // Show consent message if no consent
  if (!hasConsent) {
    return (
      <div
        className={`${className} p-4 bg-gray-100 border rounded text-center`}
      >
        <p className="text-sm text-gray-600">
          🍪 Please accept cookies to view ads and support this website
        </p>
      </div>
    );
  }

  // Fallback content for development or when ads fail
  if (process.env.NODE_ENV === "development" || adError) {
    return (
      <div
        className={`ad-placeholder bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center ${className}`}
        style={{ ...style, minHeight: "200px" }}
      >
        <div className="text-center text-gray-400">
          <p className="text-sm">Advertisement Space</p>
          <p className="text-xs mt-1">
            {process.env.NODE_ENV === "development"
              ? "Dev Mode"
              : adError
              ? "💼 Hire Rajesh Pandey for your next project!"
              : "Ad Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`adsense-container ${className}`}
      style={{ margin: "20px 0" }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        data-adtest={process.env.NODE_ENV === "development" ? "on" : "off"}
      />
      {!adLoaded && (
        <div className="ad-loading text-center text-gray-500 text-sm py-4">
          Loading advertisement...
        </div>
      )}
    </div>
  );
};

// Specific ad components with proper configurations
export const HeaderAd = () => (
  <AdSense
    slot="9376540955"
    style={{ display: "block", height: "90px", width: "100%" }}
    className="header-ad"
  />
);

export const SidebarAd = () => (
  <AdSense
    slot="9288280159"
    format="rectangle"
    style={{ display: "block", width: "300px", height: "250px" }}
    className="sidebar-ad"
  />
);

export const InContentAd = () => (
  <AdSense
    slot="9288280159"
    format="fluid"
    style={{ display: "block", textAlign: "center", minHeight: "200px" }}
    className="in-content-ad"
  />
);

export const ResponsiveAd = () => (
  <AdSense
    slot="9288280159"
    format="auto"
    style={{ display: "block", minHeight: "200px" }}
    className="responsive-ad"
  />
);

export default AdSense;
