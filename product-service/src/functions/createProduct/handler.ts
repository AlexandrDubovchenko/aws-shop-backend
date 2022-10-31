import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services';

const createProduct = async (event) => {
  try {
    const newProduct = await ProductsService.createProduct(event.body.data);
    return formatJSONResponse({
      data: newProduct
    }, 201)
  } catch (error) {
    return formatJSONResponse({
      error: error.message
    }, error.status)
  }
};

export const main = middyfy(createProduct);
