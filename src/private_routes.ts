/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'

// declare a new router to include all the endpoints
const router = Router();

const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
        const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
        req.user = decoded;
        next()      
    } catch (error) {
        return res.status(400).json('ACCESS DENIED'); 
    }
  
}

router.get('/user', safe(actions.getUsers));
router.get('/user',verifyToken, safe(actions.getUser));
router.get('/user/favoritos',verifyToken, safe(actions.getFavoritos));
router.post('/user/favoritos/planets/:id',verifyToken, safe(actions.addFavPlanet));
router.post('/user/favoritos/people/:id',verifyToken, safe(actions.addFavPeople));
router.delete('/user/favoritos/planets/:id',verifyToken, safe(actions.deleteFavPlanet));
router.delete('/user/favoritos/people/:id',verifyToken, safe(actions.deleteFavPeople));

export default router;
