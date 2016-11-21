<style lang="scss">
  .m-upload {
    display: inline-block;
    .uploadIpt {
      display: none;
    }
  }
  .preview {
    display: flex;
  }
  .previewList {
    position: relative;
    width: 5rem;
    height: 8rem;
    margin: .5rem;
    &:hover {
      color: #57c5f7;
      .del {
        opacity: 1;
      }
    }
    .del {
      position: absolute;
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.29);
      border-radius: .4rem;
      opacity: 0;
      transition: opacity .3s;
      color:#fff;
      .glyphicon{
        display: inline;
      }
    }
    .imgWrapper {
      display: inline-block;
      height: 5rem;
      width: 5rem;
      border: 1px solid #e0e0e0;
      border-radius: .4rem;
      padding: .5rem;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
  }

  .previewList:first-child {
    margin-left: 0;
  }

  .previewInfo {
    display: inline-block;
    vertical-align: top;
    font-size: .8rem;
    width: 100%;
    text-align: center;
    overflow: hidden;
    .title,
    .size {
      height: 1rem;
      overflow: hidden;
      text-align: center;
    }

  }


</style>
<template>
  <div class="m-upload rd-upload-container">
    <div class="rd-upload-wrapper">
      <div>
        <input type="file" :accept="accept" @change="changeFile" class="uploadIpt">
        <button @click="touchUp" class="btn btn-primary">点击上传</button>
      </div>
      <div class="preview">
        <div class="previewList" v-for="item in fileList">
          <div class="del" @click="delFile(item)"><span class="glyphicon glyphicon-remove"></span></div>
          <div class="imgWrapper">
            <div class="img" :style="{ 'background-image': 'url(' + item.src + ')' }" v-if="item.src"></div>
          </div>
          <div class="previewInfo">
            <div class="title">
              {{item.file.name}}
            </div>
            <div class="size">
              {{sizeCalc(item.file.size)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import rdButton from '../basic/button.vue'
  const imageType = /^image\//;
  export default {
    props: {
      accept: String
    },
    data () {
      return {
        $file: null,
        fileList: []
      }
    },
    ready () {
      this.$file = this.$el.getElementsByClassName('uploadIpt')[0]
    },
//    mounted () {
//      this.$file = this.$el.getElementsByClassName('rd-upload-file')[0]
//    },
    components: {
//      rdButton
    },
    methods: {
      sizeCalc (size) {
        return Math.round(size / 10.24) / 100 + 'Kb'
      },
      touchUp (e) {
        if (this.$file) {
          this.$file.click()
        }
      },
      changeFile (e) {
        let previewUrl = '';
        let newItem = {};
        for (let i = 0, len = this.$file.files.length; i < len; i++) {
          previewUrl = '';
          if (imageType.test(this.$file.files[i].type)) {
            previewUrl = window.URL.createObjectURL(this.$file.files[i])
          }
          newItem = {
            src: previewUrl,
            file: this.$file.files[i]
          };
          this.fileList.push(newItem);
          this.$emit('add', newItem, this.fileList)
        }
      },
      delFile (item) {
        this.fileList.$remove(item);
        this.$emit('remove', item)
      }
    }
  }
</script>
