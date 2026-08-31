const VISIT_KEY = "portfolio_visited";
const EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

interface VisitData {
  timestamp: number;
}

export const checkReturningVisitor = (): boolean => {
  if (typeof window === "undefined") return false;

  const visitData = localStorage.getItem(VISIT_KEY);

  if (visitData) {
    const { timestamp } = JSON.parse(visitData) as VisitData;
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

export const setVisitTimestamp = (): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(VISIT_KEY, JSON.stringify({ timestamp: Date.now() } satisfies VisitData));
};

export const getVisitData = (): VisitData | null => {
  if (typeof window === "undefined") return null;
  const visitData = localStorage.getItem(VISIT_KEY);
  return visitData ? (JSON.parse(visitData) as VisitData) : null;
};
