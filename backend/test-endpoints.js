// Usar fetch nativo de Node.js

const BASE_URL = 'http://localhost:5000/api';

async function testEndpoints() {
  console.log('🧪 Probando endpoints del backend...\n');

  const endpoints = [
    { name: 'GET /content/sections', url: `${BASE_URL}/content/sections`, method: 'GET' },
    { name: 'GET /content/hero', url: `${BASE_URL}/content/hero`, method: 'GET' },
    { name: 'GET /content/services', url: `${BASE_URL}/content/services`, method: 'GET' },
    { name: 'GET /content/accounts', url: `${BASE_URL}/content/accounts`, method: 'GET' },
    { name: 'GET /content/solutions', url: `${BASE_URL}/content/solutions`, method: 'GET' },
    { name: 'GET /content/faq', url: `${BASE_URL}/content/faq`, method: 'GET' },
    { name: 'GET /content/cta', url: `${BASE_URL}/content/cta`, method: 'GET' },
    { name: 'GET /content/footer', url: `${BASE_URL}/content/footer`, method: 'GET' }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Probando: ${endpoint.name}`);
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name} - Status: ${response.status}`);
        console.log(`   Datos recibidos: ${JSON.stringify(data).substring(0, 100)}...`);
      } else {
        console.log(`❌ ${endpoint.name} - Status: ${response.status}`);
        const errorText = await response.text();
        console.log(`   Error: ${errorText}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name} - Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('🏁 Prueba de endpoints completada');
}

testEndpoints().catch(console.error); 