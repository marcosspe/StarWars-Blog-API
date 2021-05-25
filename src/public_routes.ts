
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import * as actions from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
router.get('/people', safe(actions.getPeople));
router.get('/people/:id', safe(actions.getCharacter));
router.get('/planets', safe(actions.getPlanets));
router.get('/planets/:id', safe(actions.getPlanet));
router.post('/people', safe(actions.createCharacter));
router.post('/planets', safe(actions.createPlanet));

export default router;
