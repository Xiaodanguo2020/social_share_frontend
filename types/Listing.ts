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
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  zip_code: string;
  street_name: string;
  house_nr: number;
  image: string | null;
};

export type CategoryType = {
  id: number;
  category: string;
};
