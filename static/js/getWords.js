function getWords() {

    st.value = "Getting word.  Please wait.";

    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest) {
        st.value = "window.XMLHttpRequest failed.  Call Patrick.";
        return;
    }

    // Encode the user input as query parameters in a URL.
    hostAndPort = location.host
    if (hostAndPort == '127.0.0.1:5000') {
        url = "http://" + hostAndPort + "/get_words/" + sc.value + "/" + sw.value
    }
    else {
        url = "https://" + hostAndPort + "/get_words/" + sc.value + "/" + sw.value
    }

    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();

    if (!request) {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return
    }

    request.open("GET", url, true)

    request.send(null)

    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {

                // Clear session Storage.
                for (i = 0; i < sessionStorage.length; i++) {
                    key = 'word' + i.toString()
                    sessionStorage.removeItem(key)
                }

                // Parse the response string into a JSON object (associative array).
                responseText = request.responseText
                words = JSON.parse(responseText)

                // The "words" attribute has an array of "word" JSON objects.
                words = words["words"]

                st.value = "Words were found.  Screen width:" + screen.width

                // Populate Session Storage with word JSON objects.
                for (i in words) {
                    word = words[i]
                    key = 'word' + i.toString()
                    item = JSON.stringify(word)
                    sessionStorage.setItem(key, item)
                }
            }
            else if (request.status == 404) {
                st.value = "Words were not found"
            }
            else {
                st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status + ".  Call Patrick."
            }
        }
        hideFields()
        return
    }
}