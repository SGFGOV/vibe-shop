import type { MongoCoupon } from "../coupons";

export const allCoupons: MongoCoupon[] = [
  {
    _id: "67289f1e6ef8ffbb03cb21b3",
    id: "67289f1e6ef8ffbb03cb21b3",
    title: "Eidoffer",
    couponCode: "eidoffer20",
    discountPercentage: 22,
    endTime: "2029-01-04T00:00:00.000Z",
    bannerImage:
      "https://res.cloudinary.com/dmadhbgty/image/upload/v1730797869/grostore/banner-2.jpg",
    status: "show",
    createdAt: new Date("2024-11-04T10:17:02.699Z"),
    updatedAt: new Date("2024-11-05T09:11:32.307Z"),
  },
  {
    _id: "6729e18bea19e02ae487be70",
    id: "6729e18bea19e02ae487be70",
    title: "Ramadan Offer",
    couponCode: "ramadan30",
    discountPercentage: 30,
    endTime: "2027-09-05T00:00:00.000Z",
    bannerImage:
      "https://res.cloudinary.com/dmadhbgty/image/upload/v1730797928/grostore/banner-burger.jpg",
    status: "show",
    createdAt: new Date("2024-11-05T09:12:43.413Z"),
    updatedAt: new Date("2024-11-18T10:07:23.067Z"),
  },
];

