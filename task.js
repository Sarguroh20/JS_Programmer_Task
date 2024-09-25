document.addEventListener('DOMContentLoaded', function(){
    fetch("data.json")
    
    .then(response => response.json())
    
    .then(function (data) {
        let table = document.querySelector("#tableRows")
        
        for(let i = 0; i < data.length; i++) {
            let rowData = `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].Chemical_name}</td>
                            <td>${data[i].Vendor}</td>
                            <td>${data[i].Density}</td>
                            <td>${data[i].Viscosity}</td>
                            <td>${data[i].Packaging}</td>
                            <td>${data[i].Pack_size}</td>
                            <td>${data[i].Unit}</td>
                            <td>${data[i].Quantity}</td>
                        </tr>`;
            table.innerHTML += rowData;
        }
    })
    
    .then(data => {
        $('#example').DataTable({
            data: data,
            columns: [
                { data: 'id' },
                { data: 'Chemical_name' },
                { data: 'Vendor' },
                { data: 'Density' },
                { data: 'Viscosity' },
                { data: 'Packaging' },
                { data: 'Pack_size' },
                { data: 'Unit' },
                { data: 'Quantity' },
            ]
        });
    });
})

// Sort By Columns
// let table = document.getElementById('table');
// let rows = table.querySelector('tbody tr');
// let rowData = [];

// for (let i = 0; i < rows.length; i++) {
//     let cells = rows[i].getElementsByTagName('td');
//     let id = parseInt(cells[0].innerHTML);
//     let Chemical_name = cells[1].innerHTML;
//     let Density = parseInt(cells[2].innerHTML);
//     let Viscosity = parseInt(cells[3].innerHTML);
//     let Packaging = cells[4].innerHTML;
//     let Pack_size = parseInt(cells[5].innerHTML);
//     let Unit = cells[6].innerHTML;
//     let Quantity = parseInt(cells[7].innerHTML);

//     rowData.push({
//         id:id,
//         Chemical_name:Chemical_name,
//         Density:Density,
//         Viscosity:Viscosity,
//         Packaging:Packaging,
//         Pack_size:Pack_size,
//         Unit:Unit,
//         Quantity:Quantity

//     });
// }

//     let sortDirection = {
//         id:"asc",
//         Chemical_name:"asc",
//         Density:"asc",
//         Viscosity:"asc",
//         Packaging:"asc",
//         Pack_size:"asc",
//         Unit:"asc",
//         Quantity:"asc"
//     }

//     rowData.sort(function(a, b){
//         return a.price - b.price;
//     })

//     function updateTable(){
//         for (let i = 0; i < rowData.length; i++) {
//             rows[i].getElementsByTagName('td')[0].innerHTML = rowData[i].id;
//             rows[i].getElementsByTagName('td')[1].innerHTML = rowData[i].Chemical_name;
//             rows[i].getElementsByTagName('td')[2].innerHTML = rowData[i].Density;
//             rows[i].getElementsByTagName('td')[3].innerHTML = rowData[i].Viscosity;
//             rows[i].getElementsByTagName('td')[4].innerHTML = rowData[i].Packaging;
//             rows[i].getElementsByTagName('td')[5].innerHTML = rowData[i].Pack_size;
//             rows[i].getElementsByTagName('td')[6].innerHTML = rowData[i].Unit;
//             rows[i].getElementsByTagName('td')[7].innerHTML = rowData[i].Quantity;
//         }
//     }

//     updateTable();

//     let idSortIcon = document.getElementById('id-col').getElementsByTagName("i")[0];
//     let Chemical_nameSortIcon = document.getElementById('Chemical_name-col').getElementsByTagName("i")[1];
//     let DensitySortIcon = document.getElementById('Density-col').getElementsByTagName("i")[2];
//     let ViscositySortIcon = document.getElementById('Viscosity-col').getElementsByTagName("i")[3];
//     let PackagingSortIcon = document.getElementById('Packaging-col').getElementsByTagName("i")[4];
//     let Pack_sizeSortIcon = document.getElementById('Pack_size-col').getElementsByTagName("i")[5];
//     let UnitSortIcon = document.getElementById('Unit-col').getElementsByTagName("i")[6];
//     let QuantitySortIcon = document.getElementById('Quantity-col').getElementsByTagName("i")[7];

