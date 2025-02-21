import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';


// Middleware to extract user from JWT token
export const authenticateUser = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    try {
      const decodedUser = jwt.verify(token, SECRET_KEY);
      return decodedUser; // Attach user info to context
    } catch (error) {
      console.error('Invalid or expired token:', error.message);
      throw new GraphQLError('TokenInvalid',{ extensions: { code: 'UNAUTHENTICATED' } });
    }
  }
  return null; // No user authenticated
};
