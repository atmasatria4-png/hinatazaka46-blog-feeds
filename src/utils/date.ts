export class DateError extends Error {
  constructor(message: string, public override cause?: unknown) {
    super(message)
    this.name = "DateError"
  }
}

export const japaneseTimeStyle = (time: string, sourceOffsetHours: number = 0): string => {
  if (!time) throw new DateError("❌ Empty time string")

  const match = time.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2}) (\d{1,2}):(\d{2})$/)
  if (!match) throw new DateError(`❌ Invalid time format: ${time}`)

  const [, y, m, d, h, min] = match
  let date

  const dateMs = Date.UTC(Number(y), Number(m) - 1, Number(d), Number(h) - (sourceOffsetHours ?? 0), Number(min));
  if (sourceOffsetHours) date = new Date(dateMs);
  else date = new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    Number(h),
    Number(min)
  )

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours().toString().padStart(2, "0")
  const minute = date.getMinutes().toString().padStart(2, "0")

  return `${year}年${month}月${day}日, ${hour}時${minute}分`
}

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