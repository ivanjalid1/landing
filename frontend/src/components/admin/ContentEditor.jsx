import React, { useState, useEffect } from 'react';

const ContentEditor = ({ section, fields, title, description }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Cargar contenido inicial
  useEffect(() => {
    loadContent();
  }, [section]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/${section}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.data?.data || {});
      } else {
        // Si no existe contenido, usar valores por defecto
        const defaultContent = {};
        fields.forEach(field => {
          if (field.type === 'array') {
            defaultContent[field.name] = field.defaultValue || [];
          } else {
            defaultContent[field.name] = field.defaultValue || '';
          }
        });
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('Error cargando contenido:', error);
      setError('Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const response = await fetch(`http://localhost:5000/api/content/${section}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: content })
      });

      if (response.ok) {
        window.showToast('Contenido guardado exitosamente', 'success');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al guardar');
        window.showToast('Error al guardar el contenido', 'error');
      }
    } catch (error) {
      console.error('Error guardando contenido:', error);
      setError('Error de conexión');
      window.showToast('Error de conexión', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setContent(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleArrayFieldChange = (fieldName, index, value) => {
    setContent(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => 
        i === index ? { ...item, ...value } : item
      )
    }));
  };

  const addArrayItem = (fieldName, template) => {
    setContent(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), template]
    }));
  };

  const removeArrayItem = (fieldName, index) => {
    setContent(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    rows={field.rows || 4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}

                {field.type === 'url' && (
                  <input
                    type="url"
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}

                {field.type === 'array' && (
                  <div className="space-y-4">
                    {(content[field.name] || []).map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            {field.itemLabel} #{index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem(field.name, index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {field.fields.map((subField) => (
                            <div key={subField.name}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {subField.label}
                              </label>
                              {subField.type === 'text' && (
                                <input
                                  type="text"
                                  value={item[subField.name] || ''}
                                  onChange={(e) => handleArrayFieldChange(field.name, index, { [subField.name]: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder={subField.placeholder}
                                />
                              )}
                              {subField.type === 'textarea' && (
                                <textarea
                                  value={item[subField.name] || ''}
                                  onChange={(e) => handleArrayFieldChange(field.name, index, { [subField.name]: e.target.value })}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder={subField.placeholder}
                                />
                              )}
                              {subField.type === 'checkbox' && (
                                <input
                                  type="checkbox"
                                  checked={item[subField.name] || false}
                                  onChange={(e) => handleArrayFieldChange(field.name, index, { [subField.name]: e.target.checked })}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addArrayItem(field.name, field.template)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <i className="fas fa-plus"></i>
                      <span>Agregar {field.itemLabel}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={loadContent}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <span className="flex items-center space-x-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Guardando...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <i className="fas fa-save"></i>
                  <span>Guardar Cambios</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentEditor; 