function checkDefinition()
{
    wordDefinition = wd.value
    myDefinition = md.value
    
    wordAttempts = 0
    wordCorrect = 0
    wordWrong = 0
    wordPercentage = 0.0

    indexOfPeriod = wordDefinition.indexOf(".")
    wordDefinition = wordDefinition.substr(1, indexOfPeriod)
    
    indexOfPeriod = myDefinition.indexOf(".")
    myDefinition = myDefinition.substr(1, indexOfPeriod)

    if (isNaN(wa.value))
    {
        wordAttempts = 1;
    }
    else 
    {
        try 
        {
            wordAttempts = parseInt(wa.value);
        }
        catch (e)
        {
            alert(e.toString())
        }
        wordAttempts++;
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
        wordWrong = parseInt(ww.value)
    }

    if (wordDefinition == myDefinition)
    {
        wordCorrect++
        wordPercentage = Math.floor(((wordCorrect * 100) / wordAttempts))
        wa.value = wordAttempts.toString();
        wc.value = wordCorrect.toString();
        ww.value = wordWrong.toString();    
        wp.value = wordPercentage.toString()   
        uploadWord()
        showWord()
        showDefinition()
        showCanvas()
        st.value = "Correct!  "
    }
    else
    {
        wordWrong++
        wordPercentage = Math.floor(((wordCorrect * 100) / wordAttempts))
        wa.value = wordAttempts.toString()
        wc.value = wordCorrect.toString()
        ww.value = wordWrong.toString()     
        wp.value = wordPercentage.toString()   
        uploadWord()
        st.value = "Wrong.  "
    }
}