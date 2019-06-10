function checkSpelling()
{
    var wordSpelling = ws.value;
    var mySpelling = ms.value;
    
    var wordAttempts = 0;
    var wordCorrect = 0;
    var wordWrong = 0;

    if (isNaN(wa.value)) 
    {
        wordAttempts = 0;
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

    if (wordSpelling == mySpelling) 
    {
        wordCorrect++
        wa.value = wordAttempts.toString();
        wc.value = wordCorrect.toString();
        ww.value = wordWrong.toString();    
        showWord()
        showDefinition()
        updateWord()
        st.value = "Correct!  "

    }
    else
    {
        wordWrong++;  
        wa.value = wordAttempts.toString();
        wc.value = wordCorrect.toString();
        ww.value = wordWrong.toString();     
        updateWord()
        st.value = "Wrong.  "
    }

}