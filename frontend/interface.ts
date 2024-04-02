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
  id: string,
  name: string,
  email: string,
  password: string,
  telephoneNumber: string,
  role: string,
  createdAt: Date
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