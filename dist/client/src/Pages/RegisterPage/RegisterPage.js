"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RegisterPage = () => {
    return (<form action="/register" method="POST">
            <label htmlFor="name">Email</label>
            <input type="text" id="email" name="email"></input>
            <label htmlFor="name">Password</label>
            <input type="password" id="password" name="password"></input>
            <button type="submit">Register</button>
        </form>);
};
exports.default = RegisterPage;
//# sourceMappingURL=RegisterPage.js.map