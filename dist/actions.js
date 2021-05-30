"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavPeople = exports.deleteFavPlanet = exports.addFavPeople = exports.addFavPlanet = exports.getFavoritos = exports.login = exports.createPlanet = exports.createCharacter = exports.putPlanets = exports.getPlanet = exports.getPlanets = exports.putPeople = exports.getCharacter = exports.getPeople = exports.getUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var People_1 = require("./entities/People");
var Planets_1 = require("./entities/Planets");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Fav_people_1 = require("./entities/Fav_people");
var Fav_planet_1 = require("./entities/Fav_planet");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                console.log(req.user);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(userID)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var getPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeople = getPeople;
var getCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.id)];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var putPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.id)];
            case 1:
                character = _a.sent();
                if (!character) return [3 /*break*/, 3];
                typeorm_1.getRepository(People_1.People).merge(character, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(character)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json({ msg: "El personaje no existe" })];
        }
    });
}); };
exports.putPeople = putPeople;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var putPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                if (!planet) return [3 /*break*/, 3];
                typeorm_1.getRepository(Planets_1.Planets).merge(planet, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(planet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json({ msg: "El planeta no existe" })];
        }
    });
}); };
exports.putPlanets = putPlanets;
var createCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Character, newCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.Name)
                    throw new utils_1.Exception("Please provide Name");
                if (!req.body.BirthYear)
                    throw new utils_1.Exception("Please provide BirthYear");
                if (!req.body.Gender)
                    throw new utils_1.Exception("Please provide Gender");
                if (!req.body.Height)
                    throw new utils_1.Exception("Please provide Height");
                if (!req.body.SkinColor)
                    throw new utils_1.Exception("Please provide SkinColor");
                if (!req.body.EyeColor)
                    throw new utils_1.Exception("Please provide EyeColor");
                if (!req.body.Img)
                    throw new utils_1.Exception("Please provide Img");
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne({ where: { Name: req.body.Name } })];
            case 1:
                Character = _a.sent();
                if (Character)
                    throw new utils_1.Exception("Este personaje ya existe");
                newCharacter = typeorm_1.getRepository(People_1.People).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newCharacter)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createCharacter = createCharacter;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.Name)
                    throw new utils_1.Exception("Please provide Name");
                if (!req.body.Climate)
                    throw new utils_1.Exception("Please provide Climate");
                if (!req.body.Population)
                    throw new utils_1.Exception("Please provide Population");
                if (!req.body.OrbitalPeriod)
                    throw new utils_1.Exception("Please provide OrbitalPeriod");
                if (!req.body.RotationPeriod)
                    throw new utils_1.Exception("Please provide RotationPeriod");
                if (!req.body.Diameter)
                    throw new utils_1.Exception("Please provide Diameter");
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne({ where: { Name: req.body.Name } })];
            case 1:
                planet = _a.sent();
                if (planet)
                    throw new utils_1.Exception("Este planeta ya existe");
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanet = createPlanet;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getFavoritos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, favPlanet, favPeople;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                return [4 /*yield*/, typeorm_1.getRepository(Fav_planet_1.Fav_planet).find({ where: { users: userID },
                        relations: ['planets'] })];
            case 1:
                favPlanet = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Fav_people_1.Fav_people).find({ where: { users: userID },
                        relations: ['people'] })];
            case 2:
                favPeople = _a.sent();
                return [2 /*return*/, res.json({
                        favPeople: favPeople,
                        favPlanet: favPlanet
                    })];
        }
    });
}); };
exports.getFavoritos = getFavoritos;
var addFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, planet, newFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("El planeta no existe");
                newFavorito = new Fav_planet_1.Fav_planet();
                newFavorito.users = userID;
                newFavorito.planets = planet;
                return [4 /*yield*/, typeorm_1.getRepository(Fav_planet_1.Fav_planet).save(newFavorito)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addFavPlanet = addFavPlanet;
var addFavPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, character, newFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.id)];
            case 1:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("El planeta que selecciono no existe, cambie su id");
                newFavorito = new Fav_people_1.Fav_people();
                newFavorito.users = userID;
                newFavorito.people = character;
                return [4 /*yield*/, typeorm_1.getRepository(Fav_people_1.Fav_people).save(newFavorito)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addFavPeople = addFavPeople;
var deleteFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, favPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(Fav_planet_1.Fav_planet).findOne({
                        relations: ['planets'],
                        where: {
                            users: userID,
                            planets: req.params.id
                        }
                    })];
            case 1:
                favPlanet = _a.sent();
                if (!!favPlanet) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "message": "Favorito no existe" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Fav_planet_1.Fav_planet)["delete"](favPlanet)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavPlanet = deleteFavPlanet;
var deleteFavPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, favCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user;
                return [4 /*yield*/, typeorm_1.getRepository(Fav_people_1.Fav_people).findOne({
                        relations: ['people'],
                        where: {
                            users: userID,
                            people: req.params.id
                        }
                    })];
            case 1:
                favCharacter = _a.sent();
                if (!!favCharacter) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "message": "Favorito no existe" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Fav_people_1.Fav_people)["delete"](favCharacter)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavPeople = deleteFavPeople;
