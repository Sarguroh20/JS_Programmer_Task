document.addEventListener('DOMContentLoaded', ()=>{
    fetch("data.json")

        .then(response => response.json())

        .then(function (data) {
            let tableRows = document.getElementById('tableRows')
            let form = document.getElementById('mymodal')
            let idInput = document.getElementById('idInput')
            let nameInput = document.getElementById('nameInput')
            let vendorInput = document.getElementById('vendorInput')
            let densityInput = document.getElementById('densityInput')
            let viscosityInput = document.getElementById('viscosityInput')
            let packagingInput = document.getElementById('packagingInput')
            let packSizeInput = document.getElementById('packSizeInput')
            let unitInput = document.getElementById('unitInput')
            let quantityInput = document.getElementById('quantityInput')
            // const rows = document.querySelectorAll("#tableRows tr")
            const moveUpButton = document.getElementById("moveUp")
            const moveDownButton = document.getElementById("moveDown")
            const deleteButton = document.getElementById('deleteRow')
            
            if (!localStorage.getItem("fetchedData")) {
                localStorage.setItem("fetchedData", JSON.stringify(data));
            }
            let fetchedData = JSON.parse(localStorage.getItem('fetchedData')) || [];
            let userData = JSON.parse(localStorage.getItem('userData')) || [];

            let displayData = () => {
                tableRows.innerHTML = "";

            // for(let i = 0; i < data.length; i++) {
            //     const rowData = `<tr>
            //     <td><input type="checkbox" class="rowCheckbox"></td>
            //     <td>${data[i].id}</td>
            //     <td>${data[i].Chemical_name}</td>
            //     <td>${data[i].Vendor}</td>
            //     <td>${data[i].Density}</td>
            //     <td>${data[i].Viscosity}</td>
            //     <td>${data[i].Packaging}</td>
            //     <td>${data[i].Pack_size}</td>
            //     <td>${data[i].Unit}</td>
            //     <td>${data[i].Quantity}</td>
            //     </tr>`;
            //     tableRows.innerHTML += rowData;
            // }            

                fetchedData.forEach((item, index) => {
                    const rowData = `<tr>
                        <td><input type="checkbox" class="rowCheckbox"></td>
                        <td>${item.id}</td>
                        <td>${item.Chemical_name}</td>
                        <td>${item.Vendor}</td>
                        <td>${item.Density}</td>
                        <td>${item.Viscosity}</td>
                        <td>${item.Packaging}</td>
                        <td>${item.Pack_size}</td>
                        <td>${item.Unit}</td>
                        <td>${item.Quantity}</td>
                    </tr>`;
                    tableRows.innerHTML += rowData;
                });            

                userData.forEach((item, index) => {
                    const rowData = `<tr>
                        <td><input type="checkbox" class="rowCheckbox"></td>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.vendor}</td>
                        <td>${item.density}</td>
                        <td>${item.viscosity}</td>
                        <td>${item.packaging}</td>
                        <td>${item.size}</td>
                        <td>${item.unit}</td>
                        <td>${item.quantity}</td>
                    </tr>`;
                    tableRows.innerHTML += rowData;
                });
            }

            displayData();

            tableRows.addEventListener('click', function (e) {
                if (e.target.tagName === "TR" || e.target.tagName === "TD") {
                    // If the user clicks on the row or a table cell, find the checkbox in the row
                    const checkbox = e.target.closest('tr').querySelector(".rowCheckbox");
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                    }
                }
            });

            // form.addEventListener("submit", (e) => {
            //     e.preventDefault();
            //     acceptData();
            // })

            // let dataInputs = [];
            // let acceptData = () => {
            //     dataInputs.push({
            //         "id": idInput.value,
            //         "name" : nameInput.value,
            //         "vendor" : vendorInput.value,
            //         "density" : densityInput.value,
            //         "viscosity" : viscosityInput.value,
            //         "packaging" : packagingInput.value,
            //         "size" : packSizeInput.value,
            //         "unit" : unitInput.value,
            //         "quantity" : quantityInput.value,
                    
            //     });
            //     localStorage.setItem('dataInputs', JSON.stringify(dataInputs));
            //     console.log(dataInputs);
            //     addValue();
            // }

            // let addValue = () => {
            //     tableRows.innerHTML = "";
            //     dataInputs.map((x, y)=> {
            //         return (
            //             tableRows.innerHTML += `<tr id=${y}>
            //                                     <td><input type="checkbox" class="rowCheckbox"></td>
            //                                     <td>${x.id}</td>
            //                                     <td>${x.name}</td>
            //                                     <td>${x.vendor}</td>
            //                                     <td>${x.density}</td>
            //                                     <td>${x.viscosity}</td>
            //                                     <td>${x.packaging}</td>
            //                                     <td>${x.size}</td>
            //                                     <td>${x.unit}</td>
            //                                     <td>${x.quantity}</td>
            //                                     </tr>`
            //         )
            //     })
            //     resetForm();
            // }

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                let newData = {
                    "id": idInput.value,
                    "name": nameInput.value,
                    "vendor": vendorInput.value,
                    "density": densityInput.value,
                    "viscosity": viscosityInput.value,
                    "packaging": packagingInput.value,
                    "size": packSizeInput.value,
                    "unit": unitInput.value,
                    "quantity": quantityInput.value
                };

                // Add the new user data to the userData array
                userData.push(newData);
                localStorage.setItem('userData', JSON.stringify(userData));  // Save updated userData to localStorage

                // Display both sets of data again (fetched + user-added)
                displayData();

                // Reset form
                resetForm();
            });


            let resetForm = () => {
                idInput.value = ""
                nameInput.value = ""
                vendorInput.value = ""
                densityInput.value = ""
                viscosityInput.value = ""
                packagingInput.value = ""
                packSizeInput.value = ""
                unitInput.value = ""
                quantityInput.value = ""
            }
            
            // (() => {
            //     let storedData = JSON.parse(localStorage.getItem("fetchedData"));
            //     dataInputs = JSON.parse(localStorage.getItem("dataInputs")) || [];
            //     console.log(dataInputs);
            //     addValue();
            // })();

            // rows.forEach((row) => {
            //     row.addEventListener('click', function (e) {
            //     if (e.target.type === 'checkbox') return;
            //         const checkbox = this.querySelector(".rowCheckbox");
            //         checkbox.checked = !checkbox.checked;
            //     });
            // });
    
            deleteButton.addEventListener('click', () => {
                const selectedCheckboxes = document.querySelectorAll('.rowCheckbox:checked');

                selectedCheckboxes.forEach(checkbox => {
                    const row = checkbox.closest('tr');
                    const rowId = row.querySelector('td:nth-child(2)').textContent; // Get the ID from the second cell

                    // Remove from DOM
                    row.remove();

                    // Remove from fetchedData or userData based on the source
                    fetchedData = fetchedData.filter(item => item.id !== rowId);
                    userData = userData.filter(item => item.id !== rowId);

                    // Update localStorage
                    localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
                    localStorage.setItem('userData', JSON.stringify(userData));
                });
            });

             // Move Up function
            moveUpButton.addEventListener('click', function () {
                moveRow("up");
            });
    
            // Move Down function
            moveDownButton.addEventListener('click', function () {
                moveRow("down");
            });
    
            // Function to move rows up or down
            function moveRow(direction) {
                const selectedRow = document.querySelector(".rowCheckbox:checked");
                if (!selectedRow) return;  // No row is selected
    
                const currentRow = selectedRow.closest('tr');  // Get the current row
    
                if (direction === "up" && currentRow.previousElementSibling) {
                    // Move the row up
                    currentRow.parentNode.insertBefore(currentRow, currentRow.previousElementSibling);
                } else if (direction === "down" && currentRow.nextElementSibling) {
                    // Move the row down
                    currentRow.parentNode.insertBefore(currentRow.nextElementSibling, currentRow);
                }
            }
        })
        
        .then(() => {
            const refreshData = document.querySelector("#refresh");
            // console.log(refreshData);
            refreshData.addEventListener('click', function refresh(){
                window.location.reload();
            })
        })
        
        .then(()=>{
            const save = document.querySelector('#saveData');
            console.log(save);
            
        })

        // Sort
        .then(data => {
            $('#example').DataTable({
                data: data,
                responsive: true,
                columns: [
                    {
                        title: '<input type="checkbox" id="selectAll">',           
                        orderable: false,    
                        searchable: false,   
                    },
                    { data: 'id'},
                    { data: 'Chemical_name'},
                    { data: 'Vendor'},
                    { data: 'Density'},
                    { data: 'Viscosity'},
                    { data: 'Packaging'},
                    { data: 'Pack_size'},
                    { data: 'Unit'},
                    { data: 'Quantity'}
                ]
            });
        });
})