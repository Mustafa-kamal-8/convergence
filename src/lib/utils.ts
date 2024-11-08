import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pageSizeOptions = [5, 10, 20, 50];

export const formattedDate = (dateString: string) => {
  return new Date(dateString).toISOString().split("T")[0];
};

export const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
