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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../lib/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
        });
    }
    static createNewUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFind = yield UserService.userExists(payload.email);
            if (userFind) {
                throw new Error('User already exists');
            }
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
            const createUser = yield db_1.prisma.user.create({
                data: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: hashedPassword,
                }
            });
            return createUser.id;
        });
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'mysecret');
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = yield db_1.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            console.log('yha aaya', userDetails);
            return userDetails;
        });
    }
    static userLogin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = payload.email;
            const password = payload.password;
            const user = yield UserService.userExists(email);
            if (!user) {
                throw new Error('User not found');
            }
            const matchPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!matchPassword) {
                throw new Error('Invalid Email/Password');
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET || "mysecret");
            return token;
        });
    }
}
exports.UserService = UserService;
