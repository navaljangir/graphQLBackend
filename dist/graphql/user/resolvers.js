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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("../../services/user");
const queries = {
    login: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const logginIn = yield user_1.UserService.userLogin(payload);
        if (logginIn) {
            return logginIn;
        }
    }),
    getUserDetails: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.UserService.getUserById(context.user.id);
        return user;
    })
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const userCreated = yield user_1.UserService.createNewUser(payload);
        return userCreated;
    }),
};
exports.resolvers = { queries, mutations };
