<template>
  
    <div class="container">
          <div class="row">
      <main class="home-page">
          <div class="row">
          <h1>Lista de registros</h1></div>
              <br>    
          <div class="row"> 
              <div class="col">
             
          </div>
          <div class="col">
              
              <br>
              <div class="row">
                <div class="col"></div>
                <div class="col">
                  <button class="btn btn-danger" @click="optionsValue()">Activar seleción Datos</button>
              </div>
              <div class="col">
                  <button class="btn btn-success" @click="exportData()">Enlistar datos</button>
              </div>
              </div>
          </div>
          </div>
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
      <tr v-for="(item,index) in this.registros" :key="index" id="{tr}" v-bind="key">
        <th scope="col">{{item.idUser}}</th>
        <th scope="col">{{item.userName}}</th>
        <th scope="col">{{item.date}}</th>
        <th scope="col">{{item.punchIn}}</th>
        <th scope="col">{{item.punchOut}}</th>
        <th>
            <input type="checkbox" class="form-check-input"   v-for="(item,index) in this.options" :key="index" :value="item" :id="index" > 
       </th>
      </tr>
     
    </tbody>
      </table>
      
      <div class="container" v-if="(this.selected.length > 0)">
        <div class="row"></div><br><br>
        <div class="row">
            <h2>Datos Seleccionados</h2>
        </div>
      <div class="row">
        <table class="table">
  <thead>
    <tr>
        <th scope="col">Id User</th>
        <th scope="col">User Name</th>
        <th scope="col">Date</th>
        <th scope="col">Punch In</th>
        <th scope="col">Punch Out</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
     <tr v-for="(item,index) in this.selected" v-bind:key="index" >
      <th scope="col">{{this.registros[item.index].idUser}}</th>
      <th scope="col">{{this.registros[item.index].userName}}</th>
      <th scope="col">{{this.registros[item.index].date}}</th>
      <th scope="col">{{this.registros[item.index].punchIn}}</th>
      <th scope="col">{{this.registros[item.index].punchOut}}</th>
    </tr>
  </tbody>
</table>
      </div>
    </div>
</div>
      </main></div></div>
  </template>
  
  
  <script>
  
import style from '../assets/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

  
  export default{
      data () {
          return{
              registros:[],
              URL: 'http://3.144.99.167:3000/roots',
              state:false,
              selected:[],
              options: [],
              export : false 
          };},
          methods: {
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
                
            },
            optionsValue(){
                this.export = false ;
                this.registros.forEach(element => {
                     const valores = {"value":element._id}
                    this.options = valores
                    console.log(this.options)
                });
            },
            exportData(index){
                console.log(index)
                    if(this.selected.length > 0)this.selected = [];
                    let idx = 0;
                let selection = document.querySelectorAll('.form-check-input')

                selection.forEach(element => {
                    let array = {"value":element.value ,"index":idx}
                    if(element.checked == true)  this.selected.push(array) 
                    idx ++;
              });
                this.registros.indexOf()

                this.export = true;

            }
          },beforeMount(){
            this.getData();
            
          }
      }
  
  
  </script>
  
  <style>
  </style>
