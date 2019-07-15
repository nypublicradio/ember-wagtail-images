import config from 'ember-get-config';
import { get } from '@ember/object';

const getResizeRule = function(w, h, fit) {
  if (w != null && h == null) {
    return `width-${w}`
  }
  if (h != null && w == null) {
    return `height-${h}`
  }
  if (w != null && h != null) {
    switch(fit) {
      case 'cover':
        return `min-${w}x${h}`
      case 'contain':
        return `max-${w}x${h}`
      case 'fill':
      default:
        return `fill-${w}x${h}`
    }
  }
  return 'original';
}

const getOptionsString = function(options) {
  return Object.keys(options).reduce(
    function(optionString, key) {
      const value = options[key];
      if (value) {
        return optionString += `|${key}-${value}`;
      } else {
        return optionString;
      }
    }, ""
  );
};

export default function getWagtailUrl(id, resizeOptions = {}, extraOptions = {}) {
  const resizeRule = getResizeRule(resizeOptions.width, resizeOptions.height, resizeOptions.fit);
  const optionString = getOptionsString(extraOptions);
  const path = get(config, 'APP.wagtailImages.imagePath') || ""

  return (`${path}/${id}/${resizeRule}${optionString}/`);
}
