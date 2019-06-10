function selectAccount(action) 
{
    switch (action) 
    {
        case "select":
            st.value = "When clicking on a row in the Word Table, " +
                "the word is displayed in the Word Detail table, ready " +
                "ready for you to enter and check your definition.";
            break;
                
        case "check":
            st.value = "The first sentence of your definition is compared" +
                "compared to the first sentence of the actual definition.";
            break;
            
        case "show":
            st.value = "Stump?  The Show Button reveals the definition " +
                "and the example.";
            break;
            
        case "random":
            st.value = "A problem word will be selected.";
            break;
            
        case "clear":
            st.value = "The Word Detail fields are cleared for the " +
                "creation of a new word.";
            break;
            
        case "submit":
            st.value = "The word is saved to the table.";
            break;
            
        case "save":
            st.value = "The table is saved to a file.";
            break;
  
        default:
            st.value = "An unkown help topic was selected.";
    }
}