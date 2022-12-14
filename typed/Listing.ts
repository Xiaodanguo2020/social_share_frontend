export type Listing = {
  id: number;
  title: string;
  description?: string;
  image: string;
  available: boolean;
  userId: number;
  categoryId: number;
  user: UserType;
  category: CategoryType;
  order?: OrderType;
};
export interface EnrichedListing extends Listing {
  requests: Request[];
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  about: string;
  password: string;
  zip_code: string;
  street_name: string;
  house_nr: number;
  image: string;
  latitude: number;
  longitude: number;
};

export type CategoryType = {
  id: number;
  category: string;
};

export type FormValues = {
  email: string;
  password: string;
};

export type RequestInputType = {
  // title: string;
  // description: string;
  // image: string;
  // active: boolean;
  start_date: Date;
  end_date: Date;
  title: string;
  description: string;

  // categoryId: number;
};

export type OrderType = {
  status: Status;
  requestId: number;
  listingId: number;
};

export type Status = "created" | "accepted" | "rejected";

export type Request = {
  category: CategoryType;
  id: number;
  title: string;
  description: string;
  image: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  categoryId: number;
  user: UserType;
  order?: OrderType;
  userId: number;
};

export interface EnrichedRequest extends Request {
  listings: Listing[];
}

export type MyRequests = {
  // listing: Listing;
  // order: OrderType;
  // user: UserType;
};
