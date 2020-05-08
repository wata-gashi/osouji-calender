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
    user-select: none;

    &:not(.disabled):hover{
      background-color: #42b983;
    }
  }
  .disabled{
    background-color: #444444;
  }
  .btn-light{
    background-color: #6792ba;
  }
  .btn-container{
    display: flex;
    justify-content: flex-end;
  }
  .osouji-list{
    position: relative;
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
      overflow: hidden;

      .remove{
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        padding: 0 15px;
        background-color: #ff6969;
        font-weight: normal;
        font-size: 1.2em;
        color: rgba(white, 0.9);
        align-items: center;
        justify-content: center;
        transition: transform .3s, opacity .3s, background-color .2s;
        opacity: 1;

        &[target="false"]{
          transform: translateX(100%);
          opacity: 0;
        }

        &[target="true"]{
          cursor: pointer;

          &:hover{
            background-color: #d01818;
          }
        }
      }
    }
  }
  .edit-button{

  }
  #header-o{
    width: 100vw;
    padding: 3px 0 3px 0;
    background-color: #90ee90;
    text-align: center;
    color: white;
  }
</style>
