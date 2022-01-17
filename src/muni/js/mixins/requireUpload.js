import qiniu from '../qiniu';

let bucket_url = process.env.VUE_APP_OSS_BUCKET;
let host = process.env.VUE_APP_OSS_HOST;
let token = '';

const getUploadToken = async () => {
	token = 'qiniuuploadtoken';
}


export default {
	async mounted() {
		if(!bucket_url) {
			throw new Error('请指定bucket_url');
		}

		if (!host) {
			throw new Error('请指定host,用来拼接回显的域名');
		}

		if(!qiniu.isReady()) {
			await getUploadToken();
			qiniu.setToken(token).setBucketUrl(bucket_url).setHost(host);
		}
		console.log('七牛云上传准备成功，在当前页面可以使用this.$oss(文件路径)上传');

	},
	methods: {
		$oss(file_url) {
			qiniu.upload(file_url);
		}
	}
}