<!--
 * @Author: By
 * @Date: 2022-08-17 11:45:45
 * @LastEditTime: 2022-09-15 20:06:08
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 
 * @FilePath: \big-screen\README.md
 * 可以输入预定的版权声明、个性签名、空行等
-->
# TODO unoCss --- padding margin color background border-color

# TODO consolea

# TODO ThingJS

# TODO Pinia action

# default-passive-events

``` warn
[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
```

Passive Event Listeners：就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性passive的值为true的时候，代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，Chrome浏览器称这类型的监听器为被动（passive）监听器。目前Chrome主要利用该特性来优化页面的滑动性能，所以Passive Event Listeners特性当前仅支持mousewheel/touch相关事件。

``` settle
1.pnpm i default-passive-events 

2.main.js中加入：import 'default-passive-events'
```


<!-- NODE_TLS_REJECT_UNAUTHORIZED -->