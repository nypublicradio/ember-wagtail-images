import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | wagtail-image-url', function(hooks) {
  setupRenderingTest(hooks);
  test('it returns a url', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage}}`);

    assert.equal(this.element.textContent.trim(), '/5/original/');
  });

  test('it returns a url for a width', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage 500}}`);

    assert.equal(this.element.textContent.trim(), '/5/width-500/');
  });

  test('it returns a url for a height', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage null 500}}`);

    assert.equal(this.element.textContent.trim(), '/5/height-500/');
  });

  test('it returns a url for a width and a height', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage 500 500}}`);

    assert.equal(this.element.textContent.trim(), '/5/fill-500x500/');
  });

  test('it returns a url for fit=cover', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage 500 500 'cover'}}`);

    assert.equal(this.element.textContent.trim(), '/5/min-500x500/');
  });

  test('it returns a url for fit=contain', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage 500 500 'contain'}}`);

    assert.equal(this.element.textContent.trim(), '/5/max-500x500/');
  });

  test('it returns a url with many options', async function(assert) {
    this.set('wagtailImage', {id: 5});

    await render(hbs`{{wagtail-image-url wagtailImage 500 600 "contain"
      bgcolor="eeeeee"
      format="jpeg"
      jpegquality="70"}}`);

    assert.equal(this.element.textContent.trim(), '/5/max-500x600|bgcolor-eeeeee|format-jpeg|jpegquality-70/');
  });
});
