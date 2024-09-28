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
            const editRow = document.getElementById('editRow')
            const saveButton = document.getElementById('saveData')

            let selectedCheckboxes = document.querySelectorAll('.rowCheckbox:checked');
            let editingRowId = null;

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
                        <td data-cell="Id">${item.id}</td>
                        <td data-cell="Chemical Name">${item.Chemical_name}</td>
                        <td data-cell="Vendor">${item.Vendor}</td>
                        <td data-cell="Density">${item.Density}</td>
                        <td data-cell="Viscosity">${item.Viscosity}</td>
                        <td data-cell="Packaging">${item.Packaging}</td>
                        <td data-cell="Pack Size">${item.Pack_size}</td>
                        <td data-cell="Unit">${item.Unit}</td>
                        <td data-cell="Quantity">${item.Quantity}</td>
                    </tr>`;
                    tableRows.innerHTML += rowData;
                });            

                userData.forEach((item, index) => {
                    const rowData = `<tr data-id="user_${index}">
                        <td><input type="checkbox" class="rowCheckbox"></td>
                        <td data-cell="Id">${item.id}</td>
                        <td data-cell="Name">${item.name}</td>
                        <td data-cell="Vendor">${item.vendor}</td>
                        <td data-cell="Density">${item.density}</td>
                        <td data-cell="Viscosity">${item.viscosity}</td>
                        <td data-cell="Packaging">${item.packaging}</td>
                        <td data-cell="Pack Size">${item.size}</td>
                        <td data-cell="Unit">${item.unit}</td>
                        <td data-cell="Quantity">${item.quantity}</td>
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

            let saveDataToLocalStorage = () => {
                localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
                localStorage.setItem('userData', JSON.stringify(userData));
                alert("Data saved to Local Storage!");
            };

            saveButton.addEventListener('click', saveDataToLocalStorage);

            editRow.addEventListener('click', () => {
                selectedCheckboxes = document.querySelectorAll('.rowCheckbox:checked'); 
                
                if (selectedCheckboxes.length !== 1) {
                    alert("Please select exactly one row to edit.");
                    return;
                }

                const selectedRow = selectedCheckboxes[0].closest('tr');
                editingRowId = selectedRow.getAttribute('data-id');  

                if (editingRowId.startsWith('fetched_')) {
                    const index = parseInt(editingRowId.replace('fetched_', ''));
                    const rowData = fetchedData[index];

                    idInput.value = rowData.id;
                    nameInput.value = rowData.Chemical_name;
                    vendorInput.value = rowData.Vendor;
                    densityInput.value = rowData.Density;
                    viscosityInput.value = rowData.Viscosity;
                    packagingInput.value = rowData.Packaging;
                    packSizeInput.value = rowData.Pack_size;
                    unitInput.value = rowData.Unit;
                    quantityInput.value = rowData.Quantity;
                } else if (editingRowId.startsWith('user_')) {
                    const index = parseInt(editingRowId.replace('user_', ''));
                    const rowData = userData[index];
                    
                    idInput.value = rowData.id;
                    nameInput.value = rowData.name;
                    vendorInput.value = rowData.vendor;
                    densityInput.value = rowData.density;
                    viscosityInput.value = rowData.viscosity;
                    packagingInput.value = rowData.packaging;
                    packSizeInput.value = rowData.size;
                    unitInput.value = rowData.unit;
                    quantityInput.value = rowData.quantity;
                }
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

                let newData;
                if (editingRowId && editingRowId.startsWith('fetched_')) {
                    newData = {
                        "id": idInput.value,
                        "Chemical_name": nameInput.value, 
                        "Vendor": vendorInput.value,
                        "Density": densityInput.value,
                        "Viscosity": viscosityInput.value,
                        "Packaging": packagingInput.value,
                        "Pack_size": packSizeInput.value,
                        "Unit": unitInput.value,
                        "Quantity": quantityInput.value
                    };
                } else {
                    newData = {
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
                }

                if (editingRowId) {
                    if (editingRowId.startsWith('fetched_')) {
                        const index = parseInt(editingRowId.replace('fetched_', ''));
                        fetchedData.splice(index, 1, newData); 
                        localStorage.setItem('fetchedData', JSON.stringify(fetchedData)); 
                    } else if (editingRowId.startsWith('user_')) {
                        const index = parseInt(editingRowId.replace('user_', ''));
                        userData.splice(index, 1, newData); 
                        localStorage.setItem('userData', JSON.stringify(userData)); 
                    }
            
                    alert('Data edited successfully!');
            
                    editingRowId = null; 
                } else {
                    userData.push(newData);
                    localStorage.setItem('userData', JSON.stringify(userData)); 
                    alert('Data added successfully!');
                }

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
            
            let deleteData = () => {

                deleteButton.addEventListener('click', () => {
                    selectedCheckboxes = document.querySelectorAll('.rowCheckbox:checked'); 

                    if (selectedCheckboxes.length === 0) {
                        alert("Please select at least one row to delete.");
                        return;
                    }
    
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
            }

            deleteData();

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