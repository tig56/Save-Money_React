import React, { useState, useEffect } from 'react';
import '../styles/index.css';

function ChildApp() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savingsTables');
    if (saved) {
      setTables(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savingsTables', JSON.stringify(tables));
  }, [tables]);

  const addTable = () => {
    setTables([
      ...tables,
      {
        id: Date.now(),
        year: new Date().getFullYear(),
        bank: '三菱UFJ銀行',
        months: Array(12).fill({ goal: 0, result: 0 }),
      },
    ]);
  };

  const updateTable = (id, updatedTable) => {
    setTables(tables.map((table) => (table.id === id ? updatedTable : table)));
  };

  const deleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  return (
    <div className="container">
      <h1>貯蓄管理アプリ</h1>
      <button onClick={addTable}>表を追加</button>
      <div>
        {tables.map((table) => (
          <SavingsTable
            key={table.id}
            data={table}
            onUpdate={(updatedTable) => updateTable(table.id, updatedTable)}
            onDelete={() => deleteTable(table.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SavingsTable({ data, onUpdate, onDelete }) {
  const [year, setYear] = useState(data.year);
  const [bank, setBank] = useState(data.bank);
  const [months, setMonths] = useState(data.months);

  useEffect(() => {
    onUpdate({ ...data, year, bank, months });
  }, [year, bank, months]);

  const handleMonthChange = (index, field, value) => {
    const updatedMonths = months.map((month, i) =>
      i === index ? { ...month, [field]: Number(value) } : month
    );
    setMonths(updatedMonths);
  };

  const totalGoal = months.reduce((sum, m) => sum + m.goal, 0);
  const totalResult = months.reduce((sum, m) => sum + m.result, 0);
  const totalDiff = totalResult - totalGoal;

  return (
    <div className="savings-table">
      <div className="top-bar">
        <span className="year-label">年:</span>
        <input
          type="number"
          className="year-input"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <button className="deleteTableBtn" onClick={onDelete}>
          🗑️ 削除
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>銀行名</th>
            <th>目標金額 (万)</th>
            <th>結果 (万)</th>
            <th>差額 (万)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                <option value="三菱UFJ銀行">三菱UFJ銀行</option>
                <option value="三井住友銀行">三井住友銀行</option>
                <option value="みずほ銀行">みずほ銀行</option>
                <option value="りそな銀行">りそな銀行</option>
                <option value="楽天銀行">楽天銀行</option>
                <option value="ゆうちょ銀行">ゆうちょ銀行</option>
              </select>
            </td>
            <td>{totalGoal}</td>
            <td>{totalResult}</td>
            <td style={{ color: totalDiff >= 0 ? 'green' : 'red' }}>
              {totalDiff}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>月</th>
            <th>設定金額 (万)</th>
            <th>結果 (万)</th>
            <th>差額 (万)</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, index) => {
            const diff = month.result - month.goal;
            return (
              <tr key={index}>
                <td>{index + 1}月</td>
                <td>
                  <input
                    type="number"
                    value={month.goal}
                    onChange={(e) =>
                      handleMonthChange(index, 'goal', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={month.result}
                    onChange={(e) =>
                      handleMonthChange(index, 'result', e.target.value)
                    }
                  />
                </td>
                <td style={{ color: diff >= 0 ? 'green' : 'red' }}>{diff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChildApp;
