(function () {
    "use strict";
    function initControls() {
        var videoplayer = $("#videoplayer"),
            videoplayerdom = videoplayer[0],
            progressbarDrag = false;
        function togglePlay() {
            if (videoplayerdom.paused) {
                videoplayerdom.play();
            } else {
                videoplayerdom.pause();
            }
        }
        $("#controls-play").on("click", togglePlay);
        videoplayer.on("click", togglePlay);
        videoplayer.on("pause", function () { $("#controls-play-icon").html("play_arrow"); });
        videoplayer.on("play", function () { $("#controls-play-icon").html("pause"); });
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
    }
    function initFileselect() {
        function playFile() {
            var file = this.files[0],
                fileURL = URL.createObjectURL(file);
            $("#videoplayer")[0].src = fileURL;
            $("#fileselect-input-label").html(this.files[0].name);
            $(".workspace").show();
        }
        // Redirect the button's click to the input
        $("#fileselect-input-button").on("click", function () {  $("#fileselect-input").click(); });
        $("#fileselect-input").on("change", playFile);
    }
    $(document).ready(function () {
        console.log("Ready");
        initControls();
        initFileselect();
    });
}());