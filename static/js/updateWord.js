function updateWord()
{
    st.value = "Updating word.  Please wait."

    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "window.XMLHttpRequest failed.  Call Patrick."
        return
    }
    
    var wordSpelling = ws.value;

    if (!wordSpelling)
    {
        st.value = "Spelling is required."
        return
    }
    
    var wordDefinition = wd.value
      
    if (!wordDefinition)
    {
        st.value = "Definition is required."
        return
    }

    var wordGrammar = wg.value

    if (!wordGrammar)
    {
        st.value = "Grammar is required."
        return
    }
    
    var wordExample = we.value
    
    if (!wordExample)
    {
        st.value = "Example is required."
        return
    }
        
    if (isNaN(wa.value)) 
    {
        wordAttempts = 0
    }
    else
    {
        wordAttempts = parseInt(wa.value)
    }
    
    if (isNaN(wc.value)) 
    {
        wordCorrect = 0
    }
    else
    {
        wordCorrect = parseInt(wc.value)
    }
    
    if (isNaN(ww.value)) 
    {
        wordWrong = 0
    }
    else
    {
        wordWrong = parseInt(ww.value)
    }

    if (wordCorrect > wordAttempts) 
    {
        wordCorrect = wordAttempts
    }
   
    if (wordWrong > wordAttempts) 
    {
        wordWrong = wordAttempts
    }
   
    if ((wordCorrect + wordWrong) > wordAttempts) 
    {
        wordWrong = wordAttempts - wordCorrect
    }
   
    if (wordAttempts == 0) 
    {
        wordPercentage = 0.0
    }
    else
    {
        wordPercentage = ((wordCorrect * 100) / wordAttempts)
    }
    
    wp.value = wordPercentage
    
    // Build a dictionary for the word.
    word = {}
    word["wordSpelling"] = wordSpelling
    word["wordGrammar"] = wordGrammar
    word["wordDefinition"] = wordDefinition
    word["wordExample"] = wordExample
    word["wordAttempts"] = wordAttempts
    word["wordCorrect"] = wordCorrect
    word["wordWrong"] = wordWrong
    word["wordPercentage"] = wordPercentage

    // Serialize the dictionary into string to be transported.
    word = JSON.stringify(word)

    // Encode the user input as query parameters in a URL.
    hostAndPort = location.host
    if (hostAndPort == '127.0.0.1:5000')
    {
        url = "http://" + hostAndPort + "/update_word"
    }
    else
    {
        url = "https://" + hostAndPort + "/update_word"
    }  
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick."
        return
    }
    
    request.open("POST", url, true)
    
    request.setRequestHeader("content-type", "application/json")
    
    request.send(word)
    
    request.onreadystatechange = function ()
    {        
        if (request.readyState == XMLHttpRequest.DONE)
        {
            if (request.status == 200)
            {            
                st.value = 'Word was updated.'
            }
            else if (request.status == 404)
            {            
                st.value = 'Word was not found.'
            }
            else
            {
                st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status
            }
        }
        return
    }
}