// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
    const xlsxInput = document.getElementById("xlsxInput");
    const columnNamesList = document.getElementById("columnNames");

    xlsxInput.addEventListener("change", function () {
        // Handle XLSX file upload
        const file = xlsxInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const arrayBuffer = e.target.result;
                const data = new Uint8Array(arrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Extract column names
                const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
                console.log(headers)

                displayColNames(headers);
                
            };
            reader.readAsArrayBuffer(file);
        }
    });

    function displayColNames(colHeaders) {
        // Display the column names in an unordered list
        columnNamesList.innerHTML = colHeaders.map(header => `<li>${header}</li>`).join("");
    }

});

