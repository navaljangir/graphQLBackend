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
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const graphql_1 = __importDefault(require("./graphql/graphql"));
const user_1 = require("./services/user");
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = yield (0, graphql_1.default)();
    app.use(express_1.default.json());
    app.use('/graphql', (0, express4_1.expressMiddleware)(apolloServer, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            const token = req.headers['authorization'];
            try {
                const user = user_1.UserService.decodeToken(token);
                return { user };
            }
            catch (e) {
                return {};
            }
        })
    }));
});
main();
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});
