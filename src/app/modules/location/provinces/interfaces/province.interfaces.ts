export interface Provinces {
  data:       Province[];
  pagination: Pagination;
}

export interface Province {
  id:   number;
  name: string;
}

export interface Pagination {
  total:        number;
  total_pages:  number;
  current_page: number;
  per_page:     number;
}
