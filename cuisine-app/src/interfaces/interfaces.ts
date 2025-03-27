interface Cuisine {
  id: number;
  name: string;
  slug: string;
  number_of_orders: number;
  setMenusCount: number;
}

interface Groups {
  Mains: number;
  Sides: number;
  Dessert: number;
  Starters: number;
  ungrouped: number;
}

interface GroupDetails {
  groups: Groups;
  dishes_count: number;
  selectable_dishes_count: number;
}

interface SetMenu {
  id: number;
  created_at: string;
  description: string;
  display_text: number;
  image: string;
  thumbnail: string;
  is_vegan: boolean;
  is_vegetarian: boolean;
  name: string;
  status: boolean;
  groups: GroupDetails;
  price_per_person: string;
  min_spend: string;
  is_seated: boolean;
  is_standing: boolean;
  is_canape: boolean;
  is_mixed_dietary: boolean;
  is_meal_prep: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  price_includes: null | any;
  highlight: null | any; 
  available: boolean;
  number_of_orders: number;
  isLive: boolean;
  cuisines: Cuisine[];
}

export interface Meta {
  page: string;
  limit: string;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse {
  data: SetMenu[];
  meta: Meta;
}

export interface CuisinesState {
  page: number;
  pageSize: number;
  setMenus: SetMenu[];
  totalCount: number;
  guestNumber: number;
  selectedSlug: string | null;
}

export interface SetCuisinesPayload {
  setMenus: SetMenu[];
  totalCount: number;
}
