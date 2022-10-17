import { productsListMock } from "src/mocks/products"

export const getAllProducts = async () => {
  return productsListMock
}

export const getProductById = async (id: number) => {
  const product = productsListMock.find((product) => product.id === id)

  if (!product) {
    throw new Error("No such Product");
  }

  return product
}