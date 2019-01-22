# vue-responsive-component
Responsive vue component to render contents conditionally based on window's width.

Component children is not rendered entirely when constraints are not satisfied.
This is useful for SSR rendered pages where you don't want to render some content too.
In that case you need to provide ```defaultWidth```, or configure it globally with 
```configureDefaultWidth```. In server-side this default width will be used.

### Install

```npm install vue-responsive-component```

or

```yarn add vue-responsive-component```


## use case

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
