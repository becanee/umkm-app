import { Router } from 'express';
import multer from "multer";
import { userRegister } from '../controllers/auth/registerController';
import { getAllUsers, getUserByID, getUserByRole, updateUserProfile } from '../controllers/users/userController';
import { getAllCity, getAllProvince, getAllState } from '../controllers/location/locationController';
import { userLogin } from '../controllers/auth/loginController';
import { middleware } from '../controllers/auth/middlewareController';
import { userLogout } from '../controllers/auth/logoutController';
import { getCurrentLocation } from '../controllers/geolocation/geolocationController';
import { addService, deleteService, getAllService, getServiceByCategory, getServiceByID, getServiceByMerchant, updateService } from '../controllers/services/serviceController';
import { clientCreateNewChat, clientGetChatByID, getAllChatByChatID, getAllMessageByChatID, merchantGetChatByID, messagePlaceOrder, sendNewMessage } from '../controllers/chat/chatController';
import { uploadAvatar, uploadService } from '../controllers/upload/uploadController';

// Create a new Router instance
const router = Router();

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'src/images')
//     },
//     filename: (req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`)
//     }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Auth
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/auth', middleware);

// Users
router.get('/users', getAllUsers);
router.get('/user/:id', getUserByID);
router.post('/user/update/:id', updateUserProfile);
router.post('/user/update-avatar/:id', upload.single("file"), uploadAvatar);
router.get('/user/role/:role', getUserByRole);

// Location
router.get('/province', getAllProvince);
router.get('/state/:province_id', getAllState);
router.get('/city/:state_id', getAllCity);

// Geolocation
router.get('/my-location/:ip', getCurrentLocation);

// Services
router.get('/services', getAllService);
router.get('/services/:id', getServiceByID);
router.delete('/services/delete/:id', deleteService);
router.post('/services/add', upload.single("file"), addService);
router.post('/services/update/:id', updateService);
router.post('/services/update-picture/:id', upload.single("file"), uploadService);
router.get('/services/category/:category', getServiceByCategory);
router.get('/services/merchant/:merchant', getServiceByMerchant);

// Chats
router.post('/client-new-chat', clientCreateNewChat);
router.get('/client-all-chat/:id', clientGetChatByID);
router.post('/new-message', sendNewMessage);
router.post('/new-order-message/:id', messagePlaceOrder);
router.get('/chat-parent-history/:id', getAllChatByChatID);
router.get('/chat-history/:id', getAllMessageByChatID);

router.get('/merchant-all-chat/:id', merchantGetChatByID);

export default router;