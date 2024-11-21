import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from 'react';

interface MyLazyloadProps {
  /**类名 */
  className?: string,
  /**样式 */
  style?: CSSProperties,
  /**占位的内容 */
  placeholder?: ReactNode,
  /**距离到可视区域多远就触发加载 */
  offset?: string | number,
  width?: number | string,
  height?: string | number,
  /**进入可视区域的回调 */
  onContentVisible?: () => void,
  children: ReactNode,
}

/**
 * 懒加载组件
 * @param props 
 * @returns 
 */
const MyLazyload: FC<MyLazyloadProps> = (props) => {

  const {
    className = '',
    style,
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // 元素监听的 ref
  const elementObserver = useRef<IntersectionObserver>();

  const styles = { height, width, ...style };

  // 监听元素触发的回调
  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;

    // 当 isIntersecting 为 true 的时候，就是从不相交到相交，反之，是从相交到不相交
    // 设置 visible 为 true，回调 onContentVisible，然后去掉监听
    if (isIntersecting) {
      setVisible(true);
      onContentVisible?.();

      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node); // 去掉监听
      }
    }
  };

  // 监听 div 进入可视区域的情况
  useEffect(() => {
    const options = {
      // rootMargin 距离多少进入可视区域就触发
      rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',
      // threshold 元素进入可视区域多少比例的时候触发，0 就是刚进入可视区域就触发
      threshold: 0
    };

    // 用 IntersectionObserver 监听 div
    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);

    const node = containerRef.current;

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }, []);

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  )
}

export default MyLazyload;
