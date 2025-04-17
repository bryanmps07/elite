export interface Zones {
  data:       Zone[];
  pagination: Pagination;
}

export interface Zone {
  id:   number;
  name: string;
}

export interface Pagination {
  total:        number;
  total_pages:  number;
  current_page: number;
  per_page:     number;
}
