function updateCounts()
{
    var wordAttempts = 0;
    var wordCorrect = 0;
    var wordWrong = 0;
    var wordPercentage = 0.0;

    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "window.XMLHttpRequest failed.  Call Patrick.";
        return;
    }
    
    var wordSpelling = ws.value;

    if (!wordSpelling)
    {
        st.value = "Spelling is required.";
        return;
    }
    
    var wordDefinition = wd.value;
      
    if (!wordDefinition)
    {
        st.value = "Definition is required.";
        return;
    }

    var wordGrammar = wg.value;

    if (!wordGrammar)
    {
        st.value = "Grammar is required.";
        return;
    }
    
    var wordExample = we.value;
    
    if (!wordExample)
    {
        st.value = "Example is required.";
        return;
    }
        
    if (isNaN(wa.value)) 
    {
        wordAttempts = 0;
    }
    else
    {
        wordAttempts = parseInt(wa.value);
    }
    
    if (isNaN(wc.value)) 
    {
        wordCorrect = 0;
    }
    else
    {
        wordCorrect = parseInt(wc.value);
    }
    
    if (isNaN(ww.value)) 
    {
        wordWrong = 0;
    }
    else
    {
        wordWrong = parseInt(ww.value);
    }

    if (wordCorrect > wordAttempts) 
    {
        wordCorrect = wordAttempts;
    }
   
    if (wordWrong > wordAttempts) 
    {
        wordWrong = wordAttempts;
    }
   
    if ((wordCorrect + wordWrong) > wordAttempts) 
    {
        wordWrong = wordAttempts - wordCorrect;
    }
   
    if (wordAttempts == 0) 
    {
        wordPercentage = 0.0;
    }
    else
    {
        wordPercentage = ((wordCorrect * 100) / wordAttempts);
    }
    
    wp.value = wordPercentage;
    
    word = {}
    word["wordSpelling"] = wordSpelling
    word["wordGrammar"] = wordGrammar
    word["wordDefinition"] = wordDefinition
    word["wordExample"] = wordExample
    word["wordAttempts"] = 0
    word["wordCorrect"] = 0
    word["wordWrong"] = 0
    word["wordPercentage"] = 0.0

    word_json = JSON.stringify(word)

    // Encode the user input as query parameters in a URL.
    var url = "http://" + hostAndPort + "/update_word";
  
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return;
    }
    
    request.open("POST", url, true);
    
    request.setRequestHeader("content-type", "application/json");
    
    request.send(word);   
    
    request.onreadystatechange = function ()
    {  
         if (request.readyState == 4 && request.status == 200)
        {
            st.value = st.value + "  Counts were updated.";
            return;
        }
        
        if (request.readyState == 4 && request.status != 200)
        {
            st.value = st.value + " Counts were not updated.  Status:  " + request.status + ".  Call Patrick";
            return;
        }
        
       if (request.readyState == 0)
        {
            return;
        }
        
        if (request.readyState == 1)
        {
            return;
        }
        
        if (request.readyState == 2)
        {
            return;
        }
        
        if (request.readyState == 3)
        {
            return;
        }
        
        st.value = st.value + "  Unsuccessful update of counts.";
    }  
}