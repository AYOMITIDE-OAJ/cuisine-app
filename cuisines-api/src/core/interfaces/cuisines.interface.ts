export interface ISetMenu {
  created_at: string;
  cuisines: Cuisine[];
  description: string;
  display_text: number;
  image: string;
  thumbnail: string;
  is_vegan: number;
  is_vegetarian: number;
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
  is_seated: number;
  is_standing: number;
  is_canape: number;
  is_mixed_dietary: number;
  is_meal_prep: number;
  is_halal: number;
  is_kosher: number;
  price_includes: any | null;
  highlight: any | null;
  available: boolean;
  number_of_orders: number;
}

export interface Cuisine {
  id: number;
  name: string;
}
