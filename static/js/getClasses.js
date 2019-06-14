function getClasses()
{
    hideFields()

    st.value = "Getting classes  Please wait."; 

    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "window.XMLHttpRequest failed.  Call Patrick."
        return
    }
        
    // Encode the user input as query parameters in a URL.
    hostAndPort = location.host            /*  Host server and port.   */
    if (hostAndPort == '127.0.0.1:5000')
    {
        url = "http://" + hostAndPort + "/get_classes"
    }
    else
    {
        url = "https://" + hostAndPort + "/get_classes"
    }    
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest()
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick."
        return
    }
    
    request.onreadystatechange = function ()
    {
        if (request.readyState == XMLHttpRequest.DONE)
        {
            if (request.status == 200)
            {
                responseText = request.responseText  
                o = JSON.parse(responseText)
                classes = o["classes"]
                for (i = 0; i < o.classes.length; i++) {
                    s = o.classes[i]
                    option = document.createElement("option")
                    option.text = s
                    option.value = s
                    sc.add(option)
                }    
                st.value = 'Select class.'
            }
            else if (request.status = 404)
            {
                st.value = "Classes were not found." 
            }
            else
            {
                st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status  + ".  Call Patrick."
            }
        }           
        return
    }
    request.open("GET", url, true)
    
    request.send(null)
}