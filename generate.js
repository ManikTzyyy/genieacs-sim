const fs = require('fs');
const csv = require('fast-csv');

// Data JSON untuk 10 perangkat
const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8'));

const baseCsvFile = 'base_data.csv';

async function createDeviceCsv(device, baseData) {
    const data = JSON.parse(JSON.stringify(baseData)); // Deep copy

    // Helper function to find and update a row
    const updateRow = (paramName, value) => {
        const row = data.find(r => r.Parameter === paramName);
        if (row) {
            row.Value = value;
        }
    };
    
    // Update identity
    updateRow('DeviceID.SerialNumber', device.serialNumber);
    updateRow('DeviceID.ProductClass', device.productClass);
    updateRow('DeviceID.Manufacturer', device.manufacturer);
    updateRow('InternetGatewayDevice.DeviceInfo.SerialNumber', device.serialNumber);
    updateRow('InternetGatewayDevice.DeviceInfo.ProductClass', device.productClass);
    updateRow('InternetGatewayDevice.DeviceInfo.Manufacturer', device.manufacturer);

    // Update parameters
    for (const [param, value] of Object.entries(device.parameters)) {
        const row = data.find(r => r.Parameter === param);
        if (row) {
            row.Value = value.toString();
        } else {
            // If parameter doesn't exist, add it
            data.push({
                Parameter: param,
                Object: 'false',
                Writable: 'true',
                Value: value.toString(),
                'Value type': 'xsd:string'
            });
        }
    }

    // Write the new CSV file
    const filename = `${device.serialNumber}.csv`;
    return new Promise((resolve, reject) => {
        csv.writeToPath(filename, data, { headers: true })
            .on('error', err => reject(err))
            .on('finish', () => {
                console.log(`Berhasil membuat file: ${filename}`);
                resolve();
            });
    });
}

async function main() {
    const baseData = [];
    fs.createReadStream(baseCsvFile)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => baseData.push(row))
        .on('end', async (rowCount) => {
            console.log(`Membaca ${rowCount} baris dari file dasar.`);
            console.log('--- Memulai proses pembuatan file ---');
            for (const device of devices) {
                await createDeviceCsv(device, baseData);
            }
            console.log('--- Proses Selesai ---');
        });
}

main();
