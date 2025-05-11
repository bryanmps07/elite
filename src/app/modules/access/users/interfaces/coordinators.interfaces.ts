export interface Coordinators {
  data:       User[];
}

export interface User {
  id:           number;
  document:     string;
  first_name:   string;
  last_name:    string;
  email:        string;
  phone:        string;
  address:      string;
  status:       number;
  create_date:  Date;
  regionalCoordinator?: Location | null;
  role?:        Location | null;
  province?:    Location | null;
  municipality?: Location | null;
  region?:       Location | null;
  zone?:         Location | null;
  distric?:      number | null;
}

export interface Location {
  id?:   number;
  name?: string;
}
