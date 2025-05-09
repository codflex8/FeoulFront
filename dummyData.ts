import { Category, Interest, Operation, Project, Unit } from "./types/dashboard.types";

export const interestsData: Interest[] = [
    {
        firstName: "محمد",
        surName: "الزهراني",
        phone: "0551234567",
        email: "mohammed.zahrani@example.com",
        region: "المركز",
        buildingNumber: 101,
        buildingStatus: "متاح",
    },
    {
        firstName: "فاطمة",
        surName: "الأنصاري",
        phone: "0569876543",
        email: "fatima.ansari@example.com",
        region: "الشرقي",
        buildingNumber: 202,
        buildingStatus: "محجوز",
    },
    {
        firstName: "علي",
        surName: "الغامدي",
        phone: "0547654321",
        email: "ali.ghamdi@example.com",
        region: "الغربي",
        buildingNumber: 303,
        buildingStatus: "مباع",
    },
    {
        firstName: "نور",
        surName: "الشريف",
        phone: "0538765432",
        email: "noor.shareef@example.com",
        region: "المركز",
        buildingNumber: 404,
        buildingStatus: "متاح",
    },
    {
        firstName: "سارة",
        surName: "العتيبي",
        phone: "0581239876",
        email: "sarah.otaibi@example.com",
        region: "الشرقي",
        buildingNumber: 505,
        buildingStatus: "مباع",
    },
    {
        firstName: "أحمد",
        surName: "الخطيب",
        phone: "0523456789",
        email: "ahmed.khateeb@example.com",
        region: "الغربي",
        buildingNumber: 606,
        buildingStatus: "محجوز",
    },
    {
        firstName: "لمياء",
        surName: "الحربي",
        phone: "0572345678",
        email: "lamya.harbi@example.com",
        region: "المركز",
        buildingNumber: 707,
        buildingStatus: "متاح",
    },
    {
        firstName: "خالد",
        surName: "المطيري",
        phone: "0598765432",
        email: "khaled.mutairi@example.com",
        region: "الشرقي",
        buildingNumber: 808,
        buildingStatus: "مباع",
    },
    {
        firstName: "سارة",
        surName: "العتيبي",
        phone: "0581239876",
        email: "sarah.otaibi@example.com",
        region: "الشرقي",
        buildingNumber: 505,
        buildingStatus: "مباع",
    },
    {
        firstName: "أحمد",
        surName: "الخطيب",
        phone: "0523456789",
        email: "ahmed.khateeb@example.com",
        region: "الغربي",
        buildingNumber: 606,
        buildingStatus: "محجوز",
    },
    {
        firstName: "لمياء",
        surName: "الحربي",
        phone: "0572345678",
        email: "lamya.harbi@example.com",
        region: "المركز",
        buildingNumber: 707,
        buildingStatus: "متاح",
    },
    {
        firstName: "خالد",
        surName: "المطيري",
        phone: "0598765432",
        email: "khaled.mutairi@example.com",
        region: "الشرقي",
        buildingNumber: 808,
        buildingStatus: "مباع",
    },
];

export const projectsData: Project[] = [
  {
    projectNumber: "001",
    projectName: "مشروع بناء المساكن",
    location: "شارع الوحدة",
    city: "جدة",
    status: "مسودة",
    model: "نموذج 1",
    date: new Date("2025-01-09"),
  },
  {
    projectNumber: "002",
    projectName: "مشروع تطوير البنية التحتية",
    location: "حي الرمال",
    city: "الرياض",
    status: "منشور",
    model: "نموذج 2",
    date: new Date("2025-01-07"),
  },
  {
    projectNumber: "003",
    projectName: "مشروع بناء المدارس",
    location: "الزهراء",
    city: "المدينة المنورة",
    status: "محذوف",
    model: "نموذج 3",
    date: new Date("2025-01-06"),
  },
];

export const categoriesData: Category[] = [
  { id: 1, name: "فئة A", color: "أزرق", status: "منشور" },
  { id: 2, name: "فئة B", color: "أخضر", status: "مسودة" },
  { id: 3, name: "فئة C", color: "أصفر", status: "محذوف" },
  { id: 4, name: "فئة D", color: "أحمر", status: "منشور" },
];

