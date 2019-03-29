import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const wagtailImage10 = {
    "id": 10,
    "width": 1920,
    "height": 1080,
}

const wagtailImage20 = {
    "id": 20,
    "width": 1280,
    "height": 720,
    "alt": "A puppy with it's tongue hanging out."
}

const wagtailImage30 = {
    "id": 30,
    "width": 50,
    "height": 90,
    "alt": ""
}

module('Integration | Component | wagtail-image', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.tagName, "IMG");
    assert.equal(img.getAttribute('alt'), "A pigeon perching on a newsstand.");
    assert.equal(img.getAttribute('src'), `/10/original/`);
  });

  test('it renders with blank alt text', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt=""
      image=wagtailImage
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.tagName, "IMG");
    assert.strictEqual(img.getAttribute('alt'), "");
    assert.equal(img.getAttribute('src'), `/10/original/`);
  });

  test('it reads alt text on the image object', async function(assert) {
    this.set('wagtailImage', wagtailImage20);
    await render(hbs`{{wagtail-image
      image=wagtailImage
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('alt'), wagtailImage20.alt);

    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
    }}`);
    assert.equal(img.getAttribute('alt'), wagtailImage20.alt);
  });

  test('it reads blank alt text on the image object', async function(assert) {
    this.set('wagtailImage', wagtailImage30);
    await render(hbs`{{wagtail-image
      image=wagtailImage
    }}`);
    const img = this.element.querySelector('img');

    assert.strictEqual(img.getAttribute('alt'), "");

    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
    }}`);
    assert.strictEqual(img.getAttribute('alt'), "");
  });

  test("it doesn`t create it's own blank alt text", async function(assert) {
    // missing alt text is bad
    // but an error that can be detected and manually fixed
    // is preferable to any bad automatic fix that hides the error
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`<WagtailImage
      @image=wagtailImage
    />`);
    const img = this.element.querySelector('img');

    assert.notOk(img.hasAttribute('alt'));
  });


  test('it renders an image tag with dimensions', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      resizeWidth="640"
      resizeHeight="480"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/fill-640x480/`);
  });

  test('it renders an image tag with "fill" resize fitting', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`<WagtailImage
      alt="A pigeon perching on a newsstand."
      @image={{wagtailImage}}
      @resizeWidth="640"
      @resizeHeight="480"
      @resizeFit="fill"
    />`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/fill-640x480/`);
  });

  test('it renders an image tag with "contain" resize fitting', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      resizeWidth="640"
      resizeHeight="480"
      resizeFit="contain"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/max-640x480/`);
  });

  test('it renders an image tag with "cover" resize fitting', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      resizeWidth="640"
      resizeHeight="480"
      resizeFit="cover"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/min-640x480/`);
  });

  test('it renders an image tag with only width', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      resizeWidth="640"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/width-640/`);
  });

  test('it renders an image tag with only height', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      resizeHeight="480"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/height-480/`);
  });
  test('it renders an image tag with format option', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      format="png"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/original|format-png/`);
  });
  test('it renders an image tag with bgcolor option', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      image=wagtailImage
      bgcolor="eeeeee"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/original|bgcolor-eeeeee/`);
  });
  test('it renders an image tag with many options', async function(assert) {
    this.set('wagtailImage', wagtailImage10);
    await render(hbs`{{wagtail-image
      alt="A pigeon perching on a newsstand."
      resizeWidth="640"
      image=wagtailImage
      bgcolor="eeeeee"
      format="jpeg"
      jpegquality="70"
    }}`);
    const img = this.element.querySelector('img');

    assert.equal(img.getAttribute('src'), `/10/width-640|bgcolor-eeeeee|format-jpeg|jpegquality-70/`);
  });
});

