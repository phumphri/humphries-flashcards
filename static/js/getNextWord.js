function getNextWord() {

    st.value = "Getting next word.  Please wait."

    l = sessionStorage.length

    if (l == 0) {
        st.value = "Next word was not found."
        return
    }

    for (i = 0; i < l; i++) {
        key = 'word' + i.toString()
        item = sessionStorage.getItem(key)
        if (item != null) {
            word = JSON.parse(item)
            if (word["word_spelling"] == ws.value) {
                // Check for the end of data.
                if (i < l - 1) {
                    i += 1
                    st.value = "Next word was found."
                } else {
                    st.value = "At the last word."
                }
                key = 'word' + i.toString()
                item = sessionStorage.getItem(key)
                word = JSON.parse(item)
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

                di.value = ''
                dc.value = ''
                word_diagram = word["word_diagram"]
                for (i in word_diagram) {
                    di.value += word_diagram[i] + '\n'
                }
                drawDiagram()
                break
            }
        }
    }
    hideFields()
}


