'use strict'

const User = use('App/Models/User');

class UserController {
  
    async login({ request, auth}){
        const {email,password} = request.all();
        const token = await auth.attempt(email,password);
        return token;
    }

    //para crear un nuevo usuario
    //guardar en BD un registro
    async store({ request }){
        //de todo lo que recibe nos debe de dar el username, email y password
      const {email,password} = request.all();
      console.log(email,password);
      const user = await User.create({
          email,
          password,
          username: email
      });
     return this.login(...arguments);
    };
}

module.exports = UserController
