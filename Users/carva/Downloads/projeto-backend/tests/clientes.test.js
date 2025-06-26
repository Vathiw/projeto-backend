const request = require('supertest');
const app = require('../app');

describe('Clientes', () => {
  let token;
  let clienteId;

  beforeAll(async () => {
    await request(app).post('/api/usuarios').send({ usuario: 'clienteuser', senha: '123456' });
    const login = await request(app).post('/api/login').send({ usuario: 'clienteuser', senha: '123456' });
    token = login.body.token;
  });

  it('deve criar um cliente', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Carlos',
        sobrenome: 'Souza',
        email: 'carlos@email.com',
        idade: 35
      });
    expect(res.statusCode).toBe(201);
  });

  it('deve listar clientes com cache', async () => {
    const res = await request(app)
      .get('/api/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    clienteId = res.body[0].id;
  });

  it('deve atualizar cliente', async () => {
    const res = await request(app)
      .put(`/api/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Carlos',
        sobrenome: 'Almeida',
        email: 'carlos@email.com',
        idade: 36
      });
    expect(res.statusCode).toBe(200);
  });

  it('deve deletar cliente', async () => {
    const res = await request(app)
      .delete(`/api/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
