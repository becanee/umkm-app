"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const registerController_1 = require("../controllers/auth/registerController");
const userController_1 = require("../controllers/users/userController");
const locationController_1 = require("../controllers/location/locationController");
const loginController_1 = require("../controllers/auth/loginController");
const middlewareController_1 = require("../controllers/auth/middlewareController");
const logoutController_1 = require("../controllers/auth/logoutController");
const geolocationController_1 = require("../controllers/geolocation/geolocationController");
const serviceController_1 = require("../controllers/services/serviceController");
const chatController_1 = require("../controllers/chat/chatController");
const uploadController_1 = require("../controllers/upload/uploadController");
// Create a new Router instance
const router = (0, express_1.Router)();
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'src/images')
//     },
//     filename: (req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`)
//     }
// });
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Auth
router.post('/register', registerController_1.userRegister);
router.post('/login', loginController_1.userLogin);
router.post('/logout', logoutController_1.userLogout);
router.get('/auth', middlewareController_1.middleware);
// Users
router.get('/users', userController_1.getAllUsers);
router.get('/user/:id', userController_1.getUserByID);
router.post('/user/update/:id', userController_1.updateUserProfile);
router.post('/user/update-avatar/:id', upload.single("file"), uploadController_1.uploadAvatar);
router.get('/user/role/:role', userController_1.getUserByRole);
// Location
router.get('/province', locationController_1.getAllProvince);
router.get('/state/:province_id', locationController_1.getAllState);
router.get('/city/:state_id', locationController_1.getAllCity);
// Geolocation
router.get('/my-location/:ip', geolocationController_1.getCurrentLocation);
// Services
router.get('/services', serviceController_1.getAllService);
router.get('/services/:id', serviceController_1.getServiceByID);
router.post('/services/add', upload.single("file"), serviceController_1.addService);
router.post('/services/update/:id', serviceController_1.updateService);
router.post('/services/update-picture/:id', upload.single("file"), uploadController_1.uploadService);
router.get('/services/category/:category', serviceController_1.getServiceByCategory);
router.get('/services/merchant/:merchant', serviceController_1.getServiceByMerchant);
// Chats
router.post('/client-new-chat', chatController_1.clientCreateNewChat);
router.get('/client-all-chat/:id', chatController_1.clientGetChatByID);
router.post('/new-message', chatController_1.sendNewMessage);
router.post('/new-order-message/:id', chatController_1.messagePlaceOrder);
router.get('/chat-parent-history/:id', chatController_1.getAllChatByChatID);
router.get('/chat-history/:id', chatController_1.getAllMessageByChatID);
router.get('/merchant-all-chat/:id', chatController_1.merchantGetChatByID);
exports.default = router;
