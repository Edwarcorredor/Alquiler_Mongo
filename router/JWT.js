import { createToken } from '../middleware/token.js';
import {Router} from 'express';
const appJWT = Router();

appJWT.get("/", createToken);

export default appJWT;