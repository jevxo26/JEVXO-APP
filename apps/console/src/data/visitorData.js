// Mock visitor data for analytics demonstration
// In production, this would come from an analytics service or database

export const MOCK_VISITORS = [
  {
    id: "VIS-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 234-5678",
    avatar: "/avatars/01.png",
    firstVisit: "2026-01-15T09:30:00Z",
    lastVisit: "2026-01-26T16:45:00Z",
    totalVisits: 18,
    totalPageViews: 67,
    avgSessionDuration: "8m 45s",
    visitHistory: [
      {
        id: "VISIT-001",
        timestamp: "2026-01-26T16:45:00Z",
        page: "/landing/our-product/squadlog",
        pageType: "product",
        duration: "5m 20s",
        itemName: "SquadLog"
      },
      {
        id: "VISIT-002",
        timestamp: "2026-01-26T16:40:00Z",
        page: "/landing/our-service/consulting",
        pageType: "service",
        duration: "3m 15s",
        itemName: "Consulting Services"
      },
      {
        id: "VISIT-003",
        timestamp: "2026-01-26T16:35:00Z",
        page: "/landing/price-package",
        pageType: "pricing",
        duration: "2m 30s",
        itemName: "Pricing"
      }
    ]
  },
  {
    id: "VIS-002",
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    phone: "+1 (555) 345-6789",
    avatar: "/avatars/02.png",
    firstVisit: "2026-01-20T14:20:00Z",
    lastVisit: "2026-01-26T11:30:00Z",
    totalVisits: 12,
    totalPageViews: 45,
    avgSessionDuration: "6m 12s",
    visitHistory: [
      {
        id: "VISIT-004",
        timestamp: "2026-01-26T11:30:00Z",
        page: "/landing/our-service/web-development",
        pageType: "service",
        duration: "4m 50s",
        itemName: "Web Development"
      },
      {
        id: "VISIT-005",
        timestamp: "2026-01-26T11:25:00Z",
        page: "/landing/case-studies",
        pageType: "case-study",
        duration: "3m 40s",
        itemName: "Case Studies"
      }
    ]
  },
  {
    id: "VIS-003",
    name: "Emily Rodriguez",
    email: "emily.r@startup.com",
    phone: "+1 (555) 456-7890",
    avatar: "/avatars/03.png",
    firstVisit: "2026-01-18T10:15:00Z",
    lastVisit: "2026-01-25T15:20:00Z",
    totalVisits: 25,
    totalPageViews: 92,
    avgSessionDuration: "12m 30s",
    visitHistory: [
      {
        id: "VISIT-006",
        timestamp: "2026-01-25T15:20:00Z",
        page: "/landing/our-product/squadlog",
        pageType: "product",
        duration: "7m 15s",
        itemName: "SquadLog"
      },
      {
        id: "VISIT-007",
        timestamp: "2026-01-25T15:10:00Z",
        page: "/landing/our-service/mobile-app",
        pageType: "service",
        duration: "5m 30s",
        itemName: "Mobile App Development"
      },
      {
        id: "VISIT-008",
        timestamp: "2026-01-25T15:05:00Z",
        page: "/landing/customer-review",
        pageType: "reviews",
        duration: "2m 45s",
        itemName: "Customer Reviews"
      }
    ]
  },
  {
    id: "VIS-004",
    name: "David Park",
    email: "david.park@enterprise.com",
    phone: "+1 (555) 567-8901",
    avatar: "/avatars/04.png",
    firstVisit: "2026-01-22T13:45:00Z",
    lastVisit: "2026-01-26T09:15:00Z",
    totalVisits: 8,
    totalPageViews: 28,
    avgSessionDuration: "5m 20s",
    visitHistory: [
      {
        id: "VISIT-009",
        timestamp: "2026-01-26T09:15:00Z",
        page: "/landing/our-service/consulting",
        pageType: "service",
        duration: "6m 10s",
        itemName: "Consulting Services"
      },
      {
        id: "VISIT-010",
        timestamp: "2026-01-26T09:08:00Z",
        page: "/landing/departmant",
        pageType: "departments",
        duration: "2m 50s",
        itemName: "Departments"
      }
    ]
  },
  {
    id: "VIS-005",
    name: "Lisa Anderson",
    email: "l.anderson@biztech.com",
    phone: "+1 (555) 678-9012",
    avatar: "/avatars/05.png",
    firstVisit: "2026-01-16T11:00:00Z",
    lastVisit: "2026-01-26T14:30:00Z",
    totalVisits: 15,
    totalPageViews: 58,
    avgSessionDuration: "7m 45s",
    visitHistory: [
      {
        id: "VISIT-011",
        timestamp: "2026-01-26T14:30:00Z",
        page: "/landing/our-product/squadlog",
        pageType: "product",
        duration: "8m 20s",
        itemName: "SquadLog"
      },
      {
        id: "VISIT-012",
        timestamp: "2026-01-26T14:20:00Z",
        page: "/landing/price-package",
        pageType: "pricing",
        duration: "4m 15s",
        itemName: "Pricing"
      }
    ]
  },
  {
    id: "VIS-006",
    name: "James Wilson",
    email: "j.wilson@digital.agency",
    phone: "+1 (555) 789-0123",
    avatar: "/avatars/06.png",
    firstVisit: "2026-01-24T16:30:00Z",
    lastVisit: "2026-01-26T10:45:00Z",
    totalVisits: 5,
    totalPageViews: 19,
    avgSessionDuration: "4m 30s",
    visitHistory: [
      {
        id: "VISIT-013",
        timestamp: "2026-01-26T10:45:00Z",
        page: "/landing/our-service/web-development",
        pageType: "service",
        duration: "5m 40s",
        itemName: "Web Development"
      },
      {
        id: "VISIT-014",
        timestamp: "2026-01-26T10:38:00Z",
        page: "/landing/category",
        pageType: "categories",
        duration: "2m 20s",
        itemName: "Categories"
      }
    ]
  },
  {
    id: "VIS-007",
    name: "Maria Garcia",
    email: "maria.g@solutions.com",
    phone: "+1 (555) 890-1234",
    avatar: "/avatars/01.png",
    firstVisit: "2026-01-19T12:15:00Z",
    lastVisit: "2026-01-25T17:00:00Z",
    totalVisits: 20,
    totalPageViews: 75,
    avgSessionDuration: "9m 15s",
    visitHistory: [
      {
        id: "VISIT-015",
        timestamp: "2026-01-25T17:00:00Z",
        page: "/landing/our-service/mobile-app",
        pageType: "service",
        duration: "6m 30s",
        itemName: "Mobile App Development"
      },
      {
        id: "VISIT-016",
        timestamp: "2026-01-25T16:52:00Z",
        page: "/landing/case-studies",
        pageType: "case-study",
        duration: "4m 45s",
        itemName: "Case Studies"
      }
    ]
  },
  {
    id: "VIS-008",
    name: "Robert Taylor",
    email: "r.taylor@techventures.com",
    phone: "+1 (555) 901-2345",
    avatar: "/avatars/02.png",
    firstVisit: "2026-01-21T15:40:00Z",
    lastVisit: "2026-01-26T13:20:00Z",
    totalVisits: 10,
    totalPageViews: 38,
    avgSessionDuration: "6m 50s",
    visitHistory: [
      {
        id: "VISIT-017",
        timestamp: "2026-01-26T13:20:00Z",
        page: "/landing/our-product/squadlog",
        pageType: "product",
        duration: "7m 10s",
        itemName: "SquadLog"
      },
      {
        id: "VISIT-018",
        timestamp: "2026-01-26T13:12:00Z",
        page: "/landing/customer-review",
        pageType: "reviews",
        duration: "3m 30s",
        itemName: "Customer Reviews"
      }
    ]
  }
];

// Calculate aggregate statistics
export function getVisitorStats() {
  const totalVisitors = MOCK_VISITORS.length;
  const totalPageViews = MOCK_VISITORS.reduce((sum, v) => sum + v.totalPageViews, 0);
  const totalVisits = MOCK_VISITORS.reduce((sum, v) => sum + v.totalVisits, 0);
  
  // Count product and service views
  let productViews = 0;
  let serviceViews = 0;
  
  MOCK_VISITORS.forEach(visitor => {
    visitor.visitHistory.forEach(visit => {
      if (visit.pageType === 'product') productViews++;
      if (visit.pageType === 'service') serviceViews++;
    });
  });
  
  // Calculate average session duration (simplified)
  const avgDuration = "7m 24s";
  
  return {
    totalVisitors,
    totalPageViews,
    totalVisits,
    productViews,
    serviceViews,
    avgDuration
  };
}
