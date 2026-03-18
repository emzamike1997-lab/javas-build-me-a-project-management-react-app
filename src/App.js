import React from 'react';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div style={{minHeight:'100vh',background:'#080c14',color:'#f1f5f9',fontFamily:'Inter,sans-serif'}}>
      <nav style={{background:'rgba(8,12,20,0.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'0 32px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'700',color:'white'}}>J</div>
          <span style={{fontWeight:'700',fontSize:'15px'}}>JAVAS</span>
        </div>
        <span style={{fontSize:'13px',color:'#6366f1',fontWeight:'500'}}>build me a project management React app</span>
      </nav>
      <main style={{padding:'32px'}}>
        <MainComponent />
      </main>
    </div>
  );
}
export default App;