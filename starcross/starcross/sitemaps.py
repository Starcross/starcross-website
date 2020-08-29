from django.urls import reverse
from django.contrib.sitemaps import Sitemap
from blog.models import BlogEntry
from gallery.models import Album, Image
from goingout.models import Venue


class BlogEntrySitemap(Sitemap):

    def items(self):
        return BlogEntry.objects.all()

    def lastmod(self, item: BlogEntry):
        return item.date_published


class AlbumSitemap(Sitemap):

    def items(self):
        return Album.objects.all()


class ImageSitemap(Sitemap):

    def items(self):
        return Image.objects.all()


class GoingOutSitemap(Sitemap):

    def items(self):
        return Venue.objects.all()


class TemplateSitemap(Sitemap):
    priority = 0.75

    def items(self):
        return ['fractal.html', 'gameoflife.html', 'starfield.html']

    def location(self, item):
        return '/{}'.format(item)


class StaticSitemap(Sitemap):
    priority = 0.75

    def items(self):
        return ['blog:blogentry_list', 'gallery:album_list', 'gallery:image_list', 'goingout:venue_list']

    def location(self, item):
        return reverse(item)

