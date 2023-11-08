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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const BookRoutes_1 = __importDefault(require("./routes/BookRoutes"));
const logger_1 = __importDefault(require("./middlewares/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.default);
app.use("/auth", UserRoutes_1.default);
app.use("/", BookRoutes_1.default);
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default;
        console.log("Connected to MongoDB!");
    }
    catch (error) {
        console.log(`Error Connecting to MongoDB: ${error}`);
    }
    console.log(`Server is listening on PORT ${process.env.PORT}!`);
}));
