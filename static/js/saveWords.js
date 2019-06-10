function selectNextKeyValue() 
{
    var hostAndPort = location.host;
    //
    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "This browser does not support AJAX.  Try another.";
        return;
    }
    //   
    //
    // Encode the user input as query parameters in a URL.
    var url = "http://" + hostAndPort + "/Transactions12/resources/transactions/nextKey";
    //
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return;
    }
    //
    request.onreadystatechange = function ()
    {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 404)
        {
            st.value = "Failed to get the next key value (404).  Bummer.";
            return;
        }
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
            var responseText = request.responseText;
            try 
            {
                var jsonObject = JSON.parse(responseText);
            }
            catch (e)
            {
                st.value = "JSON.parse(resonseText) threw an error:  " + e.toString();
                return;
            }
            
            tk.value = jsonObject.nextKey;

            return;
        }
        
        if (request.readyState == XMLHttpRequest.UNSENT)
        {
            return;
        }
        
        if (request.readyState == XMLHttpRequest.OPENED)
        {
            return;
        }
        
        if (request.readyState == XMLHttpRequest.HEADERS_RECEIVED)
        {
            return;
        }

        if (request.readyState == XMLHttpRequest.LOADING)
        {
            return;
        }
        st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status + ".  Call Patrick.";
        alert("Check Status");
    }
    request.open("GET", url, true);
    request.send(null);

}