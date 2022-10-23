import { v4 as uuidv4 } from 'uuid';
import { DatabaseException } from "src/exceptions/Database";
import { NotFoundException } from "src/exceptions/NotFound";
import { dbClient } from "../db"
import { createProductData } from "./types";

export const getAllProducts = async () => {
  const allProducts = await dbClient.scan({
    TableName: process.env.PRODUCTS_TABLE_NAME
  }).promise();

  const allStocks = await dbClient.scan({
    TableName: process.env.STOCKS_TABLE_NAME
  }).promise();

  return allProducts.Items.map((product) => ({
    ...product,
    count: allStocks.Items.find((stock) => stock.product_id === product.id).count
  }))
}

export const getProductById = async (id: number) => {
  let product
  try {
    const response = await dbClient.batchGet({
      RequestItems: {
        [process.env.PRODUCTS_TABLE_NAME]: {
          Keys: [{
            id
          }]
        },
        [process.env.STOCKS_TABLE_NAME]: {
          Keys: [{
            product_id: id
          }]
        }
      }
    }).promise().then(res => res.$response.data);
    if (response) {
      product = { ...response.Responses.aws_study_products[0], count: response.Responses.aws_study_stocks[0]?.count }
    }
  } catch (error) {
    console.log('ERROR:', error);
    throw new DatabaseException(error);
  }

  if (!product) {
    throw new NotFoundException();
  }

  return product
}

export const createProduct = async (data: createProductData) => {
  const { name, currency, image, price } = data
  const id = uuidv4();
  try {
    await dbClient.batchWrite({
      RequestItems: {
        [process.env.PRODUCTS_TABLE_NAME]: [
          {
            PutRequest: {
              Item: {
                id,
                name,
                price,
                currency,
                image
              }
            }
          }
        ],
        [process.env.STOCKS_TABLE_NAME]: [
          {
            PutRequest: {
              Item: {
                product_id: id,
                count: 10,
              }
            }
          },
        ]
      }
    }).promise();
    return {
      id,
      name,
      currency,
      image,
      price,
      count: 10
    }
  } catch (error) {
    console.log('ERROR:', error);
    throw new DatabaseException(error)
  }
}