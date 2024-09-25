let listOfChemicals = [
    {
        "id": 1, 
        "Chemical_name":"Ammonium Persulfate",
        "Vendor": "LG Chem",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 2,
        "Chemical_name":"Caustic Potash",
        "Vendor": "Formosa",
        "Density": 3172.15,
        "Viscosity": 48.22,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 8751.90
    },
    {
        "id": 3, 
        "Chemical_name":"Dimethylaminopropylamino",
        "Vendor": "LG Chem",
        "Density": 8435.37,
        "Viscosity": 12.62,
        "Packaging": "Barrel",
        "Pack_size": 75.00,
        "Unit": "L",
        "Quantity": 5964.61
    },
    {
        "id": 4,
        "Chemical_name":"Mono Ammonium Phosphate",
        "Vendor": "Sinopec",
        "Density": 1597.65,
        "Viscosity": 76.51,
        "Packaging": "Bag",
        "Pack_size": 105.00,
        "Unit": "kg",
        "Quantity": 8183.73
    },
    {
        "id": 5,
        "Chemical_name":"Ferric Nitrate",
        "Vendor": "DowDuPont",
        "Density": 364.04,
        "Viscosity": 14.90,
        "Packaging": "Bag",
        "Pack_size": 105.00,
        "Unit": "kg",
        "Quantity": 4154.33
    },
    {
        "id": 6,
        "Chemical_name":"n-Pentane",
        "Vendor": "Sinopec",
        "Density": 4535.26,
        "Viscosity": 66.76,
        "Packaging": "N/A",             // null or "N/A" ?
        "Pack_size": "N/A",
        "Unit": "t",
        "Quantity": 6272.34
    },
    {
        "id": 7,
        "Chemical_name":"Glycol Ether PM",
        "Vendor": "LG Chem",
        "Density": 6495.18,
        "Viscosity": 72.12,
        "Packaging": "Bag",
        "Pack_size": 250.00,
        "Unit": "kg",
        "Quantity": 8749.54
    },
    {
        "id": 8,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 9,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 10,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 11,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 12,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 13,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 14,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    },
    {
        "id": 15,
        "Chemical_name":"",
        "Vendor": "",
        "Density": 3525.92,
        "Viscosity": 60.63,
        "Packaging": "Bag",
        "Pack_size": 100.00,
        "Unit": "kg",
        "Quantity": 6495.18
    }
]

function buildTable(data) {
    let table = document.getElementById('tableRows')
    
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
                    </tr>`
        table.innerHTML += rowData;
    }
}

buildTable(listOfChemicals)