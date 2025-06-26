const request = require('supertest');
const app = require('../app');

describe('Usuários', () => {
  it('deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ usuario: 'joao', senha: '123456' });
    expect(res.statusCode).toBe(201);
  });

  it('deve listar usuários', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
