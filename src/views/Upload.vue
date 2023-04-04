<template>
    <div class="container">
        <div class="row"><main class="home-page">
      
        <h1>Subir archivo</h1>
            <h2>A continuación seleccione un documento de excel</h2>
    </main>
    <div class="input-group mb-3">
        <label class="custom-upload">
  <input type="file" class="form-control" id="archivoExcel" @change="uploadExcel()"/>
  
</label></div> </div>
    <div class="row" v-if="(this.spinner == true)">
        <div class="col"></div>
      <div class="col">
        <div class="spinner-border text-success" role="status">
        </div></div>
        <div class="row"> 
            <div class="col"></div>
            <div class="col">
            <label>cargando...</label></div></div>
    </div>
<br><br><br>
<div class="container" v-if="(this.headerTable.length > 0  && this.spinner == false)">
    <div class="row">
        <div class="col"><h2 >Vista previa de los datos</h2></div>

  

        
  

        
<div class="col">
    <button class="btn btn-success" @click="guardarExcel(this.bodyTable)">Guardar Datos</button>
</div>
    <div class="row">
    <table class="table table-striped">
        <thead>
    <tr>
      <th scope="col">{{this.headerTable[0][0]}}</th>
      <th scope="col">{{this.headerTable[0][1]}}</th>
      <th scope="col">{{this.headerTable[0][2]}}</th>
      <th scope="col">{{this.headerTable[0][3]}}</th>
      <th scope="col">{{this.headerTable[0][4]}}</th> 
      <th scope="col">{{this.headerTable[0][5]}}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in this.bodyTable" v-bind:key="index" >
      <th scope="col">{{item[0]}}</th>
      <th scope="col">{{item[1]}}</th>
      <th scope="col">{{item[2]}}</th>
      <th scope="col">{{item[3]}}</th>
      <th scope="col">{{item[4]}}</th>
      <th scope="col">{{item[5]}}</th>
    </tr>
  </tbody>
    </table></div>
</div>
</div>


    </div>
    
</template>

<script>
import style from '../assets/bootstrap.min.css'
import readXlsFile from 'read-excel-file'
     
export default{
    data: () => ({
        headerTable:[],
        bodyTable:[],
        spinner: false,
        toast: false,
        employee:{
          idUser: '',
          userName:'',
          date:'',
          punchIn: '',
          punchOut:''
        },
    }) ,
    methods:{
        uploadExcel(){
            this.spinner = true;
            const input = document.getElementById('archivoExcel')
            readXlsFile(input.files[0]).then((rows) => {
            this.headerTable = rows;
            this.bodyTable = this.headerTable.filter(id => id[0] > 0 );
            setTimeout(() => this.spinner = false, 2000);
        }).catch((msg)=> {
            alert('Error al subir archivo  ' + msg)
        }
        )
    },
    activateToast (){
      this.toast = true;
    },
    guardarExcel(e){
      const url = 'http://3.144.99.167:3000/roots';
      let empleado = this.employee;
      let aux = 0;
      let toast ;
      e.forEach(function(row){
        empleado.idUser = row[0];
         empleado.userName = row[1];
      empleado.date = row[2];
      empleado.punchIn = row[3];
      empleado.punchOut = row[4];
         
     

      const opciones = {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json'
      // 'Authorization': 'Bearer ' + token // si la API requiere autenticación
  },    body: JSON.stringify(empleado)
};
 
    fetch(url, opciones)
      .then(respuesta => respuesta.json()) 
      .then(datos => {
        aux = aux + 1;

        if(aux == e.length) {
         alert('Datos guardados con éxtito')
        }
      })
      .catch(error => console.error(error)); 
      
    });
   

  }

    }
  
}
</script>

<style  lang="scss" scoped>
aside{
	.custom-upload {
		color: #171616;
	}

}
</style>
