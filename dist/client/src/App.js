"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Homepage_1 = __importDefault(require("../src/Pages/Homepage/Homepage"));
const RegisterPage_1 = __importDefault(require("../src/Pages/RegisterPage/RegisterPage"));
function App() {
    return (<div className="App">
			<h1>Poe Build Stash </h1>
			<react_router_dom_1.BrowserRouter>
				<react_router_dom_1.Switch>
					<react_router_dom_1.Route exact path="/" component={Homepage_1.default}/>
					<react_router_dom_1.Route exact path="/register" component={RegisterPage_1.default}/>
				</react_router_dom_1.Switch>
			</react_router_dom_1.BrowserRouter>
		</div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map