import React, { useState } from 'react';

function MainComponent() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'This is project 1' },
    { id: 2, title: 'Project 2', description: 'This is project 2' },
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    const newProjectData = { id: projects.length + 1, ...newProject };
    setProjects([...projects, newProjectData]);
    setNewProject({ title: '', description: '' });
    setLoading(false);
    setSuccess('Project created successfully');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleUpdateProject = (id, updatedProject) => {
    setLoading(true);
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        return updatedProject;
      }
      return project;
    });
    setProjects(updatedProjects);
    setLoading(false);
    setSuccess('Project updated successfully');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleDeleteProject = (id) => {
    setLoading(true);
    const filteredProjects = projects.filter((project) => project.id !== id);
    setProjects(filteredProjects);
    setLoading(false);
    setSuccess('Project deleted successfully');
    setTimeout(() => setSuccess(null), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>Project Management</div>
        <div style={{ fontSize: '14px', color: '#94a3b8' }}>Manage your projects efficiently</div>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          background: '#0d1220',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '24px',
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#6366f1' }}>{projects.length}</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8' }}>Total Projects</div>
        </div>
        <div style={{
          background: '#0d1220',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '24px',
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#6366f1' }}>{projects.filter((project) => project.status === 'active').length}</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8' }}>Active Projects</div>
        </div>
        <div style={{
          background: '#0d1220',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '24px',
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#6366f1' }}>{projects.filter((project) => project.status === 'completed').length}</div>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8' }}>Completed Projects</div>
        </div>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <div style={{ fontSize: '14px', color: '#94a3b8' }}>Loading...</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>No projects found</div>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} style={{
                background: '#0d1220',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9' }}>{project.title}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }} onClick={() => handleUpdateProject(project.id, { ...project, status: 'active' })}>Update</button>
                  <button style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    padding: '10px 20px',
                  }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {error ? (
        <div style={{ fontSize: '14px', color: '#ff0000', marginBottom: '16px' }}>{error}</div>
      ) : null}
      {success ? (
        <div style={{ fontSize: '14px', color: '#00ff00', marginBottom: '16px' }}>{success}</div>
      ) : null}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleCreateProject}>
        <input style={{
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: '14px',
          outline: 'none',
        }} type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="Project title" />
        <input style={{
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: '14px',
          outline: 'none',
        }} type="text" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder="Project description" />
        <button style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
        }} type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default MainComponent;