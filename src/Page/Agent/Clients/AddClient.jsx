import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    status: 'Active'
  });

  useEffect(() => {
    if (isEditMode) {
      const saved = JSON.parse(localStorage.getItem('propozo_clients') || '[]');
      const client = saved.find(c => c.id === Number(id));
      if (client) setFormData(client);
    }
  }, [id, isEditMode]);

  const handleSave = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('propozo_clients') || '[]');
    
    if (isEditMode) {
      // Update existing
      const updated = saved.map(c => c.id === Number(id) ? { ...formData } : c);
      localStorage.setItem('propozo_clients', JSON.stringify(updated));
    } else {
      // Add new
      const newClient = { ...formData, id: Date.now() };
      localStorage.setItem('propozo_clients', JSON.stringify([...saved, newClient]));
    }
    
    navigate('/clients');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isEditMode ? 'Edit Client' : 'Add New Client'}</h2>
        <form onSubmit={handleSave} style={styles.form}>
          <input 
            placeholder="Full Name" 
            style={styles.input} 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            placeholder="Email" 
            style={styles.input} 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            placeholder="Phone" 
            style={styles.input} 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            required 
          />
          <input 
            placeholder="Interest (e.g. 3 BHK)" 
            style={styles.input} 
            value={formData.interest} 
            onChange={e => setFormData({...formData, interest: e.target.value})} 
            required 
          />
          <select 
            style={styles.input} 
            value={formData.status} 
            onChange={e => setFormData({...formData, status: e.target.value})}
          >
            <option value="Active">Active</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Closed">Closed</option>
          </select>
          <div style={{display: 'flex', gap: '10px'}}>
            <button type="submit" style={styles.submitBtn}>
              {isEditMode ? 'Update Client' : 'Save Client'}
            </button>
            <button type="button" onClick={() => navigate('/clients')} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' },
  card: { background: 'white', padding: '40px', borderRadius: '24px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  title: { marginBottom: '24px', fontSize: '22px', fontWeight: '800' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' },
  submitBtn: { flex: 1, background: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },
  cancelBtn: { flex: 1, background: '#f1f5f9', color: '#64748b', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }
};

export default AddEditClient;