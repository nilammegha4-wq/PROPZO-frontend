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
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#faf7f5' },
  card: { background: 'white', padding: '40px', borderRadius: '24px', width: '400px', border: '1px solid rgba(228, 203, 182, 0.2)', boxShadow: '0 10px 25px rgba(76, 51, 36, 0.05)' },
  title: { marginBottom: '24px', fontSize: '22px', fontWeight: '800', color: '#4c3324' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid rgba(228, 203, 182, 0.4)', background: '#faf7f5', color: '#3a2e28', fontSize: '14px', outline: 'none' },
  submitBtn: { flex: 1, background: '#627b68', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
  cancelBtn: { flex: 1, background: '#fff', color: '#b2846b', border: '1px solid rgba(178, 132, 107, 0.4)', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }
};

export default AddEditClient;