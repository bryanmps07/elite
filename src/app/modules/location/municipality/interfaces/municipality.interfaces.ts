export interface Municipalities {
  data:       Municipality[];
  pagination: Pagination;
}

export interface Municipality {
  id:   number;
  name: string;
}

export interface Pagination {
  total:        number;
  total_pages:  number;
  current_page: number;
  per_page:     number;
}
