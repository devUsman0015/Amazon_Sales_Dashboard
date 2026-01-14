"use client";

import { Suspense, useMemo } from "react";
import { useState } from "react";
import Image from "next/image";

import AmazonLogo from "../../../public/icons/amazon-logo.svg";
import FooterLogo from "../../../public/icons/footer-amazon-logo.png";
import SparleIcon from "../../../public/icons/sparles-icon.svg";

import {
  ChevronDown,
  Menu,
  Search,
  Bell,
  Settings,
  X,
  AlertCircle,
  Mail,
} from "lucide-react";
import { IoBookmark } from "react-icons/io5";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarNavigation from "@/components/sidebar-navigation";
import { FaBell } from "react-icons/fa";
import { VscSparkleFilled } from "react-icons/vsc";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { MdOutlineContentCopy } from "react-icons/md";

// Types
interface SalesMetrics {
  totalOrderItems: number;
  unitsOrdered: number;
  orderedProductSales: number;
  avgUnitsPerOrder: number;
  avgSalesPerOrder: number;
}

interface ComparisonRow {
  label: string;
  metrics: SalesMetrics;
  isPercentChange?: boolean;
}

type DatePreset =
  | "today"
  | "yesterday"
  | "last7days"
  | "last30days"
  | "mtd"
  | "ytd"
  | "custom";

// Utility Functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value: number | null): string => {
  if (value === null || !isFinite(value)) return "N/A";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
};

// Generate realistic sales data with proper scaling
const generateSalesData = (
  daysInPeriod: number,
  variance: number = 0.15
): SalesMetrics => {
  // Base daily metrics (realistic for a mid-sized seller)
  const baseDailyOrders = 45; // Average orders per day
  const baseDailyUnitsMultiplier = 1.2; // Slightly more units than orders
  const baseAvgOrderValue = 75; // Average order value $75

  // Add controlled randomness (±15% by default)
  const randomFactor = 1 + (Math.random() - 0.5) * variance * 2;

  // Calculate metrics based on number of days
  const totalOrderItems = Math.floor(
    baseDailyOrders * daysInPeriod * randomFactor
  );
  const unitsOrdered = Math.floor(
    totalOrderItems * baseDailyUnitsMultiplier * (0.95 + Math.random() * 0.1)
  );
  const avgSalesPerOrder = baseAvgOrderValue * (0.9 + Math.random() * 0.2); // $67.50-$90
  const orderedProductSales = totalOrderItems * avgSalesPerOrder;
  const avgUnitsPerOrder = unitsOrdered / totalOrderItems;

  return {
    totalOrderItems,
    unitsOrdered,
    orderedProductSales,
    avgUnitsPerOrder,
    avgSalesPerOrder,
  };
};

