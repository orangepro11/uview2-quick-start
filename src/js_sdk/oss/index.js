class QiniuUpload {
  host = '';
  token = '';
  bucket_url = 'https://up-z2.qiniup.com';

  constructor(host, token,bucket_url) {
    this.host = host;
    this.token = token;
    this.bucket_url = bucket_url;
  }

  setToken = token => {
    this.token = token;
    return this;
  };

  setBucketUrl = url => {
    this.bucket_url = url;
    return this;
  };

  setHost = host => {
    this.host = host;
    return this;
  };

  isReady = () => {
    return this.host && this.token && this.bucket_url;
  }

  upload = url => {
    return new Promise((resolve, reject) => {
      if(!this.isReady()) {
        return reject('请指定host,token和bucket_url');
      }
      uni.uploadFile({
        url: this.bucket_url,
        name: 'file',
        filePath: url,
        formData: {
          token: this.token
        },
        success: res => {
          const { key } = JSON.parse(res.data);
          resolve(`${this.host}${key}`);
        }
      });
    });
  };
}

export default new QiniuUpload();
