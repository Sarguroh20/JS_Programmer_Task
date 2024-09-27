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
                    const rowData = `<tr data-id="${item.id}">
                        <td><input type="checkbox" class="rowCheckbox"></td>
                        <td contenteditable="true">${item.id}</td>
                        <td contenteditable="true">${item.Chemical_name}</td>
                        <td contenteditable="true">${item.Vendor}</td>
                        <td contenteditable="true">${item.Density}</td>
                        <td contenteditable="true">${item.Viscosity}</td>
                        <td contenteditable="true">${item.Packaging}</td>
                        <td contenteditable="true">${item.Pack_size}</td>
                        <td contenteditable="true">${item.Unit}</td>
                        <td contenteditable="true">${item.Quantity}</td>
                    </tr>`;
                    tableRows.innerHTML += rowData;
                });            

                userData.forEach((item, index) => {
                    const rowData = `<tr data-id="${item.id}">
                        <td><input type="checkbox" class="rowCheckbox"></td>
                        <td contenteditable="true">${item.id}</td>
                        <td contenteditable="true">${item.name}</td>
                        <td contenteditable="true">${item.vendor}</td>
                        <td contenteditable="true">${item.density}</td>
                        <td contenteditable="true">${item.viscosity}</td>
                        <td contenteditable="true">${item.packaging}</td>
                        <td contenteditable="true">${item.size}</td>
                        <td contenteditable="true">${item.unit}</td>
                        <td contenteditable="true">${item.quantity}</td>
                    </tr>`;
                    tableRows.innerHTML += rowData;
                });
            }

            displayData();

            let refreshData = () => {
                const refreshData = document.querySelector("#refresh");
                // console.log(refreshData);
                refreshData.addEventListener('click', function refresh(){
                window.location.reload();
            })
            }

            saveButton.addEventListener('click', function () {
                const allRows = tableRows.querySelectorAll('tr');
                
                allRows.forEach(row => {
                    const rowId = row.dataset.id;
                    const updatedRow = {
                        id: row.querySelector('td:nth-child(2)').textContent.trim(),
                        name: row.querySelector('td:nth-child(3)').textContent.trim(),
                        vendor: row.querySelector('td:nth-child(4)').textContent.trim(),
                        density: row.querySelector('td:nth-child(5)').textContent.trim(),
                        viscosity: row.querySelector('td:nth-child(6)').textContent.trim(),
                        packaging: row.querySelector('td:nth-child(7)').textContent.trim(),
                        size: row.querySelector('td:nth-child(8)').textContent.trim(),
                        unit: row.querySelector('td:nth-child(9)').textContent.trim(),
                        quantity: row.querySelector('td:nth-child(10)').textContent.trim()
                    };

                    console.log(updatedRow);

                    let indexFetchedData = fetchedData.findIndex(item => item.id === rowId);
                    let indexUserData = userData.findIndex(item => item.id === rowId);

                    if (indexFetchedData !== -1) {
                        fetchedData[indexFetchedData] = updatedRow;
                    } else if (indexUserData !== -1) {
                        userData[indexUserData] = updatedRow;
                    }
                });

                localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
                localStorage.setItem('userData', JSON.stringify(userData));

                // displayData();
                refreshData();
            });

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

                selectedCheckboxes.forEach(checkbox => {
                    const row = checkbox.closest('tr');
                    const rowId = row.querySelector('td:nth-child(2)').textContent; 

                    row.remove();

                    fetchedData = fetchedData.filter(item => item.id !== rowId);
                    userData = userData.filter(item => item.id !== rowId);

                    console.log(rowId);

                    localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
                    localStorage.setItem('userData', JSON.stringify(userData));

                    refreshData();
                });
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