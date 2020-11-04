// 什么叫事件环
// 进程 计算机分配任务 调度的任务的最小单位
// 线程 进程里包含着线程
// js是单线程的 (主线程是单线程的)

// js也可以认为是多线程的 setTimeout

// 队列 先进先出 和 栈 后进先出 区别

// [1,2,3].shift();

//  执行顺序是无关的 和销毁顺序
function a() {
  console.log(1);
  b();
  function b() {
    console.log(2);
    c();
    function c() {
      console.log(3);
    }
  }
}
a();