"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  submenu?: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "Catalog",
    submenu: [
      "Add Products",
      "Complete Your Drafts",
      "View Selling Applications",
      "Upload Images",
      "Upload and Manage Videos",
    ],
  },
  {
    label: "Inventory",
    submenu: [
      "Manage All Inventory",
      "Manage Seller Fulfilled Products",
      "Fulfillment by Amazon (FBA)",
      "Dashboard",
      "FBA Inventory",
      "Shipments",
      "Analytics",
      "Warehousing and distribution (AWD)",
    ],
  },
  {
    label: "Pricing",
    submenu: ["Pricing Health", "Automate Pricing", "Enable 0% installments"],
  },
  {
    label: "Orders",
    submenu: [
      "Manage Orders",
      "Create MCF Order",
      "Order Reports",
      "Returns and Recovery",
      "Insights and Opportunities",
      "Manage Seller Fulfilled Returns",
      "Manage SAFE-T Claims",
    ],
  },
  {
    label: "Advertising",
    submenu: ["A+ Content Manager", "Price Discounts"],
  },
  {
    label: "Stores",
    submenu: ["Manage Stores"],
  },
  {
    label: "Growth",
    submenu: [
      "Add Prime to your site",
      "Growth Opportunities",
      "Explore Programs",
      "Custom Program",
      "Marketplace Product Guidance",
      "Product Opportunity Explorer",
      "Multi-Channel Fulfillment (MCF)",
    ],
  },
  {
    label: "Reports",
    submenu: [
      "Business Reports",
      "Custom Analytics",
      "Fulfillment",
      "Return Reports",
      "Amazon Generated Reports",
      "Tax Document Library",
      "Selling Economics and Fees",
    ],
  },
  {
    label: "Payments",
    submenu: ["Payments", "Reports Repository", "Currency Converter"],
  },
  {
    label: "Performance",
    submenu: [
      "Account Health",
      "Feedback Manager",
      "A-to-z Guarantee Claims",
      "Chargeback Claims",
      "Performance Notifications",
      "Voice of the Customer",
    ],
  },
  {
    label: "Apps and Services",
    submenu: [
      "Selling Partner Appstore",
      "Manage Your Apps",
      "Explore Services",
      "Manage Service Requests",
      "Develop Apps",
    ],
  },
  {
    label: "B2B",
    submenu: [
      "Manage Quotes",
      "Certifications",
      "Business Discount Insights",
      "Case Pack Recommendations",
    ],
  },
  {
    label: "Brands",
    submenu: ["Manage Your Brands", "Build Your Brand"],
  },
  {
    label: "Learn",
    submenu: ["Seller University", "Forums", "News"],
  },
];

export default function SidebarNavigation({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = (item: MenuItem) => {
    if (item.label === "Reports") {
      router.push("/business-reports");
      if (onNavigate) onNavigate();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900">Menu</h2>
      </div>

      <nav className="flex-1 overflow-visible">
        <div className="relative">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Parent Item */}
              <button
                onClick={() => handleClick(item)}
                className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100 flex items-center justify-between transition-colors"
              >
                <span className="font-medium">{item.label}</span>
                {item.submenu && (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>

              {hoveredItem === item.label && item.submenu && (
                <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 shadow-lg z-50 ml-0">
                  <div className="py-1">
                    {item.submenu.map((subitem) => (
                      <button
                        key={subitem}
                        onClick={() => {
                          if (
                            item.label === "Reports" &&
                            subitem === "Business Reports"
                          ) {
                            router.push("/business-reports");
                            if (onNavigate) onNavigate();
                          }
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {subitem}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
