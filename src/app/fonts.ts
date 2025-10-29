import { DM_Sans, Cherry_Cream_Soda, Lora } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const cherryCream = Cherry_Cream_Soda({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cherry",
  display: "swap",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-lora",
  display: "swap",
});

