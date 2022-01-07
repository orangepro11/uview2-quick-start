import { minBrowserRefreshTime, systemInfo } from './system';

export default {
	props: {
    particleCount: {
      type: [Number, String],
      default: 150
    },
    angle: {
      type: [Number, String],
      default: 90
    },
    spread: {
      type: [Number, String],
      default: 100
    },
    startVelocity: {
      type: [Number, String],
      default: 45
    },
    decay: {
      type: [Number, String],
      default: 0.9
    },
    ticks: {
      type: [Number, String],
      default: 150
    },
    zIndex: {
      type: [Number, String],
      default: 1
    },
    colors: {
      type: Array,
      default: () => ['#5BC0EB', '#2176AE', '#FDE74C', '#9BC53D', '#E55934', '#FA7921', '#FF4242']
    },
    canvasId: {
      type: String,
      default: 'fireCanvas'
    },
    width: {
      type: [Number, String],
      default: () => {
        return systemInfo.windowWidth;
      }
    },
    height: {
      type: [Number, String],
      default: () => {
        return systemInfo.windowHeight;
      }
    },
    x: {
      type: [Number, String],
      default: () => {
        return systemInfo.windowWidth / 2;
      }
    },
    y: {
      type: [Number, String],
      default: () => {
        return systemInfo.windowHeight * 0.4;
      }
    }
  },
}