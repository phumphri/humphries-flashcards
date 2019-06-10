function hideFields() {
    // Hide Definition
    if (hd.checked) {
        hideDefinition()
        showWord()
        di.className = "hidden"     /*  Drawing Instructions    */
        dc.className = "hidden"     /*  Drawing Canvas          */
        return
    }

    // Hide Spelling
    if (hs.checked) {
        showDefinition()
        hideWord()
        di.className = "hidden"     /*  Drawing Instructions    */
        dc.className = "hidden"     /*  Drawing Canvas          */
        return
    }

    // Show all fields
    if (hn.checked) {
        showWord()
        showDefinition()
        di.className = "visible"    /*  Drawing Instructions    */
        dc.className = "visible"    /*  Drawing Canvas          */    
        return
    }
}