export const unitData: Unit[] = [
  {
    number: "001",
    name: "وحدة سكنية 1",
    model: "موديل A",
    estate: 'سراة من فيول',
    landArea: "300 متر مربع",
    buildingArea: "250 متر مربع",
    totalArea: "550 متر مربع",
    bedrooms: 3,
    bathrooms: 2,
    price: "500,000 شيكل",
    videoUrl: "https://example.com/video1",
    floors: 2,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  },
  {
    number: "002",
    name: "وحدة سكنية 2",
    model: "موديل B",
    estate: 'مدينة حمد',
    landArea: "350 متر مربع",
    buildingArea: "300 متر مربع",
    totalArea: "650 متر مربع",
    bedrooms: 4,
    bathrooms: 3,
    price: "600,000 شيكل",
    videoUrl: "https://example.com/video2",
    floors: 3,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  },
  {
    number: "003",
    name: "وحدة سكنية 3",
    model: "موديل C",
    estate: 'سراة من فيول',
    landArea: "400 متر مربع",
    buildingArea: "350 متر مربع",
    totalArea: "750 متر مربع",
    bedrooms: 5,
    bathrooms: 4,
    price: "750,000 شيكل",
    videoUrl: "https://example.com/video3",
    floors: 3,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  },
  {
    number: "001",
    name: "وحدة سكنية 1",
    model: "موديل A",
    estate: 'مدينة حمد',
    landArea: "300 متر مربع",
    buildingArea: "250 متر مربع",
    totalArea: "550 متر مربع",
    bedrooms: 3,
    bathrooms: 2,
    price: "500,000 شيكل",
    videoUrl: "https://example.com/video1",
    floors: 2,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  },
  {
    number: "002",
    name: "وحدة سكنية 2",
    model: "موديل B",
    estate: 'سراة من فيول',
    landArea: "350 متر مربع",
    buildingArea: "300 متر مربع",
    totalArea: "650 متر مربع",
    bedrooms: 4,
    bathrooms: 3,
    price: "600,000 شيكل",
    videoUrl: "https://example.com/video2",
    floors: 3,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  },
  {
    number: "003",
    name: "وحدة سكنية 3",
    model: "موديل C",
    estate: 'سراة من فيول',
    landArea: "400 متر مربع",
    buildingArea: "350 متر مربع",
    totalArea: "750 متر مربع",
    bedrooms: 5,
    bathrooms: 4,
    price: "750,000 شيكل",
    videoUrl: "https://example.com/video3",
    floors: 3,
    floorsDesign: [
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
      '/assets/images/test.jpg',
    ]
  }
];

export const financialData: Operation[] = [
  {
    number: 1,
    operationType: "بيع",
    description: "بيع شقة جديدة",
    clientName: "أحمد علي",
    date: "2025-01-01",
    status: "مكتملة",
  },
  {
    number: 2,
    operationType: "تأجير",
    description: "تأجير مكتب",
    clientName: "سارة محمد",
    date: "2025-01-05",
    status: "قيد التنفيذ",
  },
  {
    number: 3,
    operationType: "إيجار",
    description: "إيجار مخزن",
    clientName: "خالد سمير",
    date: "2025-01-07",
    status: "مرفوضة",
  },
  {
    number: 4,
    operationType: "شراء",
    description: "شراء أرض",
    clientName: "هند سعيد",
    date: "2025-01-09",
    status: "مكتملة",
  },
  {
    number: 1,
    operationType: "بيع",
    description: "بيع شقة جديدة",
    clientName: "أحمد علي",
    date: "2025-01-01",
    status: "مكتملة",
  },
  {
    number: 2,
    operationType: "تأجير",
    description: "تأجير مكتب",
    clientName: "سارة محمد",
    date: "2025-01-05",
    status: "قيد التنفيذ",
  },
  {
    number: 3,
    operationType: "إيجار",
    description: "إيجار مخزن",
    clientName: "خالد سمير",
    date: "2025-01-07",
    status: "مرفوضة",
  },
  {
    number: 4,
    operationType: "شراء",
    description: "شراء أرض",
    clientName: "هند سعيد",
    date: "2025-01-09",
    status: "مكتملة",
  },
];
