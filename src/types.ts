export type geo_t = {
  lat: number;
  lng: number;
};

export type geo_api_t = {
  lat: string;
  lng: string;
};

export type address_t = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

export type user_t = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address_t & { geo: geo_t };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type user_api_t = Omit<user_t, "address"> & {
  address: address_t & { geo: geo_api_t };
};
