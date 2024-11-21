# React-Lazyload 懒加载

网页里可能会有很多图片，图片加载有一个过程，我们会在图片加载过程中展示占位图片。

并且我们不需要一开始就加载所有图片，而是希望在图片滚动到可视区域再加载。

这种效果我们会用 react-lazyload 来实现。

## 核心实现原理
使用 `IntersectionObserver` 监听dom的变化，在回调中设置控制变量 `visible` 是判断显示内容还是占位符

```tsx
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

    // 组件卸载的时候取消监听
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }, []);
```

lazyLoadHandler 回调函数
```tsx
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
```