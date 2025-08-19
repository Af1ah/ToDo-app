import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    const trimmedText = text.trim();
    if (trimmedText === "") return;
    
    setTodos([...todos, { 
      id: Date.now(), 
      text: trimmedText, 
      done: false 
    }]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ 
      maxWidth: "400px", 
      margin: "20px auto", 
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      minHeight: "100vh",
      boxSizing: "border-box"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        marginBottom: "24px",
        fontSize: "24px",
        fontWeight: "600"
      }}>
        Todo App
      </h2>
      
      <div style={{ 
        display: "flex", 
        gap: "8px",
        marginBottom: "24px"
      }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          style={{ 
            flex: 1, 
            padding: "12px 16px", 
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: "12px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            minWidth: "60px"
          }}
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <div style={{
          textAlign: "center",
          color: "#6b7280",
          fontSize: "16px",
          marginTop: "40px"
        }}>
          No todos yet. Add one above!
        </div>
      ) : (
        <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          margin: 0
        }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                marginBottom: "8px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb"
              }}
            >
              <span 
                onClick={() => toggleTodo(todo.id)}
                style={{ 
                  flex: 1,
                  cursor: "pointer",
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "#6b7280" : "#111827",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  wordBreak: "break-word"
                }}
              >
                {todo.text}
              </span>
              
              <button 
                onClick={() => toggleTodo(todo.id)}
                style={{
                  padding: "8px",
                  backgroundColor: todo.done ? "#10b981" : "#e5e7eb",
                  color: todo.done ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  minWidth: "36px",
                  height: "36px"
                }}
              >
                ✓
              </button>
              
              <button 
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  minWidth: "36px",
                  height: "36px"
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {todos.length > 0 && (
        <div style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "14px",
          color: "#6b7280"
        }}>
          {todos.filter(todo => !todo.done).length} of {todos.length} remaining
        </div>
      )}
    </div>
  );
}

export default App;