import { formatJSONResponse } from "@libs/api-gateway";

const basicAuthorization = async (event) => {
  if (event.type !== 'TOKEN') {
    return formatJSONResponse({ message: 'Unauthorized' }, 401)
  }

  try {
    const { authorizationToken } = event;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');
    const storedPassword = process.env[username];
    const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow'
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    console.log('policy: ', JSON.stringify(policy));


    return policy
  } catch (error) {
    return formatJSONResponse({ message: 'Unauthorized' }, 401)
  }
};

const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    "principalId": principalId,
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": effect,
          "Resource": resource
        }
      ]
    },
  }
}

export const main = basicAuthorization;
