import React, { useState } from 'react';

export default function MainComponent() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description 1', status: 'In Progress' },
    { id: 2, title: 'Project 2', description: 'Description 2', status: 'Done' },
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: projects.length,
    inProgress: projects.filter((project) => project.status === 'In Progress').length,
    done: projects.filter((project) => project.status === 'Done').length,
  });

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { id: projects.length + 1, ...newProject, status: 'In Progress' }]);
      setNewProject({ title: '', description: '' });
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      const updatedProjects = projects.map((project) => {
        if (project.id === editingProject.id) {
          return editingProject;
        }
        return project;
      });
      setProjects(updatedProjects);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  const handleStatusChange = (projectId, status) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return { ...project, status };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editingProject) {
      setEditingProject({ ...editingProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleStatusSelect = (event) => {
    const { value } = event.target;
    if (editingProject) {
      setEditingProject({ ...editingProject, status: value });
    }
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
            <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>{project.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>{project.description}</p>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Status: {project.status}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleEditProject(project)}>Edit</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
              <select style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none' }} value={project.status} onChange={(event) => handleStatusChange(project.id, event.target.value)}>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        ))}
        {editingProject ? (
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>Edit Project</h2>
            <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%' }} type="text" name="title" value={editingProject.title} onChange={handleInputChange} />
            <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', marginTop: '12px' }} type="text" name="description" value={editingProject.description} onChange={handleInputChange} />
            <select style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', marginTop: '12px' }} value={editingProject.status} onChange={handleStatusSelect}>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '12px' }} onClick={handleUpdateProject}>Update</button>
          </div>
        ) : (
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>Add Project</h2>
            <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%' }} type="text" name="title" value={newProject.title} onChange={handleInputChange} />
            <input style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', marginTop: '12px' }} type="text" name="description" value={newProject.description} onChange={handleInputChange} />
            <button style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '12px' }} onClick={handleAddProject}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
}