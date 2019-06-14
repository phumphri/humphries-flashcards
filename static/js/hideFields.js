function hideFields() {
    // Hide Definition
    if (hd.checked) {
        hideDefinition()
        showWord()
        hideCanvas()
        return
    }

    // Hide Spelling
    if (hs.checked) {
        showDefinition()
        hideWord()
        hideCanvas()
        return
    }

    // Show all fields
    if (hn.checked) {
        showWord()
        showDefinition()
        showCanvas()
        return
    }
}