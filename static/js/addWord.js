function addWord()
{
    wa.value = "0";
    wc.value = "0";
    ww.value = "0";
    wp.value = "0.0";

    st.value = "Adding word.  Please wait."; 

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

    class_code = sc.value

    week = sw.value

    // Create the word dictionary.
    word = {}
    word["word_spelling"] = wordSpelling
    word["word_grammar"] = wordGrammar
    word["word_definition"] = wordDefinition
    word["word_example"] = wordExample
    word["word_attempts"] = wa.value
    word["word_correct"] = wc.value
    word["word_wrong"] = ww.value
    word["word_percentage"] = wp.value

    
    word_diagram = []
    
    drawing_objects = di.value.split('\n')

    for (i in drawing_objects)
    {
        word_diagram.push(drawing_objects[i])
    }

    word["word_diagram"] = word_diagram

    // Convert the word from a dictionary to a JSON string.
    word = JSON.stringify(word)
    
    // Encode the user input as query parameters in a URL.
    hostAndPort = location.host; 
    if (hostAndPort == '127.0.0.1:5000')
    {
        url = "http://" + hostAndPort + "/add_word/" + class_code + "/" + week
    }
    else
    {
        url = "https://" + hostAndPort + "/add_word/" + class_code + "/" + week
    }    
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return;
    }
    
    request.open("POST", url, true);
    
    request.setRequestHeader("content-type", "application/json");
    
    request.send(word)
    
    request.onreadystatechange = function ()
    {        
        if (request.readyState == XMLHttpRequest.DONE)
        {
            if (request.status == 200)
            {            
                st.value = 'Word was added.'
                getWords()
            }
            else if (request.status == 404)
            {            
                st.value = 'Word was not found.'
            }
            else
            {
                st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status;
            }
        }
        return
    }
}