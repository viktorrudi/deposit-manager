import type { Product } from "../../api/product/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatProductVolume(volume: number) {
  if (volume >= 1000) {
    const liters = volume / 1000;
    return `${Number.isInteger(liters) ? liters.toFixed(0) : liters.toFixed(1)}L`;
  }

  return `${volume}ml`;
}

export function formatProductDeposit(deposit: number) {
  return currencyFormatter.format(deposit / 100);
}

export function formatProductPackaging(packaging: Product["packaging"]) {
  return packaging.charAt(0).toUpperCase() + packaging.slice(1);
}

export function formatProductRegisteredAt(isoDate?: string) {
  if (!isoDate) return "—";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "—";
  return dateFormatter.format(parsed);
}

export function formatProductStatus(isActive: boolean) {
  return isActive ? "Active" : "Inactive";
}

