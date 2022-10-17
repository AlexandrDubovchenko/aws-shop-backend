import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services';

const getProductsList = async () => {
  try {
    const products = await ProductsService.getAllProducts();
    return formatJSONResponse({
      data: products
    })
  } catch (error) {
    return formatJSONResponse({
      error: error.message
    })
  }
};

export const main = middyfy(getProductsList);
