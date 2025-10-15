const fs = require('fs');
const csv = require('fast-csv');

// Data JSON untuk 10 perangkat
const devices = [
  {
    "serialNumber": "SIM-FTTH-001",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-Huawei",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "ahmadfauzan119",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "9qwsBnmhY8",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.11",
      "InternetGatewayDevice.WANDevice.1.X_Huawei_GponInterfaceConfig.RXPower": "-22.5",
      "InternetGatewayDevice.WANDevice.1.X_Huawei_GponInterfaceConfig.TransceiverTemperature": "45",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.101",
      "InternetGatewayDevice.DeviceInfo.UpTime": "345321"
    }
  },
  {
    "serialNumber": "SIM-FTTH-002",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-ZTE",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "rinakartika909",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "fPVJLd37RU",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.12",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.RXPower": "-18.7",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.TransceiverTemperature": "47",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.102",
      "InternetGatewayDevice.DeviceInfo.UpTime": "452122"
    }
  },
  {
    "serialNumber": "SIM-FTTH-003",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-CMCC",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "dedipratama532",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "7KD7sdWDZs",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.13",
      "InternetGatewayDevice.WANDevice.1.X_CMCC_GponInterfaceConfig.RXPower": "-25.1",
      "InternetGatewayDevice.WANDevice.1.X_CMCC_GponInterfaceConfig.TransceiverTemperature": "42",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.103",
      "InternetGatewayDevice.DeviceInfo.UpTime": "512442"
    }
  },
  {
    "serialNumber": "SIM-FTTH-004",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-ZTE",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "budisantoso303",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "oqijKex3RL",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.14",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.RXPower": "-20.8",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.TransceiverTemperature": "48",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.104",
      "InternetGatewayDevice.DeviceInfo.UpTime": "615212"
    }
  },
  {
    "serialNumber": "SIM-FTTH-005",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-FH",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "arifhidayat806",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "MBpzjt4rPf",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.15",
      "InternetGatewayDevice.WANDevice.1.X_FH_GponInterfaceConfig.RXPower": "-16.3",
      "InternetGatewayDevice.WANDevice.1.X_FH_GponInterfaceConfig.TransceiverTemperature": "51",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.105",
      "InternetGatewayDevice.DeviceInfo.UpTime": "712339"
    }
  },
  {
    "serialNumber": "SIM-FTTH-006",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-ZTE",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "sitimarlina344",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "ZfhmoTPxxv",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.16",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.RXPower": "-21.7",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.TransceiverTemperature": "43",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.106",
      "InternetGatewayDevice.DeviceInfo.UpTime": "523144"
    }
  },
  {
    "serialNumber": "SIM-FTTH-007",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-CTCOM",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "lestariwulandari688",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "SWZ2s4OkOa",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.17",
      "InternetGatewayDevice.WANDevice.1.X_CT-COM_GponInterfaceConfig.RXPower": "-27.2",
      "InternetGatewayDevice.WANDevice.1.X_CT-COM_GponInterfaceConfig.TransceiverTemperature": "52",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.107",
      "InternetGatewayDevice.DeviceInfo.UpTime": "333245"
    }
  },
  {
    "serialNumber": "SIM-FTTH-008",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-FH",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "intanpermata473",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "friyRIhVzc",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.18",
      "InternetGatewayDevice.WANDevice.1.X_FH_GponInterfaceConfig.RXPower": "-19.4",
      "InternetGatewayDevice.WANDevice.1.X_FH_GponInterfaceConfig.TransceiverTemperature": "50",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.108",
      "InternetGatewayDevice.DeviceInfo.UpTime": "481223"
    }
  },
  {
    "serialNumber": "SIM-FTTH-009",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-ZTE",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "rudikurniawan392",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "BIzLLgmOEz",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.19",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.RXPower": "-24.6",
      "InternetGatewayDevice.WANDevice.1.X_ZTE_GponInterfaceConfig.TransceiverTemperature": "44",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.109",
      "InternetGatewayDevice.DeviceInfo.UpTime": "566219"
    }
  },
  {
    "serialNumber": "SIM-FTTH-010",
    "productClass": "ONU-SIM",
    "manufacturer": "SimulatedCo-Huawei",
    "parameters": {
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username": "windarahmawati398",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password": "YcvA2ZKce8",
      "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress": "192.168.1.20",
      "InternetGatewayDevice.WANDevice.1.X_Huawei_GponInterfaceConfig.RXPower": "-15.9",
      "InternetGatewayDevice.WANDevice.1.X_Huawei_GponInterfaceConfig.TransceiverTemperature": "46",
      "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress": "192.168.1.110",
      "InternetGatewayDevice.DeviceInfo.UpTime": "612978"
    }
  }
];

const baseCsvFile = 'data_model_202BC1-BM632w-8KA8WA1151100043.csv';

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
