function getWord() {
    
    st.value = "Getting the word.  Please wait."

    l = sessionStorage.length

    if (l == 0) {
        st.value = "The word was not found."
        return
    }

    for (i = 0; i < l; i++) {
        key = 'word' + i.toString()
        item = sessionStorage.getItem(key)
        if (item != null) {
            word = JSON.parse(item)
            if (word["word_spelling"] == ws.value) {
                ws.value = word["word_spelling"]
                wd.value = word["word_definition"]
                wg.value = word["word_grammar"]
                we.value = word["word_example"]
                wa.value = word["word_attempts"]
                wc.value = word["word_correct"]
                ww.value = word["word_wrong"]
                wp.value = word["word_percentage"]
                ms.value = ''
                md.value = ''
                st.value = 'The word was found.'

                di.value = ''
                dc.value = ''
                    word_diagram = word["word_diagram"]
                for (i in word_diagram) {
                    di.value += word_diagram[i] + '\n'
                }
                drawDiagram()
                hideFields()
                return
            }
        }
    }
    wd.value = ''
    wg.value = ''
    we.value = ''
    wa.value = 0
    wc.value = 0
    ww.value = 0
    wp.value = 0.0
    ms.value = ''
    md.value = ''
    st.value = "The word was not found."
}