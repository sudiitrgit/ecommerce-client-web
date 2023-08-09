export interface Billboard {
    id: string,
    label: string,
    imageUrl: string
}

export interface Category {
    id: string,
    name: string,
    billboard: Billboard
}

export interface Product {
    id: string,
    category: Category,
    name: string,
    price: string,
    description: string,
    isFeatured: boolean,
    size: Size,
    images: Image[],
}

export interface Image {
    id: string,
    url: string,
}

export interface Size {
    id: string,
    name: string,
    value: string
}

export interface User {
    id: string,
    phone: string,
}

export interface Address {
    id: string,
    username : string,
    pincode : string,
    addressline1 : string,
    addressline2 : string,
    landmark : string,
    city : string,
    state : string,
  }