//     idSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.id === "asc")
//                 return a.id - b.id;
//             else
//                 return b.id - a.id;
//         });

//         sortDirection.id = (sortDirection.id === "asc") ? "desc":"asc";
//         updateTable();
//     });

//     Chemical_nameSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Chemical_name === "asc"){
//                 if(a.Chemical_name < b.Chemical_name) return -1;
//                 if(a.Chemical_name > b.Chemical_name) return 1;

//                 return 0;
//             }else{
//                 if(a.Chemical_name < b.Chemical_name) return 1;
//                 if(a.Chemical_name > b.Chemical_name) return -1;

//                 return 0;
//             }
//         });

//         sortDirection.Chemical_name = (sortDirection.Chemical_name === "asc") ? "desc":"asc";
//         updateTable();

//     });

//     VendorSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Vendor === "asc"){
//                 if(a.Vendor < b.Vendor) return -1;
//                 if(a.Vendor > b.Vendor) return 1;

//                 return 0;
//             }else{
//                 if(a.Vendor < b.Vendor) return 1;
//                 if(a.Vendor > b.Vendor) return -1;

//                 return 0;
//             }
//         });

//         sortDirection.Vendor = (sortDirection.Vendor === "asc") ? "desc":"asc";
//         updateTable();

//     });

//     DensitySortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Density === "asc")
//                 return a.Density - b.Density;
//             else
//                 return b.Density - a.Density;
//         });

//         sortDirection.Density = (sortDirection.Density === "asc") ? "desc":"asc";
//         updateTable();
//     });

//     ViscositySortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Viscosity === "asc")
//                 return a.Viscosity - b.Viscosity;
//             else
//                 return b.Viscosity - a.Viscosity;
//         });

//         sortDirection.Viscosity = (sortDirection.Viscosity === "asc") ? "desc":"asc";
//         updateTable();
//     });

//     PackagingSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Packaging === "asc"){
//                 if(a.Packaging < b.Packaging) return -1;
//                 if(a.Packaging > b.Packaging) return 1;

//                 return 0;
//             }else{
//                 if(a.Packaging < b.Packaging) return 1;
//                 if(a.Packaging > b.Packaging) return -1;

//                 return 0;
//             }
//         });

//         sortDirection.Packaging = (sortDirection.Packaging === "asc") ? "desc":"asc";
//         updateTable();

//     });

//     Pack_sizeSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Pack_size === "asc")
//                 return a.Pack_size - b.Pack_size;
//             else
//                 return b.Pack_size - a.Pack_size;
//         });

//         sortDirection.Pack_size = (sortDirection.Pack_size === "asc") ? "desc":"asc";
//         updateTable();
//     });

//     UnitSortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Unit === "asc"){
//                 if(a.Unit < b.Unit) return -1;
//                 if(a.Unit > b.Unit) return 1;

//                 return 0;
//             }else{
//                 if(a.Unit < b.Unit) return 1;
//                 if(a.Unit > b.Unit) return -1;

//                 return 0;
//             }
//         });

//         sortDirection.Unit = (sortDirection.Unit === "asc") ? "desc":"asc";
//         updateTable();

//     });

//     QuantitySortIcon.addEventListener('click', function(){
//         rowData.sort(function(a, b){
//             if(sortDirection.Quantity === "asc")
//                 return a.Quantity - b.Quantity;
//             else
//                 return b.Quantity - a.Quantity;
//         });

//         sortDirection.Quantity = (sortDirection.Quantity === "asc") ? "desc":"asc";
//         updateTable();
//     });