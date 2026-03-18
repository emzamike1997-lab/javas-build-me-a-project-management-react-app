import React, { useState } from 'react';

export default function MainComponent() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', description: 'Description 1', status: 'In Progress' },
    { id: 2, name: 'Project 2', description: 'Description 2', status: 'Done' },
  ]);
  const [newProject, setNewProject] = useState({ name: '', description: '', status: '' });
  const [errors, setErrors] = useState({ name: '', description: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState({});

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description || !newProject.status) {
      setErrors({
        name: !newProject.name ? 'Name is required' : '',
        description: !newProject.description ? 'Description is required' : '',
        status: !newProject.status ? 'Status is required' : '',
      });
      return;
    }
    setProjects([...projects, { id: projects.length + 1, ...newProject, status: 'In Progress' }]);
    setNewProject({ name: '', description: '', status: '' });
    setErrors({ name: '', description: '', status: '' });
  };

  const handleEditProject = (project) => {
    setIsEditing(true);
    setEditingProject(project);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    if (!editingProject.name || !editingProject.description || !editingProject.status) {
      setErrors({
        name: !editingProject.name ? 'Name is required' : '',
        description: !editingProject.description ? 'Description is required' : '',
        status: !editingProject.status ? 'Status is required' : '',
      });
      return;
    }
    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id ? editingProject : project
    );
    setProjects(updatedProjects);
    setIsEditing(false);
    setEditingProject({});
    setErrors({ name: '', description: '', status: '' });
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProject({ ...editingProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    if (isEditing) {
      setEditingProject({ ...editingProject, status: value });
    } else {
      setNewProject({ ...newProject, status: value });
    }
  };

  const stats = {
    totalProjects: projects.length,
    inProgress: projects.filter((project) => project.status === 'In Progress').length,
    done: projects.filter((project) => project.status === 'Done').length,
  };

  return (
    <div style={{ background: '#080c14', padding: '24px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: '600' }}>Project Management</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', marginRight: '12px' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Total Projects: {stats.totalProjects}</p>
          </div>
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', marginRight: '12px' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>In Progress: {stats.inProgress}</p>
          </div>
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', marginRight: '12px' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Done: {stats.done}</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {projects.map((project) => (
          <div key={project.id} style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>{project.name}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>{project.description}</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Status: {project.status}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleEditProject(project)}>Edit</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', gridColumn: '1 / -1' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No projects found.</p>
          </div>
        )}
      </div>
      <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>{isEditing ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={isEditing ? handleUpdateProject : handleCreateProject}>
          <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%' }} type="text" name="name" value={isEditing ? editingProject.name : newProject.name} onChange={handleInputChange} placeholder="Name" />
          {errors.name && <p style={{ color: '#f1f5f9', fontSize: '14px', marginTop: '6px' }}>{errors.name}</p>}
          <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', marginTop: '12px' }} type="text" name="description" value={isEditing ? editingProject.description : newProject.description} onChange={handleInputChange} placeholder="Description" />
          {errors.description && <p style={{ color: '#f1f5f9', fontSize: '14px', marginTop: '6px' }}>{errors.description}</p>}
          <select style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', marginTop: '12px' }} name="status" value={isEditing ? editingProject.status : newProject.status} onChange={handleStatusChange}>
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          {errors.status && <p style={{ color: '#f1f5f9', fontSize: '14px', marginTop: '6px' }}>{errors.status}</p>}
          <button style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '12px' }} type="submit">{isEditing ? 'Update Project' : 'Create Project'}</button>
        </form>
      </div>
    </div>
  );
}