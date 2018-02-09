from django.views.generic import TemplateView
from django.template import TemplateDoesNotExist
from django.http import Http404
from blog.views import BlogEntryList


class IndexView(BlogEntryList):
    template_name = 'index.html'


class StaticView(TemplateView):
    def get(self, request, page_name, *args, **kwargs):
        self.template_name = "{0}.html".format(page_name)
        response = super(StaticView, self).get(request, *args, **kwargs)
        try:
            return response.render()
        except TemplateDoesNotExist:
            raise Http404()
