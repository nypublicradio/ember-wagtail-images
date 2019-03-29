import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import getWagtailUrl from '../utils/get-wagtail-url';

export function wagtailImageUrl([image, width, height, fit], {bgcolor, format, jpegquality}) {
  let resizeOptions = {width, height, fit}
  let extraOptions = {bgcolor, format, jpegquality}
  return getWagtailUrl(get(image, 'id'), resizeOptions, extraOptions);
}

export default helper(wagtailImageUrl);
