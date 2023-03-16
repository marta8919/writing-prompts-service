import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentification system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    // remember to change this email so it's a new one, else tests will fail
    const mockEmail = 'asdftest1234@asdf.com'
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: mockEmail, password: '1234'})
      .expect(201)
      .then((res)=> {
        const {id, email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(mockEmail)
      })
  });

  it('signup as a new user then get the currently logged in user', async ()=> {
    const emailMock = 'asdf@asf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: emailMock, password: '123'})
      .expect(201)
    
    const cookie = res.get('Set-Cookie');

    const {body} = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)
    expect(body.email).toEqual(emailMock)
  })
});
