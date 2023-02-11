function debounce(func, pauseMs) {
  let timer;

  return function executor(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, pauseMs);
  };
}

export default debounce;
