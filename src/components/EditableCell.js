import { useEffect, useState } from "react";

const EditableCell = ({ value, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
  
    const handleStartEditing = () => {
      setEditing(true);
    };
  
    const handleSave = () => {
      onSave(editValue);
      setEditing(false);
    };
  
    const handleInputChange = (e) => {
      setEditValue(e.target.value);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    };
  
    useEffect(() => {
      setEditValue(value);
    }, [value]);
  
    return (
      <td onClick={handleStartEditing}>
        {editing ? (
          <>
            <input
              className='generic-input'
              type="text"
              value={editValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              onBlur={handleSave}
            />
            <button className="save-button" onClick={handleSave}>Save</button>
          </>
        ) : (
          <>{value}</>
        )}
      </td>
    );
  };
  
  export default EditableCell;
  