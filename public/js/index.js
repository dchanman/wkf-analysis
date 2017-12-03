(function () {
    "use strict";
    var playFile = function () {
        var file = this.files[0],
            fileURL = URL.createObjectURL(file);
        $("#videoplayer")[0].src = fileURL;
        console.log("Should be playing " + fileURL);
    };

    $("#input").on("change", playFile);

    // Controls
    var videoplayerdom = $("#videoplayer")[0];
    $("#controls-play").on("click", function () {
        if (videoplayerdom.paused) {
            videoplayerdom.play();
        } else {
            videoplayerdom.pause();
        }
    });

    $(document).ready(function () {
        console.log("Loaded");
    });
}());