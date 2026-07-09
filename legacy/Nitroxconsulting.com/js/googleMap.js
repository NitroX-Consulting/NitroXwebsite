$(window).load(function () {
    var mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46221.28183669587!2d3.8390562751376973!3d43.610078725665545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0725dd9db1%3A0xad8756742894e802!2sMontpellier!5e0!3m2!1sfr!2sfr!4v1548775226038;output=embed",
        onLoadWebSite = false,
        googleMapHolder = $(".google_map"),
        backgroundColor = googleMapHolder.css("backgroundColor"),
        mapWidth = googleMapHolder.css("width"),
        mapHeight = googleMapHolder.css("height"),
        borderTopLeftRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderTopRightRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderBottomLeftRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderBottomRightRadius = googleMapHolder.css("borderTopLeftRadius"),
        addMap = false,
        idPage,
        intervalCall;

    if (backgroundColor == "rgba(0, 0, 0, 0)") {
        backgroundColor = "#ffffff";
    }
    verificationPageHandler();
    if (onLoadWebSite == false) {
        $(window).bind("hashchange", verificationPageHandler);
    }
    function verificationPageHandler() {
        if (onLoadWebSite == false) {
            idPage = "#" + window.location.hash.substring(3, window.location.hash.length);
            if (idPage != "#") {
                if (googleMapHolder.parents(idPage).length != 0) {
                    addGoogleMapHandler();

                }
            }
        } else {
            addGoogleMapHandler();
        }
    }
    function addGoogleMapHandler() {
        if (!addMap) {
            addMap = true;
            $(window).unbind("hashchange", verificationPageHandler);
            googleMapHolder.css({ "overflow": "hidden" });
            googleMapHolder.append("<div id='loaderPart' style='position:absolute; z-index:1; width:" + mapWidth + "; height:" + mapHeight + "; background:" + backgroundColor + " url(images/googleMapLoader.gif) no-repeat 50%; border-top-left-radius:" + borderTopLeftRadius + "; border-top-right-radius:" + borderTopRightRadius + "; border-bottom-right-radius:" + borderBottomLeftRadius + "; border-bottom-left-radius:" + borderBottomRightRadius + ";'></div>");
            intervalCall = setInterval(addIframe, 200)
        }
        function addIframe() {
            if ($(idPage).css("display") != "none") {
                clearInterval(intervalCall);
                googleMapHolder.append("<iframe width='" + mapWidth + "' height='" + mapHeight + "' frameborder='0' src='" + mapUrl + "' style='position:absolute; z-index:0; border-top-left-radius:" + borderTopLeftRadius + "; border-top-right-radius:" + borderTopRightRadius + "; border-bottom-right-radius:" + borderBottomLeftRadius + "; border-bottom-left-radius:" + borderBottomRightRadius + ";'></iframe>");
                googleMapHolder.find("iframe").load(googleMapLoadCompleteHandler);
            }
        }
    }
    function googleMapLoadCompleteHandler() {
        var loaderPart = googleMapHolder.find("#loaderPart");
        loaderPart.delay(100).fadeOut(500, function () { loaderPart.css({ "display": "none" }); });
    }
})