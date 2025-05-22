// GrandpaApp.jsx
import React, { useState, useEffect } from 'react';
import '../styles/index.css';

const BANK_OPTIONS = [
  "三菱UFJ銀行", "三井住友銀行", "みずほ銀行",
  "りそな銀行", "楽天銀行", "ゆうちょ銀行", "積立NISA"
];

const GrandpaApp = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('grandpaAssets');
    if (saved) {
      setAssets(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grandpaAssets', JSON.stringify(assets));
  }, [assets]);

  const addBank = () => {
    setAssets([...assets, { bank: BANK_OPTIONS[0], amount: 0 }]);
  };

  const updateAsset = (index, key, value) => {
    const updatedAssets = [...assets];
    updatedAssets[index][key] = value;
    setAssets(updatedAssets);
  };

  const deleteAsset = (index) => {
    const updatedAssets = assets.filter((_, i) => i !== index);
    setAssets(updatedAssets);
  };

  const total = assets.reduce((sum, asset) => sum + Number(asset.amount || 0), 0);

  return (
    <div className="container">
      <h1>資産管理アプリ</h1>
      <button id="addBank" onClick={addBank}>銀行追加</button>
      <table id="assetTable">
        <thead>
          <tr>
            <th>銀行名</th>
            <th>貯蓄額(円)</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index}>
              <td>
                <select
                  value={asset.bank}
                  onChange={(e) => updateAsset(index, 'bank', e.target.value)}
                >
                  {BANK_OPTIONS.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={asset.amount}
                  onChange={(e) => updateAsset(index, 'amount', e.target.value)}
                />
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteAsset(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>合計資産金額 : {total.toLocaleString()}円</h2>
    </div>
  );
};

export default GrandpaApp;