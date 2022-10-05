import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services';

const getProductById = async (event) => {
  const { id } = event.pathParameters;
  try {
    const product = await ProductsService.getProductById(Number(id));
    return formatJSONResponse({
      data: product
    })
  } catch (error) {
    return formatJSONResponse({
      error: error.message
    })
  }
};

export const main = middyfy(getProductById);
