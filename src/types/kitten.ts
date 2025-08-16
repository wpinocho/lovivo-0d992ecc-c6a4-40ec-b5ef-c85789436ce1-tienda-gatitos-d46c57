export interface Kitten {
  id: number;
  name: string;
  breed: string;
  age: number;
  gender: 'Macho' | 'Hembra';
  price: number;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  healthCertificate: boolean;
  personality: string[];
  specialNeeds: string[];
  images: string[];
}

export interface CartItem {
  kitten: Kitten;
  quantity: number;
}