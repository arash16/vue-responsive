# vue-responsive-component
Responsive vue component to render contents conditionally based on window's width.

When constraints are not satisfied, component's children is not rendered at all.
This is mostly useful for 

- SSR rendered pages where you don't want to render some (mobile/web related) 
content at all. In that case you need to provide ```defaultWidth```, or configure 
it globally with ```configureDefaultWidth``` to be used for server-side-rendering.

- Layouts where a component is rendered in completely different places
based on window's width.

### Install

```npm install vue-responsive-component```

or

```yarn add vue-responsive-component```


## Usage Example

```javascript
import Responsive from 'vue-responsive-component';
```

```html
<template>
  <div>
    <responsive max="1200">
      content rendered when window is less than 1200px
    </responsive>
    <responsive min="600">
      content rendered when window is greater than or equal 600px
    </responsive>
    <responsive min="md" default-width="900">
      content rendered when window is 
      greater than or equal `md` brekapoint (600px by default)
      in SSR, window width is 900px and this component will be rendered.
    </responsive>
  </div>
</template>
```

To configure default values:

```javascript
import {configureBreakpoints, configureDefaultWidth} from 'vue-responsive-component';
configureBreakpoints({
  // these are default breakpoints, you can add other breakpoints too.
  xs: 0,
  sm: 500,
  md: 600,
  lg: 900,
  xl: 1200,
});

configureDefaultWidth(600);
```
