<template>
    <div class="container">
        <div class="row">
    <main class="home-page">
        <h1>Edición de datos</h1>
      <br><br>
        <div class="row">
            <table class="table table-striped">
        <thead>
    <tr>
      <th scope="col">User ID</th>
      <th scope="col">User Name</th>
      <th scope="col">Date</th>
      <th scope="col">Punch In</th>
      <th scope="col">Punch Out</th> 
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in this.registros" v-bind:key="index" >
      <th scope="col">
        <input v-if="(this.editing && item._id == this.editId)" type="text" id="textId"><span v-else>{{item.idUser}}</span></th>
      <th scope="col">
        <input v-if="(this.editing && item._id == this.editId)" type="text" id="textName"><span v-else>{{item.userName}}</span></th>

      <th scope="col">
        <input v-if="(this.editing && item._id == this.editId)" type="text" id="textDate"> <span v-else>{{item.date}}</span></th>
      
      <th scope="col">
        <input v-if="(this.editing && item._id == this.editId)" type="text" id="textPin"><span v-else>{{item.punchIn}}</span></th>

      <th scope="col">
        <input v-if="(this.editing && item._id == this.editId)" type="text" id="textPout"><span v-else>{{item.punchOut}}</span></th>

      <th><button><span class="material-icons" @click="edit(item._id)" id="{{ item._id }}">edit</span></button></th>
   
      <th><button @click="eliminar(item._id)"><span class="material-icons">delete</span></button></th>

        <th v-if="(this.editing && item._id == this.editId)"><button @click="update(item._id)"><span class="material-icons">upgrade</span></button></th><th v-else></th>
        <th v-if="(this.editing && item._id == this.editId)"><button @click="cancel()"><span class="material-icons">close</span></button></th><th v-else></th>

    </tr>
  </tbody>
    </table></div>
    </main></div></div>
</template>


<script>
import style from '../assets/bootstrap.min.css'
export default{
    data () {
        return{
            registros:[],
            URL: 'http://localhost:3000/roots',
            editing: false,
            editId:''
        };},
        methods: {
            ///OBTENER DATOS
            getData(){
                const opciones = {
        method: 'GET',
        headers: {
      'Content-Type': 'application/json'
        }
            };

                fetch(this.URL,opciones)
                .then(respuesta => respuesta.json())
                .then(data => {
                    this.registros = data
                }).catch(error => alert(error))

            },///ELIMINAR DATOS
            eliminar(id){
                const opciones = {
        method: 'DELETE',
        headers: {
        'Acept': 'application/json',
        'Content-Type': 'application/json'
        }
            }
                fetch(this.URL + '/' + id,opciones)
                .then(respuesta => respuesta.json())
                .then(datos => alert('Eliminado con éxito'))
                .then(this.getData())
                .catch(error => console.log('Error a la hora de eliminar' + error));

                

            },
            ///ACTUALIZAR DATOS
            edit(id){
                this.editId = id;
                this.editing = true
                const idUser = id.toString();
               
          
               

            },
            cancel(){
                this.editing = false;
            },
            update(id){
                const user = document.getElementById('textId').value;
                const name = document.getElementById('textName').value;
                const date = document.getElementById('textDate').value;
                const pIn = document.getElementById('textPin').value;
                const pOn = document.getElementById('textPout').value;

               var bodySend = JSON.stringify({"_id":id ,"idUser":user,"userName":name,"date":date,"punchIn":pIn,"punchOut":pOn});
                    
      
        const opciones = {
        method: 'PUT',
        headers: {
        "Acept": "application/json",
        "Content-Type": "application/json"}
        ,body: bodySend
            }
                 fetch(this.URL+'/'+id ,opciones)
                .then(respuesta => respuesta.json())
                .then(datos => alert('datos actualizados con éxito'), !this.editing)
                .then(this.getData())
                .catch(error => console.log(error))
                ;

            }
        },mounted(){
            this.getData();
        },
     
        
    }

</script>

<style  lang="scss" scoped>
	.material-icons {
				font-size: 2rem;
				color: lightcoral;
				transition: 0.2s ease-in-out;
			}
</style>