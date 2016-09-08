This script allows you to Embed Youtube and Vimeo thumbs, and when click on element ,
it put Video in `<iframe>` tag
#### Instalation

```sh
$ npm i
```
```sh
$ bower install
```
For dev release:
```sh
$ gulp && gulp watch
```
For production release:
```sh
$ gulp --production
```
### Examples

See in example folder

https://k-zakhariy.github.io/embed-video/examples/

### Usage

```html
<div class="VideoEmbed" data-url="https://www.youtube.com/watch?v=6FeJySGOqhA"></div>
<div class="VideoEmbed" data-url="https://www.youtube.com/watch?v=owLDqhB90gk"></div>
<div class="VideoEmbed" data-url="https://vimeo.com/181553695"></div>
```
``` js
$('.VideoEmbed').each(function (i, el) {
    var obj = new VideoEmbed($(this));
});
```

Then you will see `thumbnails`
