# ember-wagtail-images Documentation

## Configuration

Configure your Wagtail image path in `environment.js`.
```js
// config/environment.js

module.exports = function(environment) {
  var ENV = {
    // ...
    APP: {
      wagtailImages: {
        imagePath: 'https://my-wagtail-instance.net/images'
      }
    }
    // ...
  };
};
```


## Your Image Model

This addon expects an image object or model that at least has an `id` key.
```js
const wagtailImage1 = {
  "id": 32
}
```

If your model contains the original image dimensions as `width` and `height`, the component can automatically generate `srcset` attributes for high resolution displays.
```js
const wagtailImage2 = {
  "id": 33,
  "width": 2000,
  "height": 1600
}
```

If your model contains an `alt` text attribute, the component will automtically populate the alt attribute on the generated img tag.
```js
const wagtailImage3 = {
  "id": 34,
  "alt": "An old red barn.",
}
```


## The Component

Basic usage looks like this:

```html
<WagtailImage
  @image=wagtailImage
  alt="An old red barn."
  @resizeWidth="400"
  @resizeHeight="300"
/>
```
This will render as an `img` tag that looks like this:
```html
<img src="https://my-wagtail-instance.net/images/32/fill-400x300/" alt="An old red barn.">
```


### Parameters:

| Property | Description |
| --- | --- |
| image | An object or model with an id that points to an image in your wagtail site. e.g. `{id: 2}` |
| resizeWidth | Requested width in pixels |
| resizeHeight | Requested height in pixels |
| resizeFit | `fill` (default), `contains`, or `cover`, see the section on Fit below for more information  |
| format | `jpeg` or `png` |
| jpegquality | a number from 1 to 100 |
| bgcolor | a 3 or 6 digit hex code |

```hbs
<WagtailImage
  @image=wagtailImage
  alt="An old red barn."
  @resizeWidth="400"
  @resizeHeight="300"
  @resizeFit="contain"
  @bgcolor="ddd"
  @jpegquality="90"
/>
```
becomes
```html
<img src="https://my-wagtail-instance.net/images/32/max-400x300|bgcolor-ddd|jpegquality-90/" alt="An old red barn.">
```


### Automatic High Resolution srcsets

If your original image is large enough, a srcset for high resolution images will be created:

```js
const wagtailImage2 = {
  "id": 33,
  "width": 800,
  "height": 600
}
```

```hbs
<WagtailImage
  @image=wagtailImage
  alt="An old red barn."
  @resizeWidth="400"
  @resizeHeight="300"
/>
```

```html
<img src="https://my-wagtail-instance.net/images/32/fill-400x300/" srcset="https://my-wagtail-instance.net/images/32/fill-400x300/,https://my-wagtail-instance.net/images/32/fill-600x450/ 1.5x,https://my-wagtail-instance.net/images/32/fill-800x600/ 2x" alt="An old red barn.">
```


## The Helper

If you just want a URL you can use the `wagtail-image-url` helper.
```hbs
<img src={{wagtail-image-url wagtailImage 400 300}} alt="An old red barn.">
```

The helper supports the same parameters as the component:
```hbs
{{wagtail-image-url <image> <width> <height> <fit> bgcolor=<bgcolor> format=<format> jpegquality=<jpegquality>}}
```


##  Fit

How wagtail fits and crops images is determined by the width, height, and fit settings.

The [Wagtail Docs](docs.wagtail.io/en/v2.4/topics/images.html) can provide more context for these settings.

| Settings | Generated resize prefix | Behavior |
| --- | --- | --- |
| no resize arguments set | `original` | Returns the original image.
| `resizeWidth` only | `width-` | Reduces the width of the image, while maintaining aspect ratio. |
| `resizeHeight` only | `height-` | Reduces the height of the image, while maintaining aspect ratio. |
| `resizeHeight` & `resizeWidth`, no `resizeFit` | `fill-` | Resize to the exact size specified, cropping based on focal point (set in wagtail), or center of image. |
| `resizeHeight`, `resizeWidth`, `resizeFit='contain'` | `max-` | Resize the image to fit within the dimensions specified, while maintining aspect ratio. |
| `resizeHeight`, `resizeWidth`, `resizeFit='cover` | `min-` | Resizes the image to cover at least the dimensions specified, without cropping. |
