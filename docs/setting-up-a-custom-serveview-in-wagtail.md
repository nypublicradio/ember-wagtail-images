# Setting up a custom ServeView in Wagtail

Wagtail provides a `ServeView` for using images in external applications (like an Ember web client), but by default this view requires a security signature as a parameter to mitigate the possibilty of a image resizer url based (D)DoS attack.

To use the urls provided by this addon you'll need to add an open image serve view to your Wagtail site that doesn't require this security signature. It's up to you and your WebOps team to decide whether or not you're comfortable with this.

The following example is based on https://github.com/wagtail/wagtail/blob/master/wagtail/images/views/serve.py

```py
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from wagtail.images.exceptions import InvalidFilterSpecError
from wagtail.images.models import SourceImageIOError
from wagtail.images.views.serve import ServeView


class OpenServeView(ServeView):
    def get(self, request, image_id, filter_spec):
        image = get_object_or_404(self.model, id=image_id)

        # Get/generate the rendition
        try:
            rendition = image.get_rendition(filter_spec)
        except SourceImageIOError:
            return HttpResponse("Source image file not found", content_type='text/plain', status=410)
        except InvalidFilterSpecError:
            return HttpResponse("Invalid filter spec: " + filter_spec, content_type='text/plain', status=400)

        return getattr(self, self.action)(rendition)
```

Once your view is created you'll need to add the view to your `urlpatterns`.

This example is based on https://docs.wagtail.io/en/v2.4/advanced_topics/images/image_serve_view.html

Note that the url regex here is slightly different from the linked example due to the absence of the security signature.

```py
from my.images.views.serve import PublicServeView

urlpatterns = [
    ...

    url(r'^images/(\d*)/([^/]*)/[^/]*$', PublicServeView.as_view(), name='wagtailimages_serve'),
```
