"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import AmazonLogo from "../../public/icons/amazon-logo.svg";
import SparleIcon from "../../public/icons/sparles-icon.svg";
import FooterLogo from "../../public/icons/footer-amazon-logo.png";

import GloveImg from "../../public/images/glove-img.jpg";
import BoldImg from "../../public/images/replaceable-bold-img.jpg";
import CapImg from "../../public/images/cap-img.jpg";
import WeightedGloveImg from "../../public/images/weighted-gloves.jpg";
import TutorImg from "../../public/images/tuitor-img.png";
import McfStorageImg from "../../public/images/mcf-orders-img.jpg";
import BulkOrdersImg from "../../public/images/bulk-storage-img.jpeg";

import {
  Menu,
  Search,
  Settings,
  Mail,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Info,
  Filter,
  Eye,
  Star,
  MessageSquare,
  Heart,
  Check,
} from "lucide-react";
import { IoBookmark } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarNavigation from "@/components/sidebar-navigation";

export default function SellerCentralDashboard() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
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
              <Image src={AmazonLogo} alt="Amzaon-LogoD" />
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
              {/* Label + Sparkle */}
            </div>

            {/* Settings */}

            {/* Mail */}
            <button className="p-2 rounded hover:bg-[#0d2626]">
              <Mail size={18} />
            </button>

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
          <div className="flex items-center gap-6">
            <IoBookmark color="white" size={14} />
            <button className="text-sm font-medium text-white">
              Add Products
            </button>
            <button className="text-sm font-medium text-white">
              Explore Services
            </button>
          </div>
          <button className="text-sm font-medium text-white px-5 py-1 border">
            Edit
          </button>
        </div>
      </div>

      <div className="w-full max-w-[82%] mx-auto">
        {/* Account Health Banner */}
        <div className="px-6 py-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">
                Good morning, your account health is
              </span>
              <span className="px-2 py-0.5 bg-[#538000] text-white text-xs font-medium rounded-full">
                Healthy
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-700 rounded hover:bg-gray-100">
                Launch Tour
              </button>
              <button className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-700 rounded hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="flex bg-gray-50 gap-7">
          <div className="w-80">
            {/* Actions Section */}
            <div className="flex bg-gray-50">
              <div className="w-80">
                {/* Actions Section */}
                <div className="mb-6 border border-gray-900 rounded-lg bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-3">
                    <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                      Actions
                      <MdInfoOutline className="text-gray-500" size={16} />
                    </h3>

                    {/* Count pill */}
                    <span className="bg-gray-700 text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                      1
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200" />
                  {/* Buyer Message */}
                  <div className="p-4">
                    <div className="flex items-start justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Buyer Message
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          <span className="text-teal-600 font-medium">1</span>{" "}
                          Over 24 hours target
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          <span className="text-teal-600 font-medium">0</span>{" "}
                          Under 24 hours target
                        </p>
                      </div>

                      {/* Three-dot menu */}
                      <button className="text-gray-500 hover:text-gray-700">
                        <BsThreeDotsVertical size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Ship Orders Card */}
                  <div className="p-4">
                    <div className="flex items-start justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Ship orders
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          6 orders to confirm or ship
                        </p>
                      </div>

                      {/* Three-dot menu */}
                      <button className="text-gray-500 hover:text-gray-700">
                        <BsThreeDotsVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Communications Section */}
            <div className="bg-white border border-gray-300 rounded-lg w-[320px]">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">Communications</h3>
                  <Info size={14} />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 py-3">
                {/* Seller Forums */}
                <div className="mb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        Seller Forums
                      </h4>
                      <button className="text-xs text-teal-700 hover:underline">
                        See all
                      </button>
                    </div>
                    <MoreVertical
                      size={16}
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>

                  <div className="mt-3 space-y-3">
                    {/* Item 1 */}
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">
                        Stop Racing to the Bottom - You're Destroying Your Own
                        Profits
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 7</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 1.2K
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={12} /> 33
                        </span>
                      </div>
                    </div>

                    {/* Item 2 – Highlighted */}
                    <div className="">
                      <p className="text-sm text-gray-900 leading-snug">
                        Chargebacks - Are we now responsible for payment related
                        fraud chargebacks?
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 8</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 368
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={12} /> 14
                        </span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">
                        Amazon promised customer a 50% discount on their next
                        order due to a previous issue...
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 10</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 88
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={12} /> 5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* Seller News */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        Seller News
                      </h4>
                      <button className="text-xs text-teal-700 hover:underline">
                        See all
                      </button>
                    </div>
                    <MoreVertical
                      size={16}
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>

                  <div className="mt-3 space-y-3">
                    {/* Item 1 */}
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">
                        Prepaid return labels required for high-value items
                        starting February 8
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 9</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 9.5K
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> 9
                        </span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">
                        Changes to review sharing across product variations
                        starting Feb 12
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 7</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 15.9K
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> 51
                        </span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">
                        Track Amazon Business customer patterns with new metrics
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Jan 6</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> 5.9K
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> 12
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" xl:flex-1">
            {/* Global Snapshot */}
            <div className="mb-8 p-3 border rounded-lg bg-white">
              {/* Header */}
              <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-base font-bold text-gray-900">
                  Global Snapshot
                </h2>
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-gray-600" />
                  <Eye size={14} className="text-gray-600" />
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-6 border border-gray-300 rounded-lg overflow-hidden bg-white">
                <SnapshotCard
                  label="Sales"
                  value="$942.00"
                  subtitle="Today so far"
                  chart
                  rows={[
                    { label: "FBM Unshipped", value: "0" },
                    { label: "FBM Pending", value: "0" },
                    { label: "FBA Pending", value: "0" },
                  ]}
                />

                <SnapshotCard
                  label="Open Orders"
                  value="13"
                  subtitle="Total Count"
                  active
                  rows={[
                    { label: "FBM Unshipped", value: "1" },
                    { label: "FBM Pending", value: "0" },
                    { label: "FBA Pending", value: "0" },
                  ]}
                />

                <SnapshotCard
                  label="Buyer Messages"
                  value="1"
                  subtitle="Cases requiring attention"
                  infoTitle="Inventory Performance Index"
                  infoText="No data available"
                />

                <SnapshotCard
                  label="Featured Offer %"
                  value="92%"
                  subtitle="2 days ago"
                  infoTitle="Global Promotions Sales"
                  infoText="No data available"
                />

                <SnapshotCard
                  label="Seller Feedback"
                  value="4.4"
                  subtitle="Past Year (88)"
                  stars
                />

                <SnapshotCard
                  label="Payments"
                  value="$16,830"
                  subtitle="Total Balance"
                />
              </div>
            </div>

            {/* New Seller Guide */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-200">
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-gray-900 mb-1">
                      New Seller Guide
                    </h2>
                    <p className="text-sm text-gray-600 max-w-3xl">
                      The New Seller Guide is a set of brand, logistics,
                      pricing, and promotional services that we recommend to
                      sellers who are just getting started with Amazon. Sellers
                      who adopt the New Seller Guide can take advantage of over
                      $50,000 in New Seller Incentives.
                    </p>
                    <button className="text-sm text-teal-700 hover:underline mt-1">
                      Learn more
                    </button>
                  </div>

                  <MoreVertical size={18} className="text-gray-500 mt-1" />
                </div>

                {/* Items */}
                <div>
                  <GuideItem
                    number="1"
                    title="Personalize your onboarding experience"
                    completed
                  />
                  <GuideItem
                    number="2"
                    title="List your first product"
                    completed
                  />
                  <GuideItem
                    number="3"
                    title="Enroll in Fast Shipping Options"
                    completed
                    active
                  />
                  <GuideItem
                    number="4"
                    title="Adjust pricing quickly with Automated Pricing"
                    completed={false}
                  />
                  <GuideItem
                    number="5"
                    title="Showcase your products with Sponsored Products"
                    completed={false}
                  />
                </div>
              </div>
            </div>

            {/* Product Performance */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-4 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-gray-900">
                        Product Performance
                      </h2>
                      <Info size={14} className="text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Last 30 days</span>
                  </div>

                  {/* Top Right Controls */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select className="h-8 min-w-[110px] px-3 pr-7 text-sm border border-gray-500 rounded-sm bg-white text-gray-800 appearance-none focus:outline-none">
                        <option>Active</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                      />
                    </div>

                    <div className="relative">
                      <select className="h-8 min-w-[160px] px-3 pr-7 text-sm border border-gray-500 rounded-sm bg-white text-gray-800 appearance-none focus:outline-none">
                        <option>Frequently interacted</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Search"
                        className="h-8 w-[220px] px-3 text-sm border border-gray-500 rounded-l-sm placeholder:text-base placeholder:text-gray-500 focus:outline-none"
                      />
                      <button className="h-8 w-9 flex items-center justify-center bg-[#232F3E] text-white rounded-r-md">
                        <Search size={20} />
                      </button>
                    </div>

                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-md">
                      <MoreVertical size={18} className="text-gray-700" />
                    </button>

                    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-md">
                      <ChevronUp size={18} />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="border-t border-gray-200 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                        <th className="text-left py-2.5 px-4 font-medium">
                          <div className="flex items-center text-sm font-medium gap-1">
                            Product details
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowsUpDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          Listing status
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium bg-gray-100">
                          <div className="flex items-center gap-1">
                            Sales
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowSmDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          <div className="flex items-center gap-1">
                            Units sold
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowsUpDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          <div className="flex items-center gap-1">
                            Page views
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowsUpDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          <div className="flex items-center gap-1">
                            Inventory
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowsUpDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          <div className="flex items-center gap-1">
                            Price
                            <span className="flex flex-col leading-none text-[10px]">
                              <HiArrowsUpDown size={16} />
                            </span>
                          </div>
                        </th>

                        <th className="text-left py-2.5 px-4 text-sm font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <ProductRow
                        name="Replacement for Genuine SHM DEM B..."
                        sku="ASIN G02J0CWCC7"
                        skuCode="SKU Z0-A2BR-LDT1"
                        status="Active"
                        inventory="60"
                        inventoryType="FBA"
                        price="$27.00"
                        starred={true}
                        image={BoldImg}
                      />
                      <ProductRow
                        name="Kpop Wings Tour Cap Snapback Baseb..."
                        sku="ASIN B07HP2GFWR"
                        skuCode="SKU VJ-6R7K-1RSV"
                        status="Active"
                        inventory="22"
                        inventoryType="FBM"
                        price="$18.37"
                        starred={true}
                        image={CapImg}
                      />
                      <ProductRow
                        name="Kpop Wings Tour Cap Snapback Baseb..."
                        sku="ASIN B07HP2GFWR"
                        skuCode="SKU PT-HJ9I-4HNX"
                        status="Active"
                        inventory="22"
                        inventoryType="FBA"
                        price="$22.00"
                        starred={true}
                        image={CapImg}
                      />
                      <ProductRow
                        name="1 Pair Get Heel Cups Heel Pain Relieve..."
                        sku="ASIN B03JNM776P"
                        skuCode="SKU CJ-AKVJ-A3ZL"
                        status="Active"
                        inventory="3"
                        inventoryType="FBM"
                        price="$34.72"
                        starred={true}
                        image={GloveImg}
                      />
                      <ProductRow
                        name="Grips for Nintendo Switch Fitness Boxi..."
                        sku="ASIN B08RBRCM3C"
                        skuCode="SKU 92-YF80-8K3M"
                        status="Active"
                        inventory="44"
                        inventoryType="FBA"
                        price="$23.34"
                        starred={true}
                        image={WeightedGloveImg}
                      />
                    </tbody>
                  </table>
                </div>

                {/* Footer / Pagination */}
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-gray-600">1 - 5 of 7</span>

                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-900 hover:bg-gray-100 rounded">
                      1
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-900 hover:bg-gray-100 rounded">
                      2
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <button className="px-3 py-1 text-xs font-semibold text-teal-500 border border-teal-600 rounded hover:bg-teal-50">
                    Go to Manage All Inventory
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <div className="border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center gap-2 px-6 pt-5 pb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Recommendations
                  </h2>
                  <Info size={14} className="text-gray-400" />
                </div>

                <div className="grid grid-cols-3 gap-6 px-6 pb-6">
                  <RecommendationCard
                    title="Tutorials and Training"
                    description="Learn how to sell on Amazon"
                    buttonText="Visit Seller University"
                    imageUrl={TutorImg}
                  />
                  <RecommendationCard
                    title="Low cost bulk storage"
                    description="Avoid inbound placement fees and send your bulk inventory to AMD instead"
                    buttonText="Get started"
                    imageUrl={BulkOrdersImg}
                  />
                  <RecommendationCard
                    title="Use MCF for all orders"
                    description="With MCF, deliver orders from all sales channels in as fast as one day"
                    buttonText="Start using MCF today"
                    imageUrl={McfStorageImg}
                  />
                </div>
              </div>
            </div>

            {/* Hidden Section */}
            <div className="border border-gray-200 rounded-lg bg-white mb-5">
              <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">Hidden</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-800 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
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

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { HiArrowsUpDown } from "react-icons/hi2";
import { HiArrowSmDown } from "react-icons/hi";
import { IoIosStarOutline } from "react-icons/io";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Row {
  label: string;
  value: string;
}

interface SnapshotCardProps {
  label: string;
  value: string;
  subtitle?: string;
  chart?: boolean;
  rows?: Row[];
  stars?: boolean;
  active?: boolean;
  infoTitle?: string;
  infoText?: string;
}

export function SnapshotCard({
  label,
  value,
  subtitle,
  chart,
  rows,
  stars,
  active,
  infoTitle,
  infoText,
}: SnapshotCardProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      width: 1.5,
      curve: "straight",
    },
    colors: ["#111827"],
    grid: { show: false },
    tooltip: { enabled: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
      min: 0,
      max: 600,
    },
  };

  // EXACT reference shape with $600 spike
  const series = [
    {
      name: "Sales",
      data: [0, 0, 0, 0, 150, 600, 150, 0],
    },
  ];

  return (
    <div
      className={`h-[160px] px-3 py-2.5 border-r border-gray-300 last:border-r-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-800">{label}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      {/* Value */}
      <div className="text-lg font-semibold text-gray-900 leading-tight">
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && <p className="text-xs text-gray-500 mb-1">{subtitle}</p>}

      {/* Stars */}
      {stars && (
        <div className="flex items-center gap-0.5 text-yellow-500 mb-1">
          {[...Array(4)].map((_, i) => (
            <Star
              key={i}
              size={12}
              fill="currentColor"
              className="text-yellow-500"
            />
          ))}
          <Star size={12} className="text-yellow-500" />
        </div>
      )}

      {/* Chart */}
      {chart && (
        <>
          <div className="mt-1 mb-1">
            <Chart options={options} series={series} type="line" height={46} />
          </div>

          {rows && (
            <div className="border-t border-gray-200 pt-1 text-xs text-gray-700 space-y-0.5">
              {rows.map((row, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-600">{row.label}</span>
                  <span className="text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Info Blocks */}
      {infoTitle && (
        <div className="mt-2 text-xs">
          <div className="text-gray-800">{infoTitle}</div>
          <div className="text-gray-500">{infoText}</div>
          <span className="text-teal-700 cursor-pointer">Learn More</span>
        </div>
      )}
    </div>
  );
}

interface GuideItemProps {
  number: string;
  title: string;
  completed: boolean;
  active?: boolean;
}

function GuideItem({ number, title, completed, active }: GuideItemProps) {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0 hover:cursor-pointer hover:bg-teal-700/10 ${
        active ? "bg-gray-50" : "bg-white"
      }`}
    >
      {/* Left: Icon + Text */}
      <div className="flex items-center gap-3">
        {completed ? (
          <div className="w-5 h-5 rounded-full bg-[#008296] flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-gray-400" />
        )}

        <span className="text-sm font-medium text-gray-900">
          {number}. {title}
        </span>
      </div>

      {/* Right: Chevron */}
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}

interface ProductRowProps {
  name: string;
  sku: string;
  skuCode: string;
  status: string;
  inventory: string;
  inventoryType: string;
  price: string;
  starred: boolean;
  image: string | StaticImageData; // ✅ Allow dynamic images (URL or import)
}

function ProductRow({
  name,
  sku,
  skuCode,
  status,
  inventory,
  inventoryType,
  price,
  starred,
  image,
}: ProductRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-2.5 px-4">
        <div className="flex items-start gap-3">
          {/* Star */}
          <button className="text-yellow-600 mt-0.5 flex-shrink-0">
            {starred ? (
              <IoIosStarOutline size={16} fill="currentColor" />
            ) : (
              <IoIosStarOutline size={16} />
            )}
          </button>

          {/* Product Image */}
          <div className="w-10 h-10 relative flex-shrink-0 rounded">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          {/* Product Info */}
          <div className="min-w-0">
            <p className="text-sm text-blue-600 font-medium truncate leading-tight">
              {name}
            </p>
            <p className="text-xs text-gray-500 truncate">{sku}</p>
            <p className="text-xs text-gray-500 truncate">{skuCode}</p>
          </div>
        </div>
      </td>

      <td className="py-2.5 px-4 text-sm text-gray-900">{status}</td>
      <td className="py-2.5 px-4 text-sm text-gray-500">--</td>
      <td className="py-2.5 px-4 text-sm text-gray-500">--</td>
      <td className="py-2.5 px-4 text-sm text-gray-500">--</td>

      <td className="py-2.5 px-4 text-sm text-gray-900">
        {inventory}{" "}
        <span className="text-gray-500 text-xs">{inventoryType}</span>
      </td>

      <td className="py-2.5 px-4 text-sm font-semibold text-gray-900">
        {price}
      </td>

      <td className="py-2.5 px-4">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronDown size={14} className="text-gray-600" />
        </button>
      </td>
    </tr>
  );
}

interface RecommendationCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: StaticImageData;
}

function RecommendationCard({
  title,
  description,
  buttonText,
  imageUrl,
}: RecommendationCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* Top Row: Title + 3 dots */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Image */}
      <div className="px-4">
        <div className="h-[140px] w-full bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pt-3">
        <p className="text-xs text-gray-700 leading-snug">{description}</p>
      </div>

      {/* Button */}
      <div className="px-4 pt-4 pb-5">
        <button className="w-full h-9 bg-[#007185] hover:bg-[#006270] text-white text-sm font-semibold rounded-md">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

interface ChevronUpProps {
  size?: number;
}

function ChevronUp({ size = 24 }: ChevronUpProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );
}
