function getWeeks()
{
    class_code = sc.value
    if (class_code == null)
    {
        return
    }
    if (class_code.length == 0)
    {
        return
    }

    st.value = "Getting weeks.  Please wait."; 

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
        url = "http://" + hostAndPort + "/get_weeks/" + class_code
    }
    else
    {
        url = "https://" + hostAndPort + "/get_weeks/" + class_code
    }    
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest()
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick."
        return
    }
    
    request.open("GET", url, true)
    
    request.send(null)

    request.onreadystatechange = function ()
    {
        if (request.readyState == XMLHttpRequest.DONE)
        {
            if (request.status == 200)
            {
                while (sw.length > 0)
                    sw.remove(0)


                responseText = request.responseText  
                o = JSON.parse(responseText)
                weeks = o["weeks"]
                for (i = 0; i < o.weeks.length; i++) {
                    s = o.weeks[i]
                    option = document.createElement("option")
                    option.text = s
                    option.value = s
                    sw.add(option)
                }
                st.value = 'Select week.'
            }
            else if (request.status = 404)
            {
                st.value = "Weeks were not found." 
            }
            else
            {
                st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status  + ".  Call Patrick."
            }
        }           
        return
    }
}