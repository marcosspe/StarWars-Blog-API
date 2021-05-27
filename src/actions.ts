import { Request, Response } from 'express'
import { getRepository, ObjectLiteral } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { People } from './entities/People'
import { Planets } from './entities/Planets'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Fav_people } from './entities/Fav_people'
import { Fav_planet } from './entities/Fav_planet'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
   
    console.log(req.user)
    const user = await getRepository(Users).findOne(userID);
    return res.json(user);
}


export const getPeople = async (req: Request, res: Response): Promise<Response> =>{
		const people = await getRepository(People).find();
		return res.json(people);
}

export const getCharacter = async (req: Request, res: Response): Promise<Response> =>{
        const people = await getRepository(People).findOne(req.params.id);
        return res.json(people);
}

export const putPeople = async (req: Request, res: Response): Promise<Response> =>{
        const character = await getRepository(People).findOne(req.params.id);
        if(character){
            getRepository(People).merge(character, req.body); 
            const results = await getRepository(People).save(character)
            return res.json(results);
        }
        return res.json({msg: "El personaje no existe"})
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planets = await getRepository(Planets).find();
		return res.json(planets);
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> =>{
        const planets = await getRepository(Planets).findOne(req.params.id);
        return res.json(planets);
}

export const putPlanets = async (req: Request, res: Response): Promise<Response> =>{
        const planet = await getRepository(Planets).findOne(req.params.id);
        if(planet){
            getRepository(Planets).merge(planet, req.body); 
            const results = await getRepository(Planets).save(planet)
            return res.json(results);
        }
        return res.json({msg: "El planeta no existe"})
}

export const createCharacter = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.Name) throw new Exception("Please provide Name")
	if(!req.body.BirthYear) throw new Exception("Please provide BirthYear")
	if(!req.body.Gender) throw new Exception("Please provide Gender")
    if(!req.body.Height) throw new Exception("Please provide Height")
    if(!req.body.SkinColor) throw new Exception("Please provide SkinColor")
    if(!req.body.EyeColor) throw new Exception("Please provide EyeColor")
    
    const Character = await getRepository(People).findOne({ where: {Name: req.body.Name }})
    if(Character) throw new Exception("Este personaje ya existe")

	const newCharacter = getRepository(People).create(req.body);  //Creo un personaje
	const results = await getRepository(People).save(newCharacter); //Grabo el nuevo personaje
	return res.json(results);
}

export const createPlanet = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.Name) throw new Exception("Please provide Name")
	if(!req.body.Climate) throw new Exception("Please provide Climate")
	if(!req.body.Population) throw new Exception("Please provide Population")
    if(!req.body.OrbitalPeriod) throw new Exception("Please provide OrbitalPeriod")
    if(!req.body.RotationPeriod) throw new Exception("Please provide RotationPeriod")
    if(!req.body.Diameter) throw new Exception("Please provide Diameter")

    const planet = await getRepository(Planets).findOne({ where: {Name: req.body.Name }})
    if(planet) throw new Exception("Este planeta ya existe")
    
	const newPlanet = getRepository(Planets).create(req.body);  //Creo un planeta
	const results = await getRepository(Planets).save(newPlanet); //Grabo el nuevo planeta
	return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Please specify an email on your request body", 400);
    if (!req.body.password) throw new Exception("Please specify a password on your request body", 400);

    const userRepo = await getRepository(Users);
    const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (!user) throw new Exception("Invalid email or password", 401);

    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
    return res.json({ user, token });
}

export const getFavoritos = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
    const favPlanet = await getRepository(Fav_planet).find({where:{users: userID}, 
        relations: ['planets']});
    const favPeople = await getRepository(Fav_people).find({where:{users: userID}, 
        relations: ['people']});
    return res.json({
        favPeople,
        favPlanet,
    });
}

export const addFavPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id;
    const planet = await getRepository(Planets).findOne(req.params.id);
    if(!planet) throw new Exception("El planeta no existe")
    let newFavorito = new Fav_planet();
    newFavorito.users = userID;
    newFavorito.planets = planet;
  
    const results = await getRepository(Fav_planet).save(newFavorito);
    return res.json(results);
} 

export const addFavPeople = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user;
    const character = await getRepository(People).findOne(req.params.id);
    if(!character) throw new Exception("El planeta que selecciono no existe, cambie su id")
    let newFavorito = new Fav_people();
    newFavorito.users = userID;
    newFavorito.people = character;
    const results = await getRepository(Fav_people).save(newFavorito);   
    return res.json(results);
} 

export const deleteFavPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user;
    const favPlanet = await getRepository(Fav_planet).findOne(
         {
            relations: ['planets'],
            where:{
                users: userID,
                planets: req.params.id 
            }
         });
        if(!favPlanet){
            return res.json({"message": "Favorito no existe"})
        }else{
            const results = await getRepository(Fav_planet).delete(favPlanet);
            return res.json(results);
        }
} 

export const deleteFavPeople = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user;
    const favCharacter = await getRepository(Fav_people).findOne(
         {
            relations: ['people'],
            where:{
                users: userID,
                people: req.params.id 
            }
         });
        if(!favCharacter){
            return res.json({"message": "Favorito no existe"})
        }else{
            const results = await getRepository(Fav_people).delete(favCharacter);
            return res.json(results);
        }
} 