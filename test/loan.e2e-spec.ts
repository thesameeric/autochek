import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Loan Module (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let loanId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a user and sign in to get the JWT token
    const createUserDto = {
      firstName: 'John',
      otherNames: 'Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(201);

    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'john.doe@example.com',
        password: 'securepassword',
      })
      .expect(200);

    jwtToken = signInResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new loan request', async () => {
    const createLoanDto = {
      id: 0,
      firstname: 'Johnny',
      othernames: 'Bravo',
      email: 'j.bravo@example.com',
      nin: 123456789,
      phone: '+2348089087866',
      reasonForLoan: 'School',
      income: 12000,
      dob: '1999-01-01',
      requestedAmount: 4000000,
      loanTermMonths: 24,
    };

    return request(app.getHttpServer())
      .post('/loans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createLoanDto)
      .expect(201)
      .then((response) => {
        loanId = response.body.id;
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          ...createLoanDto,
        });
      });
  });

  it('should retrieve all loans', async () => {
    return request(app.getHttpServer())
      .get('/loans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('should retrieve a loan by ID', async () => {
    return request(app.getHttpServer())
      .get(`/loans/${loanId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        console.log(response);
        expect(response.body).toMatchObject({
          id: loanId,
          othernames: expect.any(String),
        });
      });
  });

  it('should update a vehicle', async () => {
    const updateVehicleDto = { color: 'Red' };

    return request(app.getHttpServer())
      .patch(`/loans/${loanId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateVehicleDto)
      .expect(200)
      .then((response) => {
        expect(response.body.color).toBe('Red');
      });
  });

  it('should delete a vehicle', async () => {
    return request(app.getHttpServer())
      .delete(`/loans/${loanId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(204);
  });
});
