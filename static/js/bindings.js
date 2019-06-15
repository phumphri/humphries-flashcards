function bindings() 
{
    hs = document.getElementById('hs')      /*  Hide Spelling   */
    hd = document.getElementById('hd')      /*  Hide Definition */

    ws = document.getElementById("ws")      /*  Word Spelling   */
    wd = document.getElementById("wd")      /*  Word Definition */
    wg = document.getElementById("wg")      /*  Word Grammar    */
    we = document.getElementById("we")      /*  Word Example    */

    ms = document.getElementById("ms")      /*  My Spelling     */
    md = document.getElementById("md")      /*  My Definition   */

    wa = document.getElementById("wa")      /*  Word Attempts   */
    wc = document.getElementById("wc")      /*  Word Correct    */
    ww = document.getElementById("ww")      /*  Word Wrong      */
    wp = document.getElementById("wp")      /*  Word Percentage */
    
    st = document.getElementById("st")      /*  Status Field    */

    aw = document.getElementById("aw")      /*  Add Word Button     */
    uw = document.getElementById("uw")      /*  Update Word Button  */
    dw = document.getElementById("dw")      /*  Delete Word Button  */
    cw = document.getElementById("cw")      /*  Clear Word Button   */

    sc = document.getElementById("sc")      /*  Selected Class   */
    sw = document.getElementById("sw")      /*  Selected Word   */

    di = document.getElementById("di")      /*  Drawing Instructions    */
    dc = document.getElementById("dc")      /*  Drawing Canvas          */

    dd = document.getElementById('dd')      /*  Diagram Draw Button     */
    cd = document.getElementById("cd")      /*  Clear Diagram Button    */

    /*  Hide maintenance components in the wild.    */
    hostAndPort = location.host;            
    if (hostAndPort == '127.0.0.1:5000')   
    {
        aw.className = "visible"            /*  Add Word Button     */
        dw.className = "visible"            /*  Delete Word Button  */
        cw.className = "visible"            /*  Clear Word Button   */
        ws.readOnly = false                 /*  Word Spelling Updateable    */
        wd.readOnly = false                 /*  Word Definition Updateable  */
        wg.readOnly = false                 /*  Word Grammar Updateable     */
        we.readOnly = false                 /*  Word Example Updateable     */
    }
    else
    {
        aw.className = "hidden"             /*  Add Word Button     */
        dw.className = "hidden"             /*  Delete Word Button  */
        cw.className = "hidden"             /*  Clear Word Button   */
        ws.readOnly = true                 /*  Word Spelling Read Only      */
        wd.readOnly = true                 /*  Word Definition Read Only    */
        wg.readOnly = true                 /*  Word Grammar Read Only       */
        we.readOnly = true                 /*  Word Example Read Only       */
    }
}