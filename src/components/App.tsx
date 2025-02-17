import React,{useState, useEffect} from 'react';
import CodeEditor from './CodeEditor';
import useLocalStorage from '../hooks/useLocalStorage';


function App() {
  const [html,setHtml]= useLocalStorage<string>('html', '');
  const [css,setCss]=useLocalStorage<string>('css','')
  const [js,setJs]=useLocalStorage<string>('js','')
  const [srcDoc, setSrcDoc] = useState<string>('');
useEffect(()=>{
  const timeout=setTimeout(()=>{
    setSrcDoc(
      `<html>
      <body> ${html} </body>
      <style> ${css} </style>
      <script> ${js} </script>
     </html>`
    )
  },250)

  return () => clearTimeout(timeout);

  

},[html,css,js])
  
 

  return (
    <>
    {/*code mirror section*/}
    <div className="panel top-panel">
      <CodeEditor
      language='xml'
      displayName='HTML'
      value={html}
      onChange={setHtml}/>


      <CodeEditor
      language='css'
      displayName='CSS'
      value={css}
      onChange={setCss}/>

      <CodeEditor
      language='javascript'
      displayName='JS'
      value={js}
      onChange={setJs}/>

    </div>
    {/*code mirror bottom section*/}
    <div className='panel'>
      <iframe
      srcDoc={srcDoc}
      title="output"
      sandbox='allow-scripts'
      width='100%'
      height="100%"
      />
    </div>
    </>
  )
}

export default App;
