import { set as setStorage, get as getStorage } from '../storage';

/**
 * 获取地理位置信息，为了避免微信获取地理位置接口被封，每三分钟调用一次
 * @param {number} expired 单位：分钟，缓存时间
 */
export function getLocation(minute = 3) {
  return new Promise(async (resolve, reject) => {
    const latitude = await getStorage('latitude');
    const longitude = await getStorage('longitude');
    const expiredAt = await getStorage('location_expiredAt');
    const now = new Date().getTime();
    if (latitude && longitude && expiredAt && expiredAt > now) {
      resolve({ latitude, longitude });
    } else {
      uni.getLocation({
        type: 'wgs84',
        success: data => {
          setStorage('latitude', data.latitude);
          setStorage('longitude', data.longitude);
          setStorage('location_expiredAt', now + 1000 * 60 * minute); // 默认三分钟后过期
          resolve({
            latitude: data.latitude,
            longitude: data.longitude
          });
        },
        fail: reject
      });
    }
  });
}
