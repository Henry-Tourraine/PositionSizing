import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    balance: '',
    entry: '',
    stopLoss: '',
    risk: '',
    leverage: '',
    maxMarginLock: ''
  });

  const calculatePositionSize = () => {
    const { balance, entry, stopLoss, risk } = formData;
    const b = parseFloat(balance);
    const e = parseFloat(entry);
    const s = parseFloat(stopLoss);
    const r = parseFloat(risk);

    if (isNaN(b) || isNaN(e) || isNaN(s) || isNaN(r) || e === s) return '';

    const lossPerUnit = Math.abs(e - s);
    const riskAmount = (r / 100) * b;
    return (riskAmount / lossPerUnit).toFixed(2);
  };

  const calculateMinLeverage = (ps) => {
    const {entry, maxMarginLock, balance} = formData;
    const e = parseFloat(entry);
    const mml = parseFloat(maxMarginLock);
    const b = parseFloat(balance);

    if (isNaN(e) || isNaN(mml)) return '';

    return e * ps / (mml/100 * b);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const positionSize = calculatePositionSize();
  const leverage = calculateMinLeverage(positionSize);

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
      <Typography variant="h6">Trade Settings</Typography>
      <TextField label="Balance" name="balance" type="number" value={formData.balance} onChange={handleChange} />
      <TextField label="Risk %" name="risk" type="number" value={formData.risk} onChange={handleChange} />
      <Typography variant="subtitle1">
        Total risk : <strong>{(formData.balance * formData.risk) || 0} USDT</strong>
      </Typography>
      <hr></hr>
      <TextField label="Entry Price" name="entry" type="number" value={formData.entry} onChange={handleChange} />
      <TextField label="Stop Loss" name="stopLoss" type="number" value={formData.stopLoss} onChange={handleChange} />
      <TextField label="Max. margin lock %" name="maxMarginLock" type="number" value={formData.maxMarginLock} onChange={handleChange} />

      <Typography variant="subtitle1">
        Position Size: <strong>{positionSize || '—'}</strong>
      </Typography>
      <Typography variant="subtitle1">
        Min. Leverage: <strong>{leverage || '—'}</strong>
      </Typography>
    </Box>
  );
}

export default App;
