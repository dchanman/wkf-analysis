(function () {
    "use strict";
    var playFile = function () {
        var file = this.files[0],
            fileURL = URL.createObjectURL(file);
        $("#videoplayer")[0].src = fileURL;
        console.log("Should be playing " + fileURL);
    };

    $("#input").on("change", playFile);

    $(document).ready(function () {
        console.log("Ready");
        // Controls
        var videoplayer = $("#videoplayer"),
            videoplayerdom = videoplayer[0],
            progressbarDrag = false;
        $("#controls-play").on("click", function () {
            if (videoplayerdom.paused) {
                videoplayerdom.play();
            } else {
                videoplayerdom.pause();
            }
        });
        function updateTimebarPosition(percentage) {
            $(".controls-progressbar-progressbar-timebar").css("width", percentage + "%");
        }
        function setVideoplayerPosition(e) {
            var progressbar = $(".controls-progressbar-progressbar"),
                maxTime = videoplayerdom.duration,
                position = e.pageX - progressbar.offset().left,
                percentage = position / progressbar.width() * 100;
            percentage = percentage > 100 ? 100 : percentage;
            percentage = percentage < 0 ? 0 : percentage;
            videoplayerdom.currentTime = maxTime * percentage / 100;
            updateTimebarPosition(percentage);
        }
        $(".controls-progressbar-progressbar").on("mousedown", function (e) {
            progressbarDrag = true;
            setVideoplayerPosition(e);
        });
        $(document).on("mouseup", function (e) {
            if (progressbarDrag) {
                progressbarDrag = false;
                setVideoplayerPosition(e);
            }
        });
        $(document).on("mousemove", function (e) {
            if (progressbarDrag) {
                setVideoplayerPosition(e);
            }
        });
        videoplayer.on("timeupdate", function () {
            var currentPosition = videoplayerdom.currentTime,
                maxTime = videoplayerdom.duration,
                percentage = currentPosition / maxTime * 100;
            console.log(percentage + "%");
            updateTimebarPosition(percentage);
        });
    });
}());