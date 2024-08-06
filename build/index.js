"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express, cors, helmet and morgan
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const routes_1 = __importDefault(require("./routes"));
// Create Express server
dotenv_1.default.config();
const app = (0, express_1.default)(); // New express instance
// Express configuration
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, helmet_1.default)()); // Enable Helmet
app.use((0, morgan_1.default)('dev')); // Enable Morgan
app.use(express_1.default.json()); // <=== Enable JSON body parser
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Store uploaded files in memory
const storage = multer_1.default.memoryStorage();
// Use routes
app.use('/api', routes_1.default);
// Start Express server
app.listen(process.env.PORT, () => {
    // Callback function when server is successfully started
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
// Export Express app
exports.default = app;
