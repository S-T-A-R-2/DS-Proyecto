import {UserClass} from './User';
import {PharmacyClass} from './Pharmacy';
import Pharmacy from '../models/farmacy-model';
import User from '../models/user-model';

export class UserCreator {

  private static instance: UserCreator;

  public static getInstance(): UserCreator {
    if (!UserCreator.instance) {
      UserCreator.instance = new UserCreator();
    }
    return UserCreator.instance;
  }

  private static user: UserClass;
  private static pharmacy: PharmacyClass;

  public async createUser(username : String,
                    name : String,
                    phone: String,
                    email: String,
                    password: String,
                    rol: String
   ){ 
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
          if (rol === 'Farmacia') {
            name = username;
            const newPharmacy = new Pharmacy({
                name
            });
            await newPharmacy.save();
          }
          const savedUser = await newUser.save();
          return savedUser;
      }
    } catch (error : any) {
        throw new Error(error.message);
    }
  }

  public getUser(){
    return UserCreator.user;
  }
  public getPharmacy(){
    return UserCreator.pharmacy;
  }
}
