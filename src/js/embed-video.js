var VideoEmbed = (function () {
    var thumbsHandlers = {
        youtube: function (vid) {
            var d = $.Deferred();
            d.resolve('http://img.youtube.com/vi/' + vid + '/hqdefault.jpg');
            return d.promise();
        },
        vimeo: function (vid) {
            var d = $.Deferred();
            $.getJSON('http://www.vimeo.com/api/v2/video/' + vid + '.json?callback=?', {format: "json"}, function (data) {

                if (!data && !data.length) {
                    d.reject();
                } else {

                    d.resolve(data[0].thumbnail_large);
                }
                //featuredImg = data[0].thumbnail_large;
                //$('#thumbImg').attr("src", featuredImg);
                console.log(data);
            });
            return d.promise();
        }

    }
    var VideoEmbed = function (element) {
        var self = this;
        this.media = {};
        this.element = $(element);
        this.element.wrap('<div class="blog_post__video"></div>');

        self.convertMedia(this.element.data('url'));
        self.insertThumbs();
        this.element.bind('click', function (e) {
            e.preventDefault();
            self.runVideo();
        })
    };
    VideoEmbed.prototype.runVideo = function () {
        var videoObject;
        if (videoObject = this.getMedia()) {
            this.element.addClass('hidden');
            // self.element.after()
            var iframe;
            switch (videoObject.provider) {
                case "youtube":
                    iframe = '<iframe width="420" height="345" src="https://www.youtube.com/embed/' + videoObject.videoId + '?rel=0&controls=1&showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
                    break;

                case 'vimeo':
                    iframe = '<iframe width="420" height="345" src="//player.vimeo.com/video/' + videoObject.videoId + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                    break;
            }
            if (iframe) {
                this.element.after(iframe);
            }
        }
    };
    VideoEmbed.prototype.getMedia = function () {
        return this.media;
    };
    VideoEmbed.prototype.insertThumbs = function () {
        var videoObj = this.getMedia();
        var self = this;
        if (videoObj && thumbsHandlers.hasOwnProperty(videoObj.provider)) {
            thumbsHandlers[videoObj.provider](videoObj.videoId).then(function (r) {
                self.element.html('<img src="' + r + '" >');
            });
        }
    };
    VideoEmbed.prototype.convertMedia = function (url) {
        var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
        var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
        if (pattern1.test(url)) {
            this.media = {
                provider: 'vimeo',
                videoId: url.replace(pattern1, '$1')
            }
        }
        if (pattern2.test(url)) {
            this.media = {
                provider: 'youtube',
                videoId: url.replace(pattern2, '$1')
            }
        }
    };
    return VideoEmbed;
})();