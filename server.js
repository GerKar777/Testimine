const express = require('express');
const app = express();
app.use(express.json());

let items = [
  { id: 1, sku: 'A-1', qty: 5 },
  { id: 2, sku: 'B-2', qty: 0 }
];

function resetItems() {
  items = [
    { id: 1, sku: 'A-1', qty: 5 },
    { id: 2, sku: 'B-2', qty: 0 }
  ];
}

function validate(body) {
  if (typeof body.sku !== 'string' || !/^[A-Za-z0-9-]+$/.test(body.sku) || body.sku.length > 20) {
    return { valid: false, error: 'invalid sku' };
  }
  if (typeof body.qty !== 'number' || !Number.isInteger(body.qty) || body.qty < 0) {
    return { valid: false, error: 'invalid qty' };
  }
  return { valid: true };
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/reset', (req, res) => {
  resetItems();
  res.json({ reset: true });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id, 10));
  if (!item) {
    return res.status(404).json({ error: 'not found' });
  }
  res.json(item);
});

app.post('/items', (req, res) => {
  const v = validate(req.body);
  if (!v.valid) {
    return res.status(400).json({ error: v.error });
  }
  const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { id: nextId, sku: req.body.sku, qty: req.body.qty };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id, 10));
  if (!item) {
    return res.status(404).json({ error: 'not found' });
  }
  const v = validate(req.body);
  if (!v.valid) {
    return res.status(400).json({ error: v.error });
  }
  item.sku = req.body.sku;
  item.qty = req.body.qty;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  items.splice(index, 1);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;