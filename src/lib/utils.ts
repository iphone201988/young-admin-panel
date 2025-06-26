import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const userRole: any = {
  admin: "ADMIN",
  general_member: "GENERAL MEMBER",
  financial_advisor: "FINANCIAL ADVISOR",
  financial_firm: "FINANCIAL FIRM",
  small_business: "SMALL BUSINESS",
  startup: "STARTUP",
  investor: "INVESTOR",
};

export const adStatus: any = {
  approved: "APPROVED",
  in_review: "IN REVIEW",
  reject: "REJECT",
};

export const getCompleteUrl = (url: string) =>
  import.meta.env.VITE_IMAGE_URL + url;
