<template>
  <div id="app">
    <header-o/>
    <div id="view-root">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <footer-o/>
    <update-notification></update-notification>
  </div>
</template>
<script>
  import HeaderO from './components/HeaderO'
  import FooterO from './components/FooterO'
  import UpdateNotification from './components/UpdateNotification'

  export default {
    components: {
      'header-o': HeaderO,
      'footer-o': FooterO,
      'update-notification': UpdateNotification
    },
    created: function () {
      const cacheOsoujiList = localStorage.getItem('osoujiList')
      if (cacheOsoujiList && cacheOsoujiList.length > 0) {
        this.$store.commit('initOsoujiList', JSON.parse(cacheOsoujiList))
      }
    }
  }
</script>

<style lang="scss">
  *{
    font-family: "Meiryo", fantasy;
    user-select: none;
    color: #1f6f00;
  }
  body{
    margin: 0;
  }
  #app{
    max-width: 500px;
    margin: 0 auto;
  }
  #title{
    padding: 7px 0;
    font-size: x-large;
    font-weight: bold;
    color: #1f6f00;
  }
  .btn-container{
    display: flex;
    justify-content: flex-end;

    &-left{
      justify-content: flex-start;
    }

    &-spacer{
      content: "";
      width: 5px;
    }
  }
  .osouji-list{
    position: relative;
    padding: 0;
    font-size: 14px / 1.6;
    max-width: 350px;
    list-style: none;

    .osouji-item{
      position: relative;
      padding: 7px 5px 7px 10px;
      color: #5da05d;
      margin-bottom: 5px;
      background: #cff6cf;
      border-left: solid 5px #377937;
      box-shadow: 1px 1px 2px rgba(#000, 0.1);
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

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

  .dialog{
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(#222, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;

    &-inner{
      background-color: white;
      padding: 30px;
      width: 300px;

      .title{
        text-align: center;
        font-size: x-large;
        font-weight: bold;
        color: #1f6f00;
      }

      &-elements{
        margin-bottom: 8px;
        padding: 10px 0;
        border-bottom: solid 1px #adadad;

        label{
          color: #1f6f00;
        }
      }
    }
  }

  .group{
    position: relative;
    width: 100%;
    margin-top: 10px;

    &-title{
      display: block;
      position: relative;
      top: 0;
      width: 100px;
      text-align: center;
      color: #1f6f00;
      background-color: white;
      margin: 0 auto;
      z-index: 2;
    }

    &-inner{
      display: block;
      position: relative;
      box-sizing: border-box;
      border: 1px dashed #377937;
      top: -14px;
      width: 100%;
      padding: 16px;
      z-index: 1;
    }
  }

  .warning{
    display: flex;
    justify-content: flex-start;
    color: red;
    font-size: 0.9em;
    font-weight: bold;
    margin: 2px 0;

    &:before{
      display: block;
      margin: 0 3px;
      content: "!";
      font-weight: normal;
      text-align: center;
      width: 1.2em;
      height: 1.2em;
      color: white;
      background-color: red;
      border: 1px solid red;
      border-radius: 1.2em * 0.4;
    }
  }

  #view-root{
    margin: 34px 0 55px
  }

  .spacer-vertical{
    display: block;
    width: 100%;
    height: 5px;
  }

  #header-o{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #90ee90;
    padding: 3px 0;
    text-align: center;
    font-size: larger;
    font-weight: bold;
    color: white;
  }
</style>
