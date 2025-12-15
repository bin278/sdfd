import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: '完成项目报告', completed: false, category: '工作' },
    { id: 2, text: '购买生活用品', completed: true, category: '生活' },
    { id: 3, text: '学习React Hooks', completed: false, category: '学习' },
    { id: 4, text: '健身房锻炼', completed: false, category: '健康' },
    { id: 5, text: '阅读技术文章', completed: false, category: '学习' }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [newCategory, setNewCategory] = useState('');

  const categories = ['全部', '工作', '生活', '学习', '健康'];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const categoryToUse = selectedCategory === '全部' ? '未分类' : selectedCategory;
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      category: categoryToUse
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addCategory = () => {
    if (newCategory.trim() === '' || categories.includes(newCategory)) return;
    categories.push(newCategory);
    setNewCategory('');
  };

  const filteredTodos = selectedCategory === '全部' 
    ? todos 
    : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900 dark:text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">待办事项</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {darkMode ? '🌙 深色模式' : '☀️ 浅色模式'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="添加新的待办事项..."
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  添加
                </button>
              </div>

              <div className="space-y-3">
                {filteredTodos.map(todo => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${todo.completed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded"
                      />
                      <div>
                        <p className={`${todo.completed ? 'line-through' : ''}`}>{todo.text}</p>
                        <span className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {todo.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm">
                  总计: {todos.length} 项 | 
                  已完成: {todos.filter(t => t.completed).length} 项 | 
                  未完成: {todos.filter(t => !t.completed).length} 项
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">分类管理</h2>
            <div className="space-y-2 mb-6">
              {categories.filter(cat => cat !== '全部').map(category => (
                <div
                  key={category}
                  className={`flex justify-between items-center p-3 rounded-lg ${selectedCategory === category ? 'bg-blue-100 dark:bg-blue-900' : darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <span>{category}</span>
                  <span className="text-sm">
                    {todos.filter(todo => todo.category === category).length} 项
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">添加新分类</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  placeholder="分类名称"
                  className={`flex-1 px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
                <button
                  onClick={addCategory}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  添加
                </button>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="font-medium mb-2">分类统计</h3>
              {categories.filter(cat => cat !== '全部').map(category => {
                const categoryTodos = todos.filter(todo => todo.category === category);
                const completed = categoryTodos.filter(t => t.completed).length;
                return (
                  <div key={category} className="text-sm mb-2">
                    <span className="font-medium">{category}:</span> {categoryTodos.length} 项 ({completed} 已完成)
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;