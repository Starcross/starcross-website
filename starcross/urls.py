"""The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings
from django.views.static import serve
from starcross.views import StaticView, IndexView

urlpatterns = [
    path('', IndexView.as_view()),
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),
    path('gallery/', include('gallery.urls', namespace='gallery')),
    path('goingout/', include('goingout.urls', namespace='goingout')),
    path('tinymce/', include('tinymce.urls')),
    path('captcha/', include('captcha.urls')),
    path('<page_name>.html', StaticView.as_view())
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += [re_path(
        r'media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT})]
    urlpatterns += [re_path(
        r'static/(?P<path>.*)$', serve, {
        'document_root': settings.STATIC_ROOT})]
    # Debug toolbar
    import debug_toolbar
    urlpatterns += [
        re_path('^__debug__/', include(debug_toolbar.urls))
    ]

