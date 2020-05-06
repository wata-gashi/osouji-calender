<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body{
    margin: 0;
  }
  .app{
    max-width: 500px;
    margin: 0 auto;
  }
  .btn{
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 10px 20px;
    margin: 3px;
    transition: all 200ms ease-in-out;
    text-decoration: none;
    cursor: pointer;

  &:hover{
     background-color: #42b983;
   }
  }
  .btn-light{
    background-color: #6792ba;
  }
  .btn-container{
    display: flex;
    justify-content: flex-end;
  }
  .osouji-list{
    padding: 0;
    font: 14px / 1.6 'arial narrow', sans-serif;
    max-width: 350px;
    list-style: none;

    .osouji-item{
      position: relative;
      padding: 7px 5px 7px 10px;
      color: #5da05d;
      margin-bottom: 5px;
      font-weight: bold;
      background: #cff6cf;
      border-left: solid 5px #377937;
      box-shadow: 1px 1px 2px rgba(#000, 0.1);

//      transition: 0.3s;

/*      &:before{
        counter-increment: list;
        content: "";
        display: block;
        position: absolute;
        left: 10px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: white;
        top: 50%;
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      &:hover{
        background: #377937;
      }*/
    }
  }
  #header-o{
    width: 100vw;
    padding: 3px 0 3px 0;
    background-color: #90ee90;
    text-align: center;
    color: white;
  }
</style>
