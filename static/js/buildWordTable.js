function buildTransactionTable() 
{
    st.value = "Getting data.  Please wait.";
    
    // Encode the user input as query parameters in a URL.
    var url = "http://" + hostAndPort + "/first_word"


    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();

    // Check if the browser supports XMLHttpRequest
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return;
    }
    
    request.onreadystatechange = function ()
    {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 404)
        {
            st.value = "Word Selection Table failed (404).  Bummer.";
            return;
        }
        
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
            var responseText = request.responseText;
            
            try 
            {
                jsonArray = JSON.parse(responseText);
            }
            catch (e)
            {
                st.value = "JSON.parse(resonseText) threw an error:  " + e.toString();
                return;
            }

            wtd.style.height = ((screen.height) * 0.75) + "px";

            while (wt.hasChildNodes()) 
            {
                wt.removeChild(wt.lastChild);
            }

            var trHeadings = document.createElement("TR");
            
            var thKeyHeading = document.createElement("TH");
            var textNodeKeyHeading = document.createTextNode("Key");
            thKeyHeading.appendChild(textNodeKeyHeading);
            
            var thPostHeading = document.createElement("TH");
            var textNodePostHeading = document.createTextNode("Post");
            thPostHeading.appendChild(textNodePostHeading);
            
            var thCheckHeading = document.createElement("TH");
            var textNodeCheckHeading = document.createTextNode("Check");
            thCheckHeading.appendChild(textNodeCheckHeading);
            
            var thPayeeHeading = document.createElement("TH");
            var textNodePayeeHeading = document.createTextNode("Payee");
            thPayeeHeading.appendChild(textNodePayeeHeading);
            
            var thTypeHeading = document.createElement("TH");
            var textNodeTypeHeading = document.createTextNode("Type");
            thTypeHeading.appendChild(textNodeTypeHeading);
            
            var thAmountHeading = document.createElement("TH");
            var textNodeAmountHeading = document.createTextNode("Amount");
            thAmountHeading.appendChild(textNodeAmountHeading);
            
            var thBalanceHeading = document.createElement("TH");
            var textNodeBalanceHeading = document.createTextNode("Balance");
            thBalanceHeading.appendChild(textNodeBalanceHeading);
            
            trHeadings.appendChild(thKeyHeading);
            trHeadings.appendChild(thPostHeading);
            trHeadings.appendChild(thCheckHeading);
            trHeadings.appendChild(thPayeeHeading);
            trHeadings.appendChild(thTypeHeading);
            trHeadings.appendChild(thAmountHeading);
            trHeadings.appendChild(thBalanceHeading);
            
            tt.appendChild(trHeadings);

            var transactionKey = new Array();
            var postDate = new Array();
            var checkNumber = new Array();
            var payeeName = new Array();
            var typeCode = new Array();
            var transactionAmount = new Array();
            var transactionBalance = new Array();
            
            var trTag = new Array();
            
            var tdKey = new Array();
            var tnKey = new Array();
            
            var tdPost = new Array();
            var tnPost = new Array();
            
            var tdCheckNumber = new Array();
            var tnCheckNumber = new Array();
            
            var tdPayeeName = new Array();
            var tnPayeeName = new Array();

            var tdTypeCode = new Array();
            var tnTypeCode = new Array();

            var tdTransactionAmount = new Array();
            var tnTransactionAmount = new Array();

            var tdTransactionBalance = new Array();
            var tnTransactionBalance = new Array();

            for (i in jsonArray)
            {
                transactionKey[i] = jsonArray[i].transactionKey;

                var postDateLong = jsonArray[i].postDate;
                var postDateObject = new Date(postDateLong);
                var postDateString = postDateObject.toLocaleDateString();
                postDate[i] = postDateString
                
                checkNumber[i] = jsonArray[i].checkNumber;
                
                payeeName[i] = jsonArray[i].payeeName;
                
                typeCode[i] = jsonArray[i].typeCode;
                
                transactionAmount[i] = jsonArray[i].transactionAmount;
                transactionAmount[i] = transactionAmount[i].toLocaleString("en-US", { minimumFractionDigits: 2 });
                
                transactionBalance[i] = jsonArray[i].transactionBalance;
                transactionBalance[i] = transactionBalance[i].toLocaleString("en-US", { minimumFractionDigits: 2 });
                
                trTag[i] = document.createElement("TR");
            
                tdKey[i] = document.createElement("TD");
                tnKey[i] = document.createTextNode(transactionKey[i]);
                tdKey[i].appendChild(tnKey[i]);

                tdPost[i] = document.createElement("TD");
                tnPost[i] = document.createTextNode(postDate[i]);
                tdPost[i].appendChild(tnPost[i]);
            
                tdCheckNumber[i] = document.createElement("TD");
                tnCheckNumber[i] = document.createTextNode(checkNumber[i]);
                tdCheckNumber[i].appendChild(tnCheckNumber[i]);
            
                tdPayeeName[i] = document.createElement("TD");
                tnPayeeName[i] = document.createTextNode(payeeName[i]);
                tdPayeeName[i].appendChild(tnPayeeName[i]);
            
                tdTypeCode[i] = document.createElement("TD");
                tnTypeCode[i] = document.createTextNode(typeCode[i]);
                tdTypeCode[i].appendChild(tnTypeCode[i]);
                tdTypeCode[i].style.textAlign="center";
            
                tdTransactionAmount[i] = document.createElement("TD");
                tnTransactionAmount[i] = document.createTextNode(transactionAmount[i]);
                tdTransactionAmount[i].appendChild(tnTransactionAmount[i]);
                tdTransactionAmount[i].style.textAlign="right";
            
                tdTransactionBalance[i] = document.createElement("TD");
                tnTransactionBalance[i] = document.createTextNode(transactionBalance[i]);
                tdTransactionBalance[i].appendChild(tnTransactionBalance[i]);
                tdTransactionBalance[i].style.textAlign="right";
            
                trTag[i].appendChild(tdKey[i]);
                trTag[i].appendChild(tdPost[i]);
                trTag[i].appendChild(tdCheckNumber[i]);
                trTag[i].appendChild(tdPayeeName[i]);
                trTag[i].appendChild(tdTypeCode[i]);
                trTag[i].appendChild(tdTransactionAmount[i]);
                trTag[i].appendChild(tdTransactionBalance[i]);
                trTag[i].setAttribute("class", "zebra");
                trTag[i].setAttribute("onclick", "selectTransaction(" + transactionKey[i] + ")");
            
                tt.appendChild(trTag[i]);
            }
            st.value = "Ready";
            return;
        }
        if (request.readyState == XMLHttpRequest.UNSENT)
        {
            return;
        }
        if (request.readyState == XMLHttpRequest.OPENED)
        {
            return;
        }
        if (request.readyState == XMLHttpRequest.HEADERS_RECEIVED)
        {
            return;
        }
        if (request.readyState == XMLHttpRequest.LOADING)
        {
            return;
        }
        st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status + ".  Call Patrick.";
    }
    request.open("GET", url, true);
    
    request.send(null);
}