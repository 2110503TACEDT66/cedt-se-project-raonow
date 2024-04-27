export interface HotelImage {
  main: string
}

export interface HotelItem {
    _id: string;
    name: string;
    address: string;
    telephoneNumber: string;
    starRating?: number;
    basePrice?: number;
    images?: HotelImage;
    __v?: number;
}
  
export interface HotelJSON {
  success: boolean,
  count: number,
  pagination: Object,
  data: HotelItem[]
}

export interface BookingItem {
  _id?: string,
  user: UserBookingInfo; 
  hotel: HotelItem; 
  roomType: string;
  duration: number;
  bookDate: Date;
  createdAt: Date;
  pointEarned?: number | null;
  review?: string;
  __v?: number;
}

export interface BookingJSON {
  success: boolean,
  count: number,
  data: BookingItem[]
}

export interface User {
  success: boolean,
  data: {
    id: string,
    name: string,
    email: string,
    telephoneNumber: string,
    role: string,
    member: string | null,
    hotelier?: string | null,
    reviewFilter?: ReviewFilter
  }
}

export interface UserForMember {
  _id: string,
  name: string,
  telephoneNumber: string,
  email: string,
  role: string
}

export interface UserBookingInfo {
  _id: string,
  name?: string,
  telephoneNumber?: string,
  email?: string
}

interface Book {
  hotel: string,
  date: string,
  duration: number
}

export interface MemberItem {
  id: string,
  user: string,
  address: string,
  province: string,
  birthday: Date,
  point: number,
  bookingCount: number
}

export interface MemberJSON {
  success: boolean,
  count: number,
  data: MemberItem[]
}

export interface CampaignJSON {
  success: boolean,
  count: number,
  data: CampaignItem[]
}

export interface CampaignItem {
  _id?: string,
  title: string,
  description: string,
  point: number,
  onePerUser: boolean,
  discountType: string,
  discountAmount: number,
  limitedArea: string,
  totalAmount: number,
  amountLeft: number,
  createAt: Date,
  __v?: number
}

export interface dashboardItem {
  province: string,
  count: number
}

export interface CouponJSON {
  success: boolean,
  count: number,
  data: CouponItem
}

export interface CouponItem {
  _id: string,
  user: string,
  campaign: string,
  code: string,
  used: boolean,
  createdAt: Date,
  __v: number
}

export interface ReviewCreating {
  user: string, 
  booking: string, 
  hotel: string, 
  rating: number, 
  title: string, 
  review: string, 
  attitude: string,
  travelerType: string
}

export interface ReviewItem {
  _id: string,
  user: {name: string, location: string},
  booking: {bookDate: Date, roomType: string, duration: string},
  hotel: string,
  rating: number,
  title: string,
  review: string,
  travelerType: string,
  attitude: string,
  readStatus: string,
  createdAt: Date
}

export interface ReviewList {
  success: boolean,
  count: number,
  data: ReviewItem[]
}

export type ReviewStar = Record<number, string>;
export const reviewStar:ReviewStar = {
  0:    'Terrible',
  0.5:  'Bad',
  1:    'Poor',
  1.5:  'Fair',
  2:    'Exceptional',
  2.5:  'Average',
  3:    'Good',
  3.5:  'Very Good',
  4:    'Excellent',
  4.5:  'Wonderful',
  5:    'Perfect',
}

export type queryReview = {
  date?: string;
  rating?: number[];
  travelerType?: string;
  sort?: string;
  id?: string,
  header?: number,
  lastCheck?: string
}

export type ReviewBasicJSON = {
  success: boolean,
  count: number,
  data: ReviewBasicData
}

export type ReviewBasicData = {
  averageRating: number,
  totalReviewCount: number
}

export type ReviewFilter = {
  date: string,
  rating: number[],
  travelerType: string,
  sort: string
}

export const travelerType = ['solo', 'couple', 'family', 'group', 'business'];