import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize('UA-174548782-2');
};

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
