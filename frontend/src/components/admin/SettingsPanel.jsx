import React, { useState } from 'react';
import { authenticatedFetch } from '../../utils/auth.js';
import { showToast } from '../../utils/browser.js';

const SettingsPanel = ({ settings, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState(settings);

  const handleSave = async () => {
    try {
      setSaving(true);
      await authenticatedFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(values)
      });
      showToast('Configuración guardada exitosamente', 'success');
      onSave(values);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      showToast('Error al guardar la configuración', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Configuración</h2>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key}
              </label>
              <input
                type="text"
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Guardando...
            </>
          ) : (
            <>
              <i className="fas fa-save mr-2"></i>
              Guardar Cambios
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel; 