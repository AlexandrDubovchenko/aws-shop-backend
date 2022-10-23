export type Product = {
  id: string,
  name: string,
  price: number
  currency: string,
  image: string
}

export type createProductData = Omit<Product, 'id'>