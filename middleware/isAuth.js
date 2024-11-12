import jwt from "jsonwebtoken";

export function isAuth (req)  {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    throw new Error('Error: Unauthenticated!');
  }

  const tokenAuthPart = authHeader.split(' ');
  let encodedPayload = tokenAuthPart[1];

  jwt.verify(tokenAuthPart[1], process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log('Error: Unauthenticated!');
    } else {
      encodedPayload = data.id;
    }
  });

  return encodedPayload;
};