const categories = ["ANIME", "ANIMALS", "MOVIES", "SPORTS"] as const;

export type Category = (typeof categories)[number];

export interface CategorySelect {
  value: Category;
  label: string;
  icon: string;
}
