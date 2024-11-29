import ReactGA from "react-ga4";

// Initialize Google Analytics with your Measurement ID
export const initializeGA = () => {
  ReactGA.initialize("G-DCKDBTH135"); // Replace with your GA4 Measurement ID
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number,
  data?: Record<string, any>
) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
    ...data,
  });
};
