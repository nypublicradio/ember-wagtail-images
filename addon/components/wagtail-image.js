import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import getWagtailUrl from '../utils/get-wagtail-url';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [
    'alt',
    'crossorigin',
    'draggable',
    'width',
    'height',
    'src',
    'srcset'
  ],
  originalHeight: reads('image.height'),
  originalWidth: reads('image.width'),
  wagtailId: reads('image.id'),
  src: computed('image', 'resizeWidth', 'resizeHeight', 'resizeFit', 'bgcolor', 'format', 'jpegqualitty', function() {
    const id = this.get('wagtailId');
    let resizeOptions = {
      width: this.get('resizeWidth'),
      height: this.get('resizeHeight'),
      fit: this.get('resizeFit'),
    };
    let extraOptions = {
      bgcolor: this.get('bgcolor'),
      format: this.get('format'),
      jpegquality: this.get('jpegquality'),
    };

    return getWagtailUrl(id, resizeOptions, extraOptions);
  }),
  srcset: computed('src', function() {
    const id = this.get('wagtailId');
    const originalWidth = Number(this.get('originalWidth'));
    const originalHeight = Number(this.get('originalHeight'));
    let resizeOptions = {
      width: this.get('resizeWidth'),
      height: this.get('resizeHeight'),
      fit: this.get('resizeFit'),
    };
    let extraOptions = {
      bgcolor: this.get('bgcolor'),
      format: this.get('format'),
      jpegquality: this.get('jpegquality'),
    };

    const getUrlforSize = function(w, h) {
      let resizedCropOptions = {
        width: w,
        height: h,
        fit: resizeOptions.fit
      }
      return getWagtailUrl(id, resizedCropOptions, extraOptions);
    };

    // start with default
    let srcsets = [getUrlforSize(resizeOptions.width, resizeOptions.height)];

    // add HD options
    const sizes = [1.5, 2, 3, 4];
    sizes.forEach(size => {
      let w = Math.floor(Number(resizeOptions.width) * size);
      let h = Math.floor(Number(resizeOptions.height) * size);
      if (w && w <= originalWidth && h && h <= originalHeight) {
        srcsets.push(`${getUrlforSize(w, h)} ${size}x`)
      }
    });
    if (srcsets.length > 1) {
      return srcsets.join(",");
    } else {
      return null;
    }
  }),
  init() {
    this._super(...arguments);
    let alt = this.get('image.alt');
    if (alt != null) {
      this.set('alt', alt);
    }
  },
});
