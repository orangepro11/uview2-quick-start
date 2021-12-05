# 不要安装node-sass!

用这个命令代替

```bash
yarn add node-sass@npm:dart-sass   
```
---
再说一遍不要安装node-sass! 把项目clone下来后先把node-sass remove掉再说

```bash
npm uninstall node-sass
```

---
# 注意事项

1. @ 指的是src目录
2. 不要更改App.vue文件里的script部分



# ts开发指导

1. 先引包，包名是'vue-property-decorator'，意思是vue属性装饰器。

   ```typescript
   import {Component,Vue} from 'vue-property-decorator';
   ```

2. 然后把原有的导出对象的形式更改为导出类的形式

   ```typescript
   export default class Index extends Vue {
   	private onClick() {
   		console.log(this.test());
   	}
   	private test():string {
   		return 'hello world';
   	}
   }
   ```

3. 最关键的，要给这个组件套上一个名为Component的帽子：

   ```typescript
   @Component({
   	
   })
   export default class Index extends Vue {
   	private onClick() {
   		console.log(this.test());
   	}
   	private test():string {
   		return 'hello world';
   	}
   }
   ```

   这个Component装饰器是万能的，所有原有的vue组件式写法都能写到Component里，比如data，methods，components等等等等。。。

4. 现在着重讲解类式写法

5. 方法不用写在methods里，直接写在类属性里就可以

6. 变量不用写在data里，直接写在类属性里就可以

7. 引用的组件只能在Component装饰器里注册

8. 组件触发事件：原有的$emit方法仍然可以用，但有更简洁的方案：

   ```typescript
   import {Component,Vue, Emit} from 'vue-property-decorator';
   @Component({
   	
   })
   export default class Index extends Vue {
   	private message: string = "Hello World";
   	private onClick() {
   		console.log("Hello World");
   	}
       
   	@Emit('testClick')
   	private test() {}
   }
   ```

   注意，每次调用test都会触发testClick事件，无论是在DOM上还是在方法里，总之触发了就行。

9. 如果想要携带参数，在test形参列表里加就行。

10. 