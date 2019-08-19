function throttle (fun, wait, ctx) { // 节流函数
  let previous = 0;
  return () => {
    let now = +new Date();
    if (now - previous > wait) {
      fun.apply(ctx, arguments);
      previous = now;
    }
  };
}

export {
  throttle
}
