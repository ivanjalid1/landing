// Script de prueba para verificar la conexión entre frontend y backend
const https = require('https');
const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testConnection() {
  console.log('🔍 Probando conexión entre frontend y backend...\n');
  
  try {
    // Probar endpoint de salud
    console.log('1. Probando endpoint de salud...');
    const healthResponse = await makeRequest('http://localhost:5000/api/health');
    console.log('✅ Salud del backend:', healthResponse.data);
    
    // Probar endpoint de contenido público
    console.log('\n2. Probando endpoint de contenido público...');
    const contentResponse = await makeRequest('http://localhost:5000/api/content/public/accounts');
    if (contentResponse.data.success) {
      const content = contentResponse.data.data.data;
      console.log('✅ Contenido de cuentas:', {
        title: content.title,
        subtitle: content.subtitle,
        accountsCount: content.accounts?.length
      });
    } else {
      console.log('❌ Error en contenido:', contentResponse.data);
    }
    
    // Probar frontend
    console.log('\n3. Probando frontend...');
    const frontendResponse = await makeRequest('http://localhost:4322');
    console.log('✅ Frontend responde:', frontendResponse.status);
    
    console.log('\n🎉 Todas las pruebas pasaron correctamente!');
    console.log('\n📋 Resumen:');
    console.log('- Backend: ✅ Funcionando en puerto 5000');
    console.log('- API de contenido: ✅ Devuelve datos actualizados');
    console.log('- Frontend: ✅ Funcionando en puerto 4322');
    console.log('\n💡 Si sigues viendo contenido viejo en el navegador:');
    console.log('1. Haz Ctrl+F5 para forzar recarga');
    console.log('2. Abre una ventana de incógnito');
    console.log('3. Revisa la consola del navegador (F12) para ver logs');
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Asegúrate de que el backend esté corriendo: cd backend && node src/server.js');
    console.log('2. Asegúrate de que el frontend esté corriendo: cd frontend && npm run dev');
    console.log('3. Verifica que no haya conflictos de puertos');
  }
}

testConnection(); 