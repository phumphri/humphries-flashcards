function oops()
{
    st.value = "404 Test.  Please wait."

    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "window.XMLHttpRequest failed.  Call Patrick."
        return
    }
    
    // Encode the user input as query parameters in a URL.
    hostAndPort = location.host
    if (hostAndPort == '127.0.0.1:5000')
    {
        url = "http://" + hostAndPort + "/oops"
    }
    else
    {
        url = "https://" + hostAndPort + "/oops"
    }    
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick."
        return
    }
    
    request.open("GET", url, true)
    
    request.send(null)
}