import { minBrowserRefreshTime, systemInfo } from './system';

let fireCanvasBox = null;
export default {
  data() {
    return {
      pixelRatio: systemInfo.pixelRatio,
    };
  },
	methods: {
		parseInt16(t) {
      return parseInt(t, 16);
    },
    canvasIdErrorCallback(e) {
      console.error(e.detail.errMsg);
    },
    initCanvas() {
      fireCanvasBox = uni.createCanvasContext(this.canvasId, this);
      fireCanvasBox.setFillStyle('transparent');
      fireCanvasBox.fillRect(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
      fireCanvasBox.scale(this.pixelRatio, this.pixelRatio);
      fireCanvasBox.draw();
      this.fireworksDraw();
    },
    fireworksDraw() {
      let _this = this;
      let ribbon = [];
      let particleCount = this.particleCount;
      let n = null;
      let r = null;
      let a = null;
      let i = null;
      for (; particleCount--; ) {
        (n = {
          x: this.x,
          y: this.y,
          angle: this.angle,
          spread: this.spread,
          startVelocity: this.startVelocity,
          color: this.colors[particleCount % this.colors.length],
          ticks: this.ticks,
          decay: this.decay
        }),
          (i = 0),
          (r = n.angle * (Math.PI / 180)),
          (a = n.spread * (Math.PI / 180));
        ribbon.push({
          // 菜单位置初始化
          x: n.x,
          y: n.y,
          depth: 0.5 * Math.random() + 0.6,
          wobble: 10 * Math.random(),
          velocity: 0.5 * n.startVelocity + Math.random() * n.startVelocity,
          angle2D: -r + (0.5 * a - Math.random() * a),
          tiltAngle: Math.random() * Math.PI,
          color:
            ((i = (n.color + '').replace(/[^0-9a-f]/gi, '')),
            i.length < 6 && (i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]),
            {
              // 生成随机颜色
              r: this.parseInt16(i.substring(0, 2)),
              g: this.parseInt16(i.substring(2, 4)),
              b: this.parseInt16(i.substring(4, 6))
            }),
          tick: 0,
          totalTicks: n.ticks,
          decay: n.decay,
          random: Math.random() + 5,
          tiltSin: 0,
          tiltCos: 0,
          wobbleX: 0,
          wobbleY: 0
        });
      }

      minBrowserRefreshTime(function drawRibbon() {
        if (!fireCanvasBox) return;
        fireCanvasBox.draw(),
          fireCanvasBox.restore(),
          (ribbon = ribbon.filter(e => {
            (e.x += Math.cos(e.angle2D) * e.velocity), (e.y += Math.sin(e.angle2D) * e.velocity + 5 * e.depth), (e.wobble += 0.1), (e.velocity *= e.decay), (e.tiltAngle += 0.02 * Math.random() + 0.12), (e.tiltSin = Math.sin(e.tiltAngle)), (e.tiltCos = Math.cos(e.tiltAngle)), (e.random = Math.random() + 4), (e.wobbleX = e.x + 10 * Math.cos(e.wobble) * e.depth), (e.wobbleY = e.y + 10 * Math.sin(e.wobble) * e.depth);
            (fireCanvasBox.fillStyle = 'rgba(' + e.color.r + ', ' + e.color.g + ', ' + e.color.b + ', ' + (1 - e.tick++ / e.totalTicks) + ')'), fireCanvasBox.beginPath(), fireCanvasBox.moveTo(Math.floor(e.x), Math.floor(e.y)), fireCanvasBox.lineTo(Math.floor(e.wobbleX), Math.floor(e.y + e.random * e.tiltSin)), fireCanvasBox.lineTo(Math.floor(e.wobbleX + e.random * e.tiltCos), Math.floor(e.wobbleY + e.random * e.tiltSin)), fireCanvasBox.lineTo(Math.floor(e.x + e.random * e.tiltCos), Math.floor(e.wobbleY)), fireCanvasBox.closePath(), fireCanvasBox.fill();
            return e.tick < e.totalTicks;
          }));
        if (ribbon.length) {
          minBrowserRefreshTime(drawRibbon);
        } else {
          fireCanvasBox = null;
          _this.$emit('finish');
        }
      });
    }
	}
}