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
            videoplayerdom = videoplayer[0];
        $("#controls-play").on("click", function () {
            if (videoplayerdom.paused) {
                videoplayerdom.play();
            } else {
                videoplayerdom.pause();
            }
        });
        videoplayer.on("timeupdate", function () {
            var currentPosition = videoplayerdom.currentTime,
                maxTime = videoplayerdom.duration,
                percentage = currentPosition / maxTime * 100;
            console.log(percentage + "%");
            $(".controls-progressbar-progressbar-timebar").css("width", percentage + "%");
        });
    });
}());