export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
}


export interface Comment {
  id: number;
  username: string;
  comment: string;
  created_at: string;
}

