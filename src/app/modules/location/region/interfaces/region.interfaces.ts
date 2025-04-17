export interface Regions {
  data:       Region[];
  pagination: Pagination;
}

export interface Region {
  id:   number;
  name: string;
}

export interface Pagination {
  total:        number;
  total_pages:  number;
  current_page: number;
  per_page:     number;
}
