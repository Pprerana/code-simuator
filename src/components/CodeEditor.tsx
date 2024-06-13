import React,{useState} from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor,IControlledCodeMirror } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

interface CodeEditorProps {
    language: string;
    displayName: string;
    value: string;
    onChange: (value: string) => void;
  }


  const CodeEditor:React.FC<CodeEditorProps>= ({language, displayName,value,onChange }) => 
    {
        const [open, setOpen]= useState<boolean>(true);
        const handleChange: IControlledCodeMirror['onBeforeChange'] = (editor, data, value) => {
            onChange(value);
        }
        return (
            <>
            
        <div className={`code-container ${open? '': 'collapsed'}`}>
        <div className='code-title'>
            {displayName}
            <button
            type="button"
            className='expand-collapse-button'
            onClick={()=>setOpen(prevOpen =>!prevOpen)}
            >
                <FontAwesomeIcon icon ={open? faCompressAlt: faExpandAlt} />
            </button>
        </div>
       <ControlledEditor
       onBeforeChange={handleChange}
       value={value}
       className='code-mirror-wrapper'
       options={{
        lineWrapping: true,
        lint: true,
        mode: language,
        theme: 'material',
        lineNumbers: true,
       }}
       />

            
           
    </div>
    </>
            
            
        )
    }
export default CodeEditor