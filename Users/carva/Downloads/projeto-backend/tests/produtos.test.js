const request = require('supertest');
const app = require('../app');

describe('Produtos', () => {
  const produto = {
    nome: 'Notebook',
    descricao: 'Notebook potente',
    preco: 2500.00,
    data_atualizado: '2025-06-25 12:00:00'
  };

  let produtoId;

  it('deve criar um novo produto', async () => {
    const res = await request(app).post('/api/produtos').send(produto);
    expect(res.statusCode).toBe(201);
  });

  it('deve listar produtos', async () => {
    const res = await request(app).get('/api/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    produtoId = res.body[0].id;
  });

  it('deve atualizar produto', async () => {
    const res = await request(app).put(`/api/produtos/${produtoId}`).send({
      ...produto,
      descricao: 'Notebook atualizado'
    });
    expect(res.statusCode).toBe(200);
  });

  it('deve deletar produto', async () => {
    const res = await request(app).delete(`/api/produtos/${produtoId}`);
    expect(res.statusCode).toBe(200);
  });
});
