<template>
  
  <div class="container">
        <div class="row">
    <main class="home-page">
        <div class="row">
        <h1>Detalle de registros</h1></div>

        <div class="row"> 
        <div class="col">

            <br>
        </div>
        </div>
      
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
      <th scope="col">{{item.idUser}}</th>
      <th scope="col">{{item.userName}}</th>
      <th scope="col">{{item.date}}</th>
      <th scope="col">{{item.punchIn}}</th>
      <th scope="col">{{item.punchOut}}</th>
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
            URL: 'http://3.144.99.167:3000/roots/',
        };},
        methods: {
            getData(){
                const opciones = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
            };
                   
                fetch(this.URL,opciones)
                .then(respuesta => respuesta.json())
                .then(data => {
                    this.registros = data
                }).catch(error => alert(error))

             
            }
        }
        ,mounted(){
            this.getData();
        }
    }


</script>

<style>
</style>
