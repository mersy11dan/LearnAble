const MONTHS = [
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yakatit",
  "Megabit",
  "Miazia",
  "Ginbot",
  "Sene",
  "Hamle",
  "Nehase",
  "Pagume",
];

function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

export type EthiopianDate = { year: number; month: number; day: number; monthName: string };

export function gregorianToEthiopian(year: number, month: number, day: number): EthiopianDate {
  const jdn = gregorianToJdn(year, month, day);
  const r = (jdn - 1723856) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const ethiopianYear = 4 * Math.floor((jdn - 1723856) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const ethiopianMonth = Math.floor(n / 30) + 1;
  const ethiopianDay = (n % 30) + 1;
  return { year: ethiopianYear, month: ethiopianMonth, day: ethiopianDay, monthName: MONTHS[ethiopianMonth - 1] ?? "Pagume" };
}

const GREGORIAN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function dualDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const ethiopian = gregorianToEthiopian(year, month, day);
  return `${day} ${GREGORIAN[month - 1]} ${year} (${ethiopian.monthName} ${ethiopian.day}, ${ethiopian.year})`;
}
