import {
  LayoutDashboard,
  Clock,
  Calendar,
  Users,
  Folder,
  FileText,
  DollarSign,
  BarChart3,
  Radio,
  Settings,
  UserCog,
  HelpCircle,
  ScrollText,
  Mail,
  UserCheck,
  Layout,
  Image,
  FileCheck,
  User,
  ShoppingCart,
  Briefcase,
  Tag,
  Package,
  LayoutGrid,
  Sparkles,
  Star,
  Wrench,
  MessageSquare,
  Wallet,
  TrendingDown,
  Trash2,
} from "lucide-react";

export const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "Dashboard", href: "/console" },
  { icon: Clock, label: "Attendance", id: "Attendance", href: "/console/attendance" },
  { icon: Calendar, label: "Schedule", id: "Schedule", href: "/console/schedule" },
  { icon: Folder, label: "Projects", id: "Projects", href: "/console/projects" },
  { icon: ShoppingCart, label: "Orders", id: "Orders", href: "/console/orders" },
  { icon: FileText, label: "Leave Management", id: "Leave Management", href: "/console/leave" },
  { icon: ScrollText, label: "Documents", id: "Documents", href: "/console/documents" },
  { icon: Mail, label: "Email Alerts", id: "Email Alerts", href: "/console/email-alerts" },
  { icon: MessageSquare, label: "Inbox", id: "Inbox", href: "/console/inbox" },
  { icon: UserCheck, label: "Recruitment", id: "Recruitment", href: "/console/recruitment" },
  { icon: DollarSign, label: "Payroll", id: "Payroll", href: "/console/payroll" },
  { icon: TrendingDown, label: "Deductions", id: "Deductions", href: "/console/payroll/deductions" },
  { icon: BarChart3, label: "Reports", id: "Reports", href: "/console/reports" },
  { icon: Radio, label: "Broadcast", id: "Broadcast", href: "/console/broadcast" },
  { icon: Briefcase, label: "Our Clients", id: "Our Clients", href: "/console/our-client" },
  { icon: Wrench, label: "Service Requests", id: "Service Requests", href: "/console/service-request" },
  { icon: Settings, label: "Settings", id: "Settings", href: "/console/settings" },
];

export const othersNavItems = [
  { 
    icon: Settings, 
    label: "Settings", 
    id: "Settings", 
    href: "/console/platform-settings",
    children: [
      { 
        icon: Layout, 
        label: "Home", 
        id: "Home", 
        href: "/console/platform-settings/home",
        children: [
          { icon: Image, label: "Carousel", id: "Carousel", href: "/console/landing/carousel" },
          { icon: FileText, label: "Case Studies", id: "Case Studies", href: "/console/landing/case-studies" },
          { icon: DollarSign, label: "Price Packages", id: "Price Packages", href: "/console/landing/price-package" },
          { icon: Star, label: "Customer Reviews", id: "Customer Reviews", href: "/console/landing/customer-review" },
        ]
      },
      { icon: LayoutGrid, label: "Departments", id: "Departments", href: "/console/landing/departmant" },
      { icon: Tag, label: "Categories", id: "Categories", href: "/console/landing/category" },
      { icon: Sparkles, label: "Our Services", id: "Our Services", href: "/console/landing/our-service" },
      { icon: Package, label: "Products", id: "Products", href: "/console/landing/our-product" },

      { 
        icon: Package, 
        label: "Our Products", 
        id: "Our Products", 
        href: "/console/platform-settings/our-product",
        children: [
          { icon: Package, label: "SquadLog", id: "SquadLog", href: "/console/platform-settings/our-product/squadlog" },
        ]
      },
      { icon: Layout, label: "Footer", id: "Footer", href: "/console/landing/footer" },
   
    ]
  },
  { icon: UserCog, label: "Employee Directory", id: "Employee Directory", href: "/console/our-team" },
  { icon: HelpCircle, label: "Help Center", id: "Help Center", href: "/console/help-center" },
];
