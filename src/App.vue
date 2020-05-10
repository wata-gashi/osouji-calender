<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    mounted () {
      const em = this.$eventHub
      window.setTimeout(function () {
        const xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const jsondata = JSON.parse(xmlhttp.responseText)

              em.$emit('set-version', jsondata)
            }
          }
        }
        xmlhttp.open('GET', '/static/version.json')
        xmlhttp.send()
      }, 3000)
    }
  }
</script>

<style lang="scss">
  body{
    font-family: "Meiryo", fantasy;
    margin: 0;
    user-select: none;
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
//    font: 14px / 1.6 'arial narrow', sans-serif;
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

  $checkbox-size: 50px;

  .checkbox-area{
    display: flex;
    justify-content: center;
    align-items: center;

    &:before{
      content: "編集:";
      color: #1f6f00;
      margin-right: 3px;
      padding: 0 3px;
    }

    .checkbox-area-label{
      display: block;
      width: $checkbox-size;
      box-sizing: border-box;
      text-align: left;
      border: 2px solid #5da05d;
      border-radius: 3px;
      line-height: 1;
      height: $checkbox-size / 2;
      overflow: hidden;
      cursor: pointer;

      &-main{
        display: none;

        &:checked + .checkbox-area-label-box{
          transform: translateX(100%);
          background: #5da05d;
        }
      }

      &-box{
        display: inline-block;
        height: $checkbox-size / 2 - 2px;
        width: 50%;
        background: #ddd;
        transition: .3s;
      }
    }
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

  #footer-o{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1f6f00;
    padding: 10px 0;
    color: white;
    text-align: center;
  }
</style>
