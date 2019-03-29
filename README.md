# ember-wagtail-images

An addon for using images from the [Wagtail](https://wagtail.io/) CMS with Ember.


## Table of Contents

  * [Compatibility](#compatibility)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Compatibility

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


## Installation

```
ember install ember-wagtail-images
```

⚠️ This addon requires [setting up a custom ServeView for images in Wagtail](./docs/setting-up-a-custom-serveview-in-wagtail.md) that doesn't use a security key.


## Usage

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

This addon doesn't mange your image model for you. It expects you to provide an image object or model that has an `id` key.
```js
const wagtailImage = {
  "id": 32
}
```

To use the component put something like this into your template.
```hbs
{{wagtail-image
  image=wagtailImage
  alt="An old red barn."
  resizeWidth="400"
  resizeHeight="300"
}}
```

Or something like this:
```html
<WagtailImage
  @image={{wagtailImage}}
  alt="An old red barn."
  @resizeWidth="400"
  @resizeHeight="300"
/>
```

When your page is rendered it will appear like this:
```html
<img src="https://my-wagtail-instance.net/images/32/fill-400x300/" alt="An old red barn.">
```

There's also a helper if you only want a URL:
```hbs
<img src={{wagtail-image-url wagtailImage 400 300}} alt="An old red barn.">
```

[See the docs](./docs/docs.md) for more options and examples.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
