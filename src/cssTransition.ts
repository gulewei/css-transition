function getTransitionProperties() {
  let style = document.createElement('div').style;

  let animationEnd = '';
  let transitionEnd = '';

  if ('transition' in style || 'MozTransition' in style) {
    animationEnd = 'animationend';
    transitionEnd = 'transitionend';
  } else if ('WebkitTransition' in style) {
    animationEnd = 'webkitAnimationEnd';
    transitionEnd = 'webkitTransitionEnd';
  } else {
    throw new Error(`Your browser don't support animationend/trnasitionend !`);
  }

  style = null;

  return { animationEnd, transitionEnd }
}

const { transitionEnd, animationEnd } = getTransitionProperties();

function onEnd(node: HTMLElement, listener: () => void, timeout?: number) {
  const proxy = () => {
    listener();
    offTransitionEnd();
    offAnimationEnd();
    backup && clearTimeout(backup);
  };

  node.addEventListener(transitionEnd, proxy);
  const offTransitionEnd = () => node.removeEventListener(transitionEnd, proxy);

  node.addEventListener(animationEnd, proxy);
  const offAnimationEnd = () => node.removeEventListener(animationEnd, proxy);

  let backup: number;
  if (timeout) {
    backup = setTimeout(proxy, timeout);
  }
}

function enter(
  node: HTMLElement,
  enterAnimation: string,
  active?: string | boolean,
  timeout?: number
) {
  const activeClass = active && active !== true ? active : `${enterAnimation}-active`;

  node.classList.add(enterAnimation);
  requestAnimationFrame(() => {
    node.classList.add(activeClass);
  });

  onEnd(node, () => {
    node.classList.remove(enterAnimation);
    node.classList.remove(activeClass);
  }, timeout);
}

function exit(
  node: HTMLElement,
  exitAnimation: string,
  active?: string | boolean,
  onExited?: (done: () => void) => void,
  timeout?: number
) {
  const activeClass = active && active !== true ? active : `${exitAnimation}-active`;

  const done = () => node && node.parentNode && node.parentNode.removeChild(node);

  node.classList.add(exitAnimation);
  requestAnimationFrame(() => {
    node.classList.add(activeClass);
  });

  onEnd(node, () => {
    node.classList.remove(exitAnimation);
    node.classList.remove(activeClass);
    onExited ? onExited(done) : done();
  }, timeout);
}

export default {
  enter,
  exit,
}