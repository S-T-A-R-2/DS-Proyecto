import User from '../models/user-model';
// import { createAccessToken } from '../libs/jwt';
class UserController {
    private static instance: UserController;
    
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public async createUser(username: String, name: String, phone: number, email: String, password: String, rol: String) {
        try {
            const users = await User.find({username : username});
            if (users.length > 0) {
                console.log("Usuario ya existente");
                console.log(users);
                throw new Error("Error: Usuario existente.");
            } else {
                const newUser = new User({
                    username,
                    name,
                    phone,
                    email,
                    password,
                    rol
                });
                const savedUser = await newUser.save();
                return savedUser;
            }
        } catch (error : any) {
            throw new Error(error.message);
        }
    }
    public async getUser(username: String, password: String){
        try {
            const result = await User.find({username : username});
            if (result.length == 0) {
                throw new Error("Usuario no encontrado.");
            }
            const user = result[0];
            //const encrypter = new Encrypter(process.env.ENCRYPT_KEY);
            //const decryptedPassword = encrypter.decrypt(user.password);
            const decryptedPassword = user.password;
            if (decryptedPassword !== password) {
                throw new Error("Contraseña incorrecta");
            }
    
            
            
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async exists (username: String) {
        const users = await User.find({username: username});
        if (users.length == 0) {
            return false;
        } else {
            return true;
        }
    }
}

export default UserController;