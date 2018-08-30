<template>
	<div>
    <el-form ref="form" label-width="120px">
      <el-form-item label="サマリ">
        <el-input v-model="summary"></el-input>
      </el-form-item>
      <el-form-item label="詳細">
        <el-input type="textarea" v-model="detail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="sendMessage">プッシュ</el-button>
        <el-button >リセット</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
  const socket = require('../websocket-host');

	module.exports = {
    data: function(){
      return {
        summary: '',
        detail: ''
      }
    },
    methods: {
      sendMessage: function(){
        let message = {
          summary: this.summary,
          detail: this.detail
        }

        socket.send(JSON.stringify(message));
      }
    }
	}
</script>
