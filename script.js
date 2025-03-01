document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const data = parseCSV(text);
            renderTable(data);
            updateLineCount(data.length); // Update line count
        };
        reader.readAsText(file);
    } else {
        alert('Por favor, selecione um arquivo CSV.');
    }
});

function updateLineCount(lineCount) {
    const lineCountElement = document.getElementById('lineCount');
    lineCountElement.textContent = `O arquivo contém ${lineCount} linhas.`;
}

function parseCSV(csvText) {
    const rows = csvText.split('\n');
    const headers = rows[0].split(',').map(header => header.trim());
    const data = [];
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',').map(cell => cell.trim());
        if (row.length === headers.length) {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index];
            });
            data.push(rowData);
        }
    }
    return data;
}

function renderTable(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    if (data.length === 0) {
        outputDiv.textContent = 'Nenhum dado encontrado no arquivo CSV.';
        return;
    }
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    // Cria o cabeçalho da tabela
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    // Preenche o corpo da tabela
    data.forEach(rowData => {
        const tr = document.createElement('tr');
        Object.values(rowData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    outputDiv.appendChild(table);
}