import React, { useState, useEffect } from 'react';
import { authenticatedFetch, isAuthenticated } from '../../utils/auth.js';
import { safeRedirect, showToast } from '../../utils/browser.js';

const ContentEditor = ({ section, fields, title, description }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [originalContent, setOriginalContent] = useState({});

  // Cargar contenido inicial
  useEffect(() => {
    loadContent();
  }, [section]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!isAuthenticated()) {
        setError('No hay token de autenticación');
        setTimeout(() => {
          safeRedirect('/login');
        }, 2000);
        return;
      }

      const response = await authenticatedFetch(`http://localhost:5000/api/content/${section}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Contenido cargado:', data);
        
        if (data.success && data.data && data.data.data) {
          const loadedContent = data.data.data;
          setContent(loadedContent);
          setOriginalContent(loadedContent);
          console.log('✅ Contenido cargado correctamente desde la BBDD');
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
          setOriginalContent(defaultContent);
          console.log('⚠️ No hay contenido en BBDD, usando valores por defecto');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al cargar el contenido');
      }
    } catch (error) {
      console.error('Error cargando contenido:', error);
      if (error.message === 'Sesión expirada') {
        setError('Sesión expirada. Redirigiendo al login...');
        setTimeout(() => {
          safeRedirect('/login');
        }, 2000);
      } else {
        setError('Error de conexión al cargar el contenido');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      if (!isAuthenticated()) {
        setError('No hay token de autenticación');
        setTimeout(() => {
          safeRedirect('/login');
        }, 2000);
        return;
      }

      const response = await authenticatedFetch(`http://localhost:5000/api/content/${section}`, {
        method: 'PUT',
        body: JSON.stringify({ data: content })
      });

      if (response.ok) {
        const result = await response.json();
        setOriginalContent(content);
        showToast('Contenido guardado exitosamente', 'success');
        console.log('✅ Contenido guardado:', result);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al guardar');
        showToast('Error al guardar el contenido', 'error');
      }
    } catch (error) {
      console.error('Error guardando contenido:', error);
      if (error.message === 'Sesión expirada') {
        setError('Sesión expirada. Redirigiendo al login...');
        showToast('Sesión expirada', 'error');
        setTimeout(() => {
          safeRedirect('/login');
        }, 2000);
      } else {
        setError('Error de conexión al guardar');
        showToast('Error de conexión', 'error');
      }
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

  const hasChanges = () => {
    return JSON.stringify(content) !== JSON.stringify(originalContent);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className="bg-white rounded-lg shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={field.rows || 3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {field.type === 'url' && (
                  <input
                    type="url"
                    value={content[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {field.type === 'array' && (
                  <div className="space-y-2">
                    {(content[field.name] || []).map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newArray = [...content[field.name]];
                            newArray[index] = e.target.value;
                            setContent({ ...content, [field.name]: newArray });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newArray = content[field.name].filter((_, i) => i !== index);
                            setContent({ ...content, [field.name]: newArray });
                          }}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newArray = [...(content[field.name] || []), ''];
                        setContent({ ...content, [field.name]: newArray });
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Agregar
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
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Descartar Cambios
            </button>
            
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default ContentEditor; 