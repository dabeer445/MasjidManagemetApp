import ReactGA from 'react-ga';

export const initGA = (trackingId: string) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
