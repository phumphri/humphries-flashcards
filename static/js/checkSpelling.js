function checkSpelling()
{
    wordSpelling = ws.value
    mySpelling = ms.value
    
    wordAttempts = 0
    wordCorrect = 0
    wordWrong = 0
    wordPercentage = 0.0

    if (isNaN(wa.value)) 
    {
        wordAttempts = 1;
    }
    else
    {
        wordAttempts = parseInt(wa.value);
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
        wordWrong = parseInt(ww.value);
    }

    console.log(' ')
    if (wordSpelling == mySpelling) 
    {
        wordCorrect++
        wordPercentage = Math.floor(((wordCorrect * 100) / wordAttempts))
        wa.value = wordAttempts.toString()
        wc.value = wordCorrect.toString()
        ww.value = wordWrong.toString()
        wp.value = wordPercentage.toString()   
        showWord()
        showDefinition()
        showCanvas()
        uploadWord()
        st.value = "Correct!  "
    }
    else
    {
        wordWrong++;  
        wordPercentage = Math.floor(((wordCorrect * 100) / wordAttempts))
        wa.value = wordAttempts.toString();
        wc.value = wordCorrect.toString();
        ww.value = wordWrong.toString();     
        wp.value = wordPercentage.toString()   
        uploadWord()
        st.value = "Wrong.  "
    }

}