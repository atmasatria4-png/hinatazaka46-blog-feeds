export function getCurrentJktMonth(): number {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  return now.getMonth() + 1;
}

export const getCurrentJktDayOfMonth = (d: Date = new Date()): number => {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", day: "2-digit" })
      .format(d)
  );
};

export const isWithinJktDayRange = (min: number, max: number, d: Date = new Date()): boolean => {
  const day = getCurrentJktDayOfMonth(d);
  return day >= min && day <= max;
};

export const timestamp = (): string => new Date().toISOString()