import type { PortfolioHolding } from "../types/market";

export const PORTFOLIO: PortfolioHolding[] = [
  {
    symbol: "GOOG",
    name: "Alphabet Inc.",
    weight: 43.86,
    shares: 8_400_000,
    avgCostBasis: 85,
    firstFilingYear: "2012",
  },
  {
    symbol: "BAC",
    name: "Bank of America",
    weight: 16.08,
    shares: 12_500_000,
    avgCostBasis: 10,
    firstFilingYear: "2018",
  },
  {
    symbol: "PDD",
    name: "PDD Holdings",
    weight: 14.64,
    shares: 4_200_000,
    avgCostBasis: 65,
    firstFilingYear: "2022",
  },
  {
    symbol: "BRK-B",
    name: "Berkshire Hathaway B",
    weight: 12.64,
    shares: 950_000,
    avgCostBasis: 250,
    firstFilingYear: "2018",
  },
  {
    symbol: "EWBC",
    name: "East West Bancorp",
    weight: 8.74,
    shares: 3_100_000,
    avgCostBasis: 45,
    firstFilingYear: "2020",
  },
  {
    symbol: "OXY",
    name: "Occidental Petroleum",
    weight: 1.69,
    shares: 1_000_000,
    avgCostBasis: 50,
    firstFilingYear: "2023",
  },
  {
    symbol: "CROX",
    name: "Crocs Inc.",
    weight: 1.51,
    shares: 450_000,
    avgCostBasis: 70,
    firstFilingYear: "2022",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    weight: 0.84,
    shares: 130_000,
    avgCostBasis: 140,
    firstFilingYear: "2021",
  },
];

export const PORTFOLIO_TOTAL_VALUE = 3_570_000_000;
export const PORTFOLIO_FILING_DATE = "2025-Q4";
export const SEC_CIK = "0001709323";
