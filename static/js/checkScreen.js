function checkScreen() {

    // if the screen is not big enough
    if (screen.width < 1920) {

        // If the browser does not support the XMLHttpRequest object, do nothing.
        if (!window.XMLHttpRequest) {
            throw "window.XMLHttpRequest failed.  Call Patrick.";
            return;
        }

        // Encode the user input as query parameters in a URL.
        hostAndPort = location.host
        if (hostAndPort == '127.0.0.1:5000') {
            url = "http://" + hostAndPort + "/screen_too_small"
        }
        else {
            url = "https://" + hostAndPort + "/screen_too_small"
        }
        // Fetch the contents of that URL using the XMLHttpRequest object.
        var request = new XMLHttpRequest();

        if (!request) {
            throw "new XMLHttpRequest() returned null.  Call Patrick.";
            return
        }

        window.location = url
  
    }
}