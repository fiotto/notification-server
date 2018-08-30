<template>
	<div>
    <el-dialog
        :visible="dialogVisible"
				v-bind:before-close= "closeDialog">
      <span v-html="detail.replace(/\n/g,'<br/>')"></span>
      <span slot="footer" class="dialog-footer">
        <el-button v-on:click="closeDialog">Cancel</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	module.exports = {
		computed: {
			dialogVisible: function(){
				return this.$store.getters.dialogVisible;
			},
			detail: function(){
				return this.$store.getters.detail;
			}
		},
		methods: {
			closeDialog: function(){
				this.$store.commit('dialogVisible', {
					visible: false,
					detail: ''
				});
			}
		}

	}
</script>
