export interface ISetMenu {
  created_at: string; // Assuming it's an ISO date string
  cuisines: Cuisine[];
  description: string;
  display_text: number;
  image: string;
  thumbnail: string;
  is_vegan: number; // or boolean if it's always 0 or 1
  is_vegetarian: number; // or boolean if it's always 0 or 1
  name: string;
  status: number;
  groups: {
    dishes_count: number;
    selectable_dishes_count: number;
    groups: {
      ungrouped: number;
      Starters: number;
      Mains: number;
      Sides: number;
      Dessert: number;
    };
  };
  price_per_person: number;
  min_spend: number;
  is_seated: number; // or boolean
  is_standing: number; // or boolean
  is_canape: number; // or boolean
  is_mixed_dietary: number; // or boolean
  is_meal_prep: number; // or boolean
  is_halal: number; // or boolean
  is_kosher: number; // or boolean
  price_includes: any | null; // Assuming it can be any type or null
  highlight: any | null; // Assuming it can be any type or null
  available: boolean;
  number_of_orders: number;
}

export interface Cuisine {
  id: number;
  name: string;
}
