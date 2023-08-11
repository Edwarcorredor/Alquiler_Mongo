import { createToken } from '../middleware/token';
import {Router} from 'express';
const appJWT = Router();

appJWT.get("/", createToken, (req,res)=>{
    res.send(req.data)
});

export default appJWT;