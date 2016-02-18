from django.conf.urls import patterns, include, url, static
from django.contrib import admin
from django.views.debug import default_urlconf
from django.conf import settings
from starcross.views import StaticView, IndexView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'starcross.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', IndexView.as_view()),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^blog/', include('blog.urls', namespace='blog')),
    url(r'^gallery/', include('gallery.urls', namespace='gallery')),
    url(r'^goingout/', include('goingout.urls', namespace='goingout')),
    url(r'^tinymce/', include('tinymce.urls')),
    url(r'^captcha/', include('captcha.urls')),
    url(r'^(?P<page_name>.+\.html)$',StaticView.as_view()),

)
if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
    urlpatterns += patterns('',
        (r'static/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.STATIC_ROOT}))

