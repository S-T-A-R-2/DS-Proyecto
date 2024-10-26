import {Router} from 'express'
//import {authRequired} from '../middlewares/validateToken.js';
import {
    register} from '../controllers/auth-controller'
 
const router = Router();

// CRUD
router.post('/register', register);
/*router.post('/login', login);
router.post('/logout', logout);
//router.get('/profile', authRequired, profile);
router.get('/verify', verifyToken);
*/
export default router;