// Calculate percentage change
const calculatePercentChange = (
  current: number,
  previous: number
): number | null => {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

// Date preset configurations
const getDatePresetLabel = (preset: DatePreset): string => {
  const today = new Date();
  switch (preset) {
    case "today":
      return `Today - ${today.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}`;
    case "yesterday":
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return `Yesterday - ${yesterday.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}`;
    case "last7days":
      return "Last 7 days";
    case "last30days":
      return "Last 30 days";
    case "mtd":
      return `Month to date - ${today.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}`;
    case "ytd":
      return `Year to date - ${today.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}`;
    case "custom":
      return "Custom";
    default:
      return "Today";
  }
};

// Get comparison rows based on date preset
const getComparisonRows = (
  preset: DatePreset,
  currentData: SalesMetrics
): ComparisonRow[] => {
  switch (preset) {
    case "today":
      // Today is partial day, yesterday is full day, so yesterday should be higher
      const yesterday = generateSalesData(1, 0.12);
      const lastWeekSameDay = generateSalesData(1, 0.12);
      const lastYearSameDay = generateSalesData(1, 0.15);

      // Apply growth factors (current period typically higher than past)
      yesterday.totalOrderItems = Math.floor(yesterday.totalOrderItems * 0.92);
      yesterday.unitsOrdered = Math.floor(yesterday.unitsOrdered * 0.92);
      yesterday.orderedProductSales = yesterday.orderedProductSales * 0.92;

      lastWeekSameDay.totalOrderItems = Math.floor(
        lastWeekSameDay.totalOrderItems * 0.85
      );
      lastWeekSameDay.unitsOrdered = Math.floor(
        lastWeekSameDay.unitsOrdered * 0.85
      );
      lastWeekSameDay.orderedProductSales =
        lastWeekSameDay.orderedProductSales * 0.85;

      lastYearSameDay.totalOrderItems = Math.floor(
        lastYearSameDay.totalOrderItems * 0.7
      );
      lastYearSameDay.unitsOrdered = Math.floor(
        lastYearSameDay.unitsOrdered * 0.7
      );
      lastYearSameDay.orderedProductSales =
        lastYearSameDay.orderedProductSales * 0.7;

      return [
        { label: "Today so far", metrics: currentData },
        { label: "Yesterday", metrics: yesterday },
        { label: "Same day last week", metrics: lastWeekSameDay },
        { label: "Same day last year", metrics: lastYearSameDay },
        {
          label: "+ % change from yesterday",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              yesterday.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              yesterday.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              yesterday.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              yesterday.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              yesterday.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same day last week",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastWeekSameDay.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastWeekSameDay.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastWeekSameDay.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastWeekSameDay.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastWeekSameDay.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same day last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearSameDay.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearSameDay.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearSameDay.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearSameDay.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearSameDay.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    case "yesterday":
      const dayBeforeYesterday = generateSalesData(1, 0.12);
      const lastWeekYesterday = generateSalesData(1, 0.12);
      const lastYearYesterday = generateSalesData(1, 0.15);

      dayBeforeYesterday.totalOrderItems = Math.floor(
        dayBeforeYesterday.totalOrderItems * 0.93
      );
      dayBeforeYesterday.unitsOrdered = Math.floor(
        dayBeforeYesterday.unitsOrdered * 0.93
      );
      dayBeforeYesterday.orderedProductSales =
        dayBeforeYesterday.orderedProductSales * 0.93;

      lastWeekYesterday.totalOrderItems = Math.floor(
        lastWeekYesterday.totalOrderItems * 0.87
      );
      lastWeekYesterday.unitsOrdered = Math.floor(
        lastWeekYesterday.unitsOrdered * 0.87
      );
      lastWeekYesterday.orderedProductSales =
        lastWeekYesterday.orderedProductSales * 0.87;

      lastYearYesterday.totalOrderItems = Math.floor(
        lastYearYesterday.totalOrderItems * 0.72
      );
      lastYearYesterday.unitsOrdered = Math.floor(
        lastYearYesterday.unitsOrdered * 0.72
      );
      lastYearYesterday.orderedProductSales =
        lastYearYesterday.orderedProductSales * 0.72;

      return [
        { label: "Yesterday", metrics: currentData },
        { label: "Day before", metrics: dayBeforeYesterday },
        { label: "Same day last week", metrics: lastWeekYesterday },
        { label: "Same day last year", metrics: lastYearYesterday },
        {
          label: "+ % change from day before",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              dayBeforeYesterday.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              dayBeforeYesterday.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              dayBeforeYesterday.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              dayBeforeYesterday.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              dayBeforeYesterday.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same day last week",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastWeekYesterday.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastWeekYesterday.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastWeekYesterday.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastWeekYesterday.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastWeekYesterday.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same day last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearYesterday.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearYesterday.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearYesterday.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearYesterday.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearYesterday.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    case "last7days":
      const previousWeek = generateSalesData(7, 0.12);
      const lastYearWeek = generateSalesData(7, 0.15);

      previousWeek.totalOrderItems = Math.floor(
        previousWeek.totalOrderItems * 0.9
      );
      previousWeek.unitsOrdered = Math.floor(previousWeek.unitsOrdered * 0.9);
      previousWeek.orderedProductSales = previousWeek.orderedProductSales * 0.9;

      lastYearWeek.totalOrderItems = Math.floor(
        lastYearWeek.totalOrderItems * 0.75
      );
      lastYearWeek.unitsOrdered = Math.floor(lastYearWeek.unitsOrdered * 0.75);
      lastYearWeek.orderedProductSales =
        lastYearWeek.orderedProductSales * 0.75;

      return [
        { label: "This week so far", metrics: currentData },
        { label: "Last week", metrics: previousWeek },
        { label: "Same week last year", metrics: lastYearWeek },
        {
          label: "+ % change from last week",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              previousWeek.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              previousWeek.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              previousWeek.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              previousWeek.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              previousWeek.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same week last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearWeek.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearWeek.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearWeek.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearWeek.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearWeek.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    case "last30days":
      const previousMonth = generateSalesData(30, 0.12);
      const lastYearMonth = generateSalesData(30, 0.15);

      previousMonth.totalOrderItems = Math.floor(
        previousMonth.totalOrderItems * 0.88
      );
      previousMonth.unitsOrdered = Math.floor(
        previousMonth.unitsOrdered * 0.88
      );
      previousMonth.orderedProductSales =
        previousMonth.orderedProductSales * 0.88;

      lastYearMonth.totalOrderItems = Math.floor(
        lastYearMonth.totalOrderItems * 0.73
      );
      lastYearMonth.unitsOrdered = Math.floor(
        lastYearMonth.unitsOrdered * 0.73
      );
      lastYearMonth.orderedProductSales =
        lastYearMonth.orderedProductSales * 0.73;

      return [
        { label: "Last 30 days", metrics: currentData },
        { label: "Previous 30 days", metrics: previousMonth },
        { label: "Same period last year", metrics: lastYearMonth },
        {
          label: "+ % change from previous 30 days",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              previousMonth.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              previousMonth.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              previousMonth.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              previousMonth.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              previousMonth.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same period last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearMonth.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearMonth.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearMonth.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearMonth.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearMonth.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    case "mtd":
      const today = new Date();
      const daysInMonth = today.getDate();
      const previousMonthSame = generateSalesData(daysInMonth, 0.12);
      const lastYearMTD = generateSalesData(daysInMonth, 0.15);

      previousMonthSame.totalOrderItems = Math.floor(
        previousMonthSame.totalOrderItems * 0.89
      );
      previousMonthSame.unitsOrdered = Math.floor(
        previousMonthSame.unitsOrdered * 0.89
      );
      previousMonthSame.orderedProductSales =
        previousMonthSame.orderedProductSales * 0.89;

      lastYearMTD.totalOrderItems = Math.floor(
        lastYearMTD.totalOrderItems * 0.74
      );
      lastYearMTD.unitsOrdered = Math.floor(lastYearMTD.unitsOrdered * 0.74);
      lastYearMTD.orderedProductSales = lastYearMTD.orderedProductSales * 0.74;

      return [
        { label: "Month to date", metrics: currentData },
        { label: "Same period last month", metrics: previousMonthSame },
        { label: "Same period last year", metrics: lastYearMTD },
        {
          label: "+ % change from same period last month",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              previousMonthSame.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              previousMonthSame.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              previousMonthSame.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              previousMonthSame.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              previousMonthSame.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
        {
          label: "+ % change from same period last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearMTD.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearMTD.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearMTD.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearMTD.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearMTD.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    case "ytd":
      const currentDay = new Date();
      const startOfYear = new Date(currentDay.getFullYear(), 0, 1);
      const daysInYear =
        Math.floor(
          (currentDay.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      const lastYearYTD = generateSalesData(daysInYear, 0.15);

      lastYearYTD.totalOrderItems = Math.floor(
        lastYearYTD.totalOrderItems * 0.76
      );
      lastYearYTD.unitsOrdered = Math.floor(lastYearYTD.unitsOrdered * 0.76);
      lastYearYTD.orderedProductSales = lastYearYTD.orderedProductSales * 0.76;

      return [
        { label: "Year to date", metrics: currentData },
        { label: "Same period last year", metrics: lastYearYTD },
        {
          label: "+ % change from same period last year",
          metrics: {
            totalOrderItems: calculatePercentChange(
              currentData.totalOrderItems,
              lastYearYTD.totalOrderItems
            )!,
            unitsOrdered: calculatePercentChange(
              currentData.unitsOrdered,
              lastYearYTD.unitsOrdered
            )!,
            orderedProductSales: calculatePercentChange(
              currentData.orderedProductSales,
              lastYearYTD.orderedProductSales
            )!,
            avgUnitsPerOrder: calculatePercentChange(
              currentData.avgUnitsPerOrder,
              lastYearYTD.avgUnitsPerOrder
            )!,
            avgSalesPerOrder: calculatePercentChange(
              currentData.avgSalesPerOrder,
              lastYearYTD.avgSalesPerOrder
            )!,
          },
          isPercentChange: true,
        },
      ];

    default:
      return [{ label: "Current period", metrics: currentData }];
  }
};

// Get number of days for each preset
const getDaysForPreset = (preset: DatePreset): number => {
  switch (preset) {
    case "today":
      return 0.5; // Partial day (today so far)
    case "yesterday":
      return 1;
    case "last7days":
      return 7;
    case "last30days":
      return 30;
    case "mtd":
      return new Date().getDate();
    case "ytd":
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const days =
        Math.floor(
          (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      return days;
    default:
      return 1;
  }
};

function BusinessReportsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showAlert1, setShowAlert1] = useState(true);
  const [showAlert2, setShowAlert2] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("table");

  // Dynamic data state
  const [selectedPreset, setSelectedPreset] = useState<DatePreset>("today");
  const [appliedPreset, setAppliedPreset] = useState<DatePreset>("today");
  const [fulfillmentChannel, setFulfillmentChannel] = useState("both");
  const [dataVersion, setDataVersion] = useState(0); // Force re-render on Apply

  // Generate data based on APPLIED preset (not selected)
  const currentData = useMemo(() => {
    const days = getDaysForPreset(appliedPreset);
    return generateSalesData(days, 0.15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedPreset, dataVersion]);

  const comparisonRows = useMemo(() => {
    return getComparisonRows(appliedPreset, currentData);
  }, [appliedPreset, currentData]);

  const handleApply = () => {
    // Apply the selected preset and regenerate data
    setAppliedPreset(selectedPreset);
    setDataVersion((prev) => prev + 1);
  };

  // Get current timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  };

  // Render table cell value
  const renderCellValue = (
    value: number,
    isPercentChange: boolean = false,
    isCurrency: boolean = false
  ) => {
    if (isPercentChange) {
      return formatPercent(value);
    }
    if (isCurrency) {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar - Dark Teal */}
      <nav className="bg-[#002F36] text-white px-2 py-0 border-b border-b-gray-600">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left side: Menu and Logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-3 hover:border hover:border-white border-r border-white">
                  <Menu size={20} strokeWidth={2.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white p-0">
                <SidebarNavigation onNavigate={() => setIsSheetOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="border-r-[1px] border-white/40 h-[30%] pr-2">
              <Image src={AmazonLogo} alt="Amazon-Logo" />
            </div>
          </div>

          {/* Center: Store selector and Search bar */}
          <div className="flex items-center gap-3 flex-1 mx-6">
            {/* Store selector */}
            <div className="flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded text-xs min-w-fit">
              <input
                type="text"
                placeholder="Grace de Dios Busine..."
                className="bg-transparent outline-none w-40 text-xs placeholder:font-bold placeholder:text-gray-900"
              />
              <div className="bg-transparent outline-none text-xs border-l border-gray-300 pl-2">
                <span>United...</span>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 flex items-center gap-2 bg-[#00606F] px-2 rounded max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white text-sm placeholder-white flex-1 focus:outline-none px-3 py-2"
              />
              <span className="w-[20px] h-full hover:bg-[#00606F]">
                <Search size={20} className="text-white" />
              </span>
            </div>
          </div>

          {/* Right side: Controls */}
          <div className="flex items-center gap-3 text-white">
            <div className="flex items-center gap-3">
              {/* Toggle Switch */}
              <button
                className="relative w-9 h-[19px] rounded-full bg-[#2f5f5f] transition-colors"
                aria-label="Toggle New Seller Central"
              >
                <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform translate-x-0" />
              </button>

              <p className="text-xs">New Seller Central</p>

              <Image
                src={SparleIcon}
                alt="sparkle-icon"
                width={19}
                className="invert"
              />
            </div>

            {/* Mail */}
            <button className="p-2 rounded hover:bg-[#0d2626]">
              <Mail size={18} />
            </button>

            {/* Settings */}
            <button className="p-2 rounded hover:bg-[#0d2626]">
              <Settings size={18} />
            </button>

            {/* Language / Globe */}
            <button className="flex items-center gap-1 p-2 rounded hover:bg-[#0d2626]">
              <span className="text-xs font-medium">EN</span>
              <ChevronDown size={14} />
            </button>

            {/* Help */}
            <p className="text-sm font-medium">Help</p>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="bg-[#002F36] border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="flex items-center text-sm text-white mx-auto">
            Add your favorite pages here by clicking this icon{" "}
            <span className="px-1">
              <IoBookmark color="white" size={14} />
            </span>{" "}
            in the navigation menu.
          </p>

          <button className="text-sm text-white">Hide</button>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-48" : "w-0"
          } bg-gray-50 transition-all duration-300 overflow-hidden px-2`}
        >
          <div className="p-3">
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-1 text-teal-700 text-xs font-bold mb-5"
            >
              <X size={14} className="text-black" />
              CLOSE REPORTS MENU
            </button>

            <div className="space-y-4 text-xs">
              {/* Dashboards Section */}
              <div>
                <div className="py-1 px-2 bg-gray-400/20">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-tight">
                    Dashboards
                  </h3>
                </div>
                <a href="#" className="block font-bold py-1 pl-3">
                  Sales Dashboard
                </a>
              </div>

              {/* Business Reports Section */}
              <div>
                <div className="py-1 px-2 bg-gray-400/20">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-tight">
                    Business Reports
                  </h3>
                </div>
                <div className="space-y-1 text-xs">
                  <a href="#" className="block text-sm px-1 py-1 font-medium">
                    By Date
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 pl-2"
                  >
                    Sales and Traffic
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 py-1 pl-2"
                  >
                    Detail Page Sales and Traffic
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 py-1 pl-2"
                  >
                    Seller Performance
                  </a>
                  <a href="#" className="block text-sm px-1 py-1 font-medium">
                    By ASIN
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 py-1 px-2"
                  >
                    Detail Page Sales and Traffic
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 py-1 px-2"
                  >
                    Detail Page Sales and Traffic by Parent Item
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-teal-700 py-1 px-2"
                  >
                    Detail Page Sales and Traffic by Child Item
                  </a>
                </div>
              </div>

              {/* Other Section */}
              <div>
                <a href="#" className="block text-sm px-1 py-1 font-medium">
                  Other
                </a>
                <a
                  href="#"
                  className="block text-sm font-medium text-teal-700 py-1 px-2"
                >
                  Sales and Orders by Month
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          {/* Announcement Bars */}
          <div className="flex flex-col gap-3">
            {showAlert1 && (
              <div className="bg-blue-50 border-b border-l-4 border-l-[#0A6FC2] border-gray-200 px-4 py-7 flex gap-3">
                <AlertCircle
                  className="text-blue-500 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 leading-5">
                    <span className="font-medium">Update for Sellers:</span>{" "}
                    Note that some product discounts are now applied directly on
                    the product page instead of at checkout. This change impacts
                    the year-over-year comparability of the Ordered Product
                    Sales (OPS) metric. To ensure accurate historical
                    comparisons during sales events, we recommend using unit
                    sales metrics as a supplement to OPS in your analysis.
                  </p>
                </div>
                <button
                  onClick={() => setShowAlert1(false)}
                  className="flex-shrink-0"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            )}
            {showAlert2 && (
              <div className="bg-blue-50 border-b border-l-4 border-l-[#0A6FC2] border-gray-200 px-4 py-7 flex gap-3">
                <AlertCircle
                  className="text-blue-500 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-800 leading-5 max-w-7xl">
                      Now you can set up Performance Alerts to track key metrics
                      for your ASINs. Get notified when there are fluctuations
                      in your business performance, so you can take action
                      faster. Easily add, edit, or remove alerts anytime and
                      access all past notifications in one place.
                    </p>
                    <a
                      href="#"
                      className="text-teal-700 ml-2 font-medium text-sm"
                    >
                      Set Up Alerts
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setShowAlert2(false)}
                  className="flex-shrink-0"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            )}
          </div>

          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between py-5">
              <div>
                <h1 className="text-3xl font-medium text-gray-900 flex items-center gap-2">
                  Sales Dashboard
                  <a href="#" className="text-sm text-teal-700">
                    Learn more
                  </a>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApply}
                  className="border border-[#007587] px-3 py-1.5 rounded text-sm font-medium text-[#007587] hover:bg-gray-50"
                >
                  Refresh
                </button>
                <button className="bg-[#007587] text-white px-3 py-1.5 rounded text-sm font-medium">
                  Download
                </button>
                <button className="p-1">
                  <FaBell className="text-[#007587]" size={20} />
                </button>
              </div>
            </div>

            {/* Business Performance Insights Panel */}
            <div className="border border-gray-300 rounded p-4 mb-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-gray-900 text-base flex gap-2">
                    <span>
                      <VscSparkleFilled className="text-[#007587]" size={20} />
                    </span>
                    Business Performance Insights
                  </h3>

                  <p className="text-sm text-gray-700 leading-5">
                    Your store is showing strong performance for the selected
                    period. Total sales reached{" "}
                    {formatCurrency(currentData.orderedProductSales)} with{" "}
                    {formatNumber(currentData.totalOrderItems)} order items and{" "}
                    {formatNumber(currentData.unitsOrdered)} units ordered. The
                    average order value is{" "}
                    {formatCurrency(currentData.avgSalesPerOrder)}, indicating
                    healthy customer spending patterns. Consider analyzing your
                    top-performing products to identify opportunities for
                    expansion.
                  </p>
                  <div className="mt-2 flex justify-end gap-3">
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Help improve this experience
                    </a>
                    <div className="flex items-center gap-6">
                      <button className="hover:opacity-70">
                        <AiFillLike className="text-gray-500" size={17} />
                      </button>
                      <button className="hover:opacity-70">
                        <BiSolidDislike className="text-gray-500" size={17} />
                      </button>
                    </div>
                    <span className="border-l-2 pl-2">
                      <button className="hover:opacity-70">
                        <MdOutlineContentCopy
                          className="text-gray-500"
                          size={17}
                        />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-[#EBECED] flex items-end gap-3 mb-5 p-7">
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-gray-700">
                Date
              </label>
              <select
                value={selectedPreset}
                onChange={(e) =>
                  setSelectedPreset(e.target.value as DatePreset)
                }
                className="w-[350px] border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700"
              >
                <option value="today">{getDatePresetLabel("today")}</option>
                <option value="yesterday">
                  {getDatePresetLabel("yesterday")}
                </option>
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="mtd">{getDatePresetLabel("mtd")}</option>
                <option value="ytd">{getDatePresetLabel("ytd")}</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-gray-700">
                Fulfillment channel
              </label>
              <select
                value={fulfillmentChannel}
                onChange={(e) => setFulfillmentChannel(e.target.value)}
                className="w-[350px] border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700"
              >
                <option value="both">Both (Amazon and seller)</option>
                <option value="amazon">Amazon</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <button
              onClick={handleApply}
              className="bg-[#007587] text-white px-4 py-[9px] rounded text-sm font-medium hover:bg-[#006577] transition-colors"
            >
              Apply
            </button>
          </div>

          {/* Sales Snapshot */}
          <div className="border border-gray-300 rounded py-4 mb-6">
            <div className="bg-gray-50 flex gap-2 border-b px-3 pb-2">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">
                Sales Snapshot
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                taken at {getCurrentTimestamp()}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4 px-3 pt-2">
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Total order items
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatNumber(currentData.totalOrderItems)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Units ordered
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatNumber(currentData.unitsOrdered)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Ordered product sales
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(currentData.orderedProductSales)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Avg. units/order item
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatNumber(currentData.avgUnitsPerOrder)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Avg. sales/order item
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(currentData.avgSalesPerOrder)}
                </p>
              </div>
            </div>
          </div>

          {/* Compare Sales */}
          <div className="bg-blue-50 border border-gray-300 rounded p-4 mb-6">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-xl font-medium text-gray-900">
                Compare Sales
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode("graph")}
                  className={`px-3 py-1 text-sm font-medium rounded border ${
                    viewMode === "graph"
                      ? "bg-white text-gray-900 border border-gray-300"
                      : "bg-white-50 text-gray-700"
                  }`}
                >
                  Graph view
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    viewMode === "table"
                      ? "bg-[#138296] text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  Table view
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto bg-[#EBF7FF] px-2 py-2 rounded-sm">
              <table className="w-full table-fixed text-[14px] text-gray-800">
                <thead>
                  <tr className="bg-[#e6f1ff] border border-[#d7d7d7]">
                    <th className="bg-[#F7F7F8] px-3 py-2 font-semibold tracking-wide"></th>
                    <th className="bg-[#F7F7F8] text-center py-2 font-bold border-l border-l-gray-300 tracking-wide">
                      Total order items
                    </th>
                    <th className="bg-[#F7F7F8] text-center py-2 font-bold border-l border-l-gray-300 tracking-wide">
                      Units ordered
                    </th>
                    <th className="bg-[#F7F7F8] text-center py-2 font-bold border-l border-l-gray-300 tracking-wide">
                      Ordered product sales
                    </th>
                    <th className="bg-[#F7F7F8] text-center py-2 font-bold border-l border-l-gray-300 tracking-wide">
                      Average units/order item
                    </th>
                    <th className="bg-[#F7F7F8] text-center py-2 font-bold border-l border-l-gray-300 tracking-wide">
                      Average sales/order item
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border text-sm border-[#d7d7d7] ${
                        row.isPercentChange ? "font-medium" : ""
                      }`}
                    >
                      <td className="px-3 py-2 text-left">{row.label}</td>
                      <td className="px-3 py-2 text-center">
                        {renderCellValue(
                          row.metrics.totalOrderItems,
                          row.isPercentChange
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {renderCellValue(
                          row.metrics.unitsOrdered,
                          row.isPercentChange
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {renderCellValue(
                          row.metrics.orderedProductSales,
                          row.isPercentChange,
                          !row.isPercentChange
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {renderCellValue(
                          row.metrics.avgUnitsPerOrder,
                          row.isPercentChange
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {renderCellValue(
                          row.metrics.avgSalesPerOrder,
                          row.isPercentChange,
                          !row.isPercentChange
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep dive ASIN performance */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-medium text-gray-900">
                  Deep dive your ASIN performance
                </h3>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  Comparing Monday-Sunday ending Jan 11, 2026 to similar ASINs
                </p>
              </div>
              <a href="#" className="text-teal-700 text-xs font-medium">
                Show ASINs
              </a>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-2.5 py-1 border text-gray-500 text-xs rounded-full hover:bg-gray-300 font-medium">
                Products with Declining Sales
              </button>
              <button className="px-2.5 py-1 border text-gray-500 text-xs rounded-full hover:bg-gray-300 font-medium">
                Products with Increasing Sales
              </button>
              <button className="px-2.5 py-1 border text-gray-500 text-xs rounded-full hover:bg-gray-300 font-medium">
                Declining Traffic Products
              </button>
              <button className="px-2.5 py-1 bg-[#007587] text-white text-xs rounded-full font-medium">
                Products Below Market Average
              </button>
              <button className="px-2.5 py-1 border text-gray-500 text-xs rounded-full hover:bg-gray-300 font-medium">
                Top Sales Products
              </button>
              <div className="ml-auto">
                <select className="border border-gray-300 rounded px-5 py-1 text-xs bg-white text-gray-700">
                  <option>Prior Week</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 h-16 flex items-center text-xs text-[#555]">
        <div className="flex items-center justify-between w-full">
          {/* Left Section */}
          <div className="flex items-center gap-5">
            <button className="hover:underline">Help</button>
            <button className="hover:underline">Program Policies</button>

            {/* Language Selector */}
            <select className="border border-gray-300 rounded-sm px-2 py-[2px] text-xs text-gray-800 bg-white focus:outline-none">
              <option>English</option>
            </select>

            {/* App Download */}
            <button className="flex items-center gap-1 hover:underline text-gray-800">
              <Image src={FooterLogo} alt="Amazon App" className="w-6 h-6" />
              <span>Download the Amazon Seller mobile app</span>
            </button>
          </div>

          {/* Right Section */}
          <div className="text-gray-400 text-xs">
            © 1999-2026, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function SalesDashboard() {
  return (
    <Suspense fallback={null}>
      <BusinessReportsPage />
    </Suspense>
  );
}
