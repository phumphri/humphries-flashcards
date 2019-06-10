function balanceTransactions()
{
    var hostAndPort = location.host;
    //
    st.value = "Balnacing transactions.  Please wait.";
    //
    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "This browser does not support AJAX.  Try another.";
        return;
    }
    //
    // Encode the user input as query parameters in a URL.
    var url = "http://" + hostAndPort + "/Transactions12/resources/transactions/balance";
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
            st.value = "Could not find \"balance\".  Bummer.";
            return;
        }
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
            buildTransactionTable();
            return;
        }
        //
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
    }
    request.open("GET", url, true);
    request.send(null);
}