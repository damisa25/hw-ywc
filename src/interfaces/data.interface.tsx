export interface ICategories {
  name: string;
  subcategories: Array<number>;
}

export interface IMerchants {
  addressDistrictName: string;
  addressProvinceName: string;
  categoryName: string;
  coverImageId: string;
  facilities: Array<string>;
  highlightText: string;
  isOpen: string;
  priceLevel: number;
  recommendedItems: Array<string>;
  shopNameTH: string;
  subcategoryName: string;
}

export interface IData {
  categories: ICategories[];
  merchants: IMerchants[];
  priceRange: Array<string>;
  provinces: Array<string>;
}
