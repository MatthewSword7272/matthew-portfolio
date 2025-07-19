const VISIT_KEY = "portfolio_visited";
const EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const checkReturningVisitor = () => {
  const visitData = localStorage.getItem(VISIT_KEY);

  if (visitData) {
    const { timestamp } = JSON.parse(visitData);
    const now = Date.now();

    // Check if 5 minutes have passed
    if (now - timestamp < EXPIRY_TIME) {
      return true;
    } else {
      // Expired, remove old entry
      localStorage.removeItem(VISIT_KEY);
    }
  }

  return false;
};

export const setVisitTimestamp = () => {
  localStorage.setItem(VISIT_KEY, JSON.stringify({ timestamp: Date.now() }));
};

export const getVisitData = () => {
  const visitData = localStorage.getItem(VISIT_KEY);
  return visitData ? JSON.parse(visitData) : null;
};
