<template>
  <div class="banner">
    <h1>{{title}}</h1>
    <p>{{desc}}</p>
  </div>
</template>
<script>
  export default {
    name:"Banner",
    props: {
      title:String,
      desc:String
    }
  };
</script>
<style scoped lang="scss">
  .banner {
    width:100%;
    height: 250px;
    min-height: 250px;
    background: url(~@/assets/images/white-banner.png) right no-repeat;
    background-size: contain;
    background-color: #f7f7f7;
    box-shadow: 0 3px 5px rgba(0,0,0,0.03);
    position: relative;
    z-index:1;
    -display: flex;
    padding-left:80px;
    box-sizing: border-box;
    -justify-content: center;
    -flex-direction: column;
    background-color: #f7f7f7;
    h1 {
        width: 100%;
        font-family: "syhtMedium";
        font-size: 22px;
        color: #262626;
        letter-spacing: -0.43px;
        margin:0px;
        float: left;
        margin-top:80px;
    }

    p {
      font-size: 16px;
      font-family: "syht";
      color: #999;
      margin: 0px;
      margin-top:10px;
      display: inline-block;
      width: auto;
      float: left;
      margin-top:10px;
      position: relative;
      color:"#999";
      &::after {
        content:"";
        display: block;
        width: 100%;
        height:5px;
        position: absolute;
        bottom:-2px;
        background-image: linear-gradient(90deg, rgba(241,151,51,0.8) 0%, rgba(241,151,51,0) 100%);
      };
    }
  }

</style>


