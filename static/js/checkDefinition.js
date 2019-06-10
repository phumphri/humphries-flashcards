function checkDefinition()
{
    var wordDefinition = wd.value;
    var myDefinition = md.value;
    
    var wordAttempts = 0;
    var wordCorrect = 0;
    var wordWrong = 0;

    var indexOfPeriod = wordDefinition.indexOf(".");
    wordDefinition = wordDefinition.substr(1, indexOfPeriod);
    
    indexOfPeriod = myDefinition.indexOf(".");
    myDefinition = myDefinition.substr(1, indexOfPeriod);

    if (isNaN(wa.value))
    {
        wordAttempts = 0;
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
        wordWrong = parseInt(ww.value);
    }

    if (wordDefinition == myDefinition)
    {
        wordCorrect++
        wa.value = wordAttempts.toString();
        wc.value = wordCorrect.toString();
        ww.value = wordWrong.toString();    
        showWord()
        showDefinition()
        updateWord()
    }
    else
    {
        wordWrong++
        wa.value = wordAttempts.toString()
        wc.value = wordCorrect.toString()
        ww.value = wordWrong.toString()     
        updateWord()
    }
}