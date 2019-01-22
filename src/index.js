const breakpoints = {
  xs: 0,
  sm: 500,
  md: 600,
  lg: 900,
  xl: 1200,
};

let defaultWidth = 1200;

const props = {
  defaultWidth: {
    type: [String, Number],
    default: undefined,
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
};

const Singular = {
  props,
  data() {
    // it's possible that we are executed in SSR context
    // where we don't have access to window object, so we
    // use a default width, later inside mounted we fix this.

    // also if we check for `typeof window` and return
    // conditionally, hydration of SSR result will fail.
    return { width: +this.defaultWidth || defaultWidth };
  },
  mounted() {
    this.width = window.innerWidth;
    this.resetWidth = () => {
      this.width = window.innerWidth;
    };
    window.addEventListener('resize', this.resetWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.resetWidth);
  },
  render() {
    const min = breakpoints[this.min] || +this.min;
    const max = breakpoints[this.max] || +this.max;
    if (this.width < min || this.width >= max) return;
    const defaultSlot = this.$slots.default;
    return defaultSlot && defaultSlot[0];
  },
};

// render function should render a single element
// so here we are building many singular responsive
// wrapper for each one of our child elements.
export default {
  name: 'Responsive',
  functional: true,
  props,
  render(h, context) {
    const { min, max } = context.props;
    return context.children.map(child => {
      return h(Singular, { props: { min, max } }, [
        // it's possible that this child node is used in multiple places
        // so we have to clone it right away
        h(child.tag, child.data, child.children || child.text),
      ]);
    });
  },
};

export function configureBreakpoints(values) {
  Object.assign(breakpoints, values);
}

export function configureDefaultWidth(value) {
  if (Number.isFinite(+value)) {
    defaultWidth = +value;
  }
}
