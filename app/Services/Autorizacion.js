const exception = use ('App/Exceptions/AccesoProhibidoException')
const recursoNoEncontrado = use ('App/Exceptions/NoEncontradoException')

class Autorizacion{
    verificarPermiso ( recurso, user){
      if(!recurso){
        throw new recursoNoEncontrado();
      }
        if (recurso.user_id != user.id){
          throw new exception();
    };
 }



}

module.exports = new Autorizacion();