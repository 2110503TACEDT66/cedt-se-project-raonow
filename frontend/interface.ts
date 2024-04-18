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
    member: string  
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

export interface campaignJSON {
  success: boolean,
  count: number,
  data: campaignItem[]
}

export interface campaignItem {
  _id?: string,
  title: string,
  desc: string,
  point: number,
  onePerUser: boolean,
  discountType: string,
  discountAmount: number,
  limitedArea: string,
  totalAmount: number,
  amoutLeft: number,
  createAt: Date,
  __v?: number
}

export interface dashboardItem {
  province: string,
  count: number
}