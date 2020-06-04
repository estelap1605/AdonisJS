'use strict'

const proyecto = use('App/Models/Proyecto')
const autorizacion = use ('App/Services/Autorizacion')

class ProyectoController {
   async  index ({ auth }){
       const user = await auth.getUser();
      return await user.proyectos().fetch();
      
    }

    async create({ auth, request }){
        const user = await auth.getUser();
        const {nombre} = request.all();
        const proyect = new proyecto();
        proyect.fill({
            nombre
        });
        await user.proyectos().save(proyect);
        return proyect;
    }

    async destroy ({ auth, response, params}){
       const user = await auth.getUser();
       const {id} = params;
       const proyect= await proyecto.find(id);
       autorizacion.verificarPermiso(proyect, user);
       await proyect.delete();
       return proyect;
    }

    async update ({ auth, params, request }){
        const user = await auth.getUser();
        const {id} = params;
        const proyect= await proyecto.find(id);
       autorizacion.verificarPermiso(proyect, user);
       proyect.merge(request.only('nombre'));
       await proyect.save();
       return proyect;

    }
}

module.exports = ProyectoController
