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

            const moveUpButton = document.getElementById("moveUp")
            const moveDownButton = document.getElementById("moveDown")
            const deleteButton = document.getElementById('deleteRow')
            const saveButton = document.getElementById('saveData')

            let fetchedData = JSON.parse(localStorage.getItem('fetchedData')) || [];
            let userData = JSON.parse(localStorage.getItem('userData')) || [];
            
            if (!fetchedData.length) {
                localStorage.setItem("fetchedData", JSON.stringify(data));
                fetchedData = data;
            }
            
            let displayData = () => {
                tableRows.innerHTML = "";

                fetchedData.forEach((item, index) => {
                    const rowData = `<tr data-id="fetched_${index}">
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
                    const rowData = `<tr data-id="user_${index}">
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

            let refreshData = () => {
                const refreshData = document.querySelector("#refresh");
                // console.log(refreshData);
                window.location.reload();
            }

            // saveButton.addEventListener('click', function () {
            //     const allRows = tableRows.querySelectorAll('tr');
                
            //     allRows.forEach(row => {
            //         const rowId = row.getAttribute('data-id');
            //         const updatedRow = {
            //             id: row.querySelector('td:nth-child(2)').textContent.trim(),
            //             name: row.querySelector('td:nth-child(3)').textContent.trim(),
            //             vendor: row.querySelector('td:nth-child(4)').textContent.trim(),
            //             density: row.querySelector('td:nth-child(5)').textContent.trim(),
            //             viscosity: row.querySelector('td:nth-child(6)').textContent.trim(),
            //             packaging: row.querySelector('td:nth-child(7)').textContent.trim(),
            //             size: row.querySelector('td:nth-child(8)').textContent.trim(),
            //             unit: row.querySelector('td:nth-child(9)').textContent.trim(),
            //             quantity: row.querySelector('td:nth-child(10)').textContent.trim()
            //         };
                    
            //         if (rowId.startsWith('user_')) {
            //             // Handle updating userData
            //             const userIndex = parseInt(rowId.replace('user_', ''));  // Extract the user data index
            //             console.log(userIndex);
            //             userData[userIndex] = updatedRow;  // Update userData at the appropriate index
            //         } else if(rowId.startsWith('fetched_')){
            //             // Handle updating fetchedData
            //             const fetchedIndex = parseInt(rowId.replace('fetched_', ''));  // Extract the fetched data index
            //             console.log(fetchedIndex);
            //             fetchedData[fetchedIndex] = updatedRow;  // Update fetchedData at the appropriate index
            //         }
            //     });
                
            //     localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
            //     localStorage.setItem('userData', JSON.stringify(userData));

            //     alert('Data saved successfully!'); 
                
            //     // displayData();
            //     // refreshData();
            // });

            tableRows.addEventListener('click', function (e) {
                if (e.target.tagName === "TR" || e.target.tagName === "TD") {
                    const checkbox = e.target.closest('tr').querySelector(".rowCheckbox");
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                    }
                }
            });

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

                userData.push(newData);
                localStorage.setItem('userData', JSON.stringify(userData)); 
                alert('Data added successfully!'); 

                // displayData();
                refreshData();

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
            
            deleteButton.addEventListener('click', () => {
                const selectedCheckboxes = document.querySelectorAll('.rowCheckbox:checked');

                let rowsToDelete = []

                selectedCheckboxes.forEach((checkbox) => {
                    const row = checkbox.closest('tr');
                    const rowId = row.getAttribute('data-id'); 

                    if(rowId.startsWith('fetched_')){
                        const index = parseInt(rowId.replace('fetched_', ''));
                        console.log(index)
                        fetchedData.splice(index, 1)
                    } else if(rowId.startsWith('user_')){
                        const index = parseInt(rowId.replace('user_', ''));
                        console.log(index)
                        userData.splice(index, 1);
                    }
                    rowsToDelete.push(row)
                });

                rowsToDelete.forEach(row => row.remove());

                localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
                localStorage.setItem('userData', JSON.stringify(userData));

                alert('Data deleted successfully!'); 

                refreshData();
            });

            moveUpButton.addEventListener('click', function () {
                moveRow("up");
            });
    
            moveDownButton.addEventListener('click', function () {
                moveRow("down");
            });
    
            function moveRow(direction) {
                const selectedRow = document.querySelector(".rowCheckbox:checked");
                if (!selectedRow) return;  
    
                const currentRow = selectedRow.closest('tr');  
    
                if (direction === "up" && currentRow.previousElementSibling) {
                    currentRow.parentNode.insertBefore(currentRow, currentRow.previousElementSibling);
                } else if (direction === "down" && currentRow.nextElementSibling) {
                    currentRow.parentNode.insertBefore(currentRow.nextElementSibling, currentRow);
                }
            }
        })
        
        .then(() => {
            const refreshData = document.querySelector("#refresh");
            // console.log(refreshData);
            refreshData.addEventListener('click', function refresh(){
                window.location.reload();
                localStorage.clear();
            })
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
});