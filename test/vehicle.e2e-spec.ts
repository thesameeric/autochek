import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Vehicle Module (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let vehicleId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a user and sign in to get the JWT token
    const createUserDto = {
      firstName: 'Jane',
      otherNames: 'Doe',
      email: 'jane.doe@example.com',
      password: 'securepassword',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(201);

    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'jane.doe@example.com',
        password: 'securepassword',
      })
      .expect(200);

    jwtToken = signInResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new vehicle', async () => {
    const createVehicleDto = {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      vin: '1HGCM82633A123456',
      mileage: 5000,
      color: 'Blue',
      price: 2000000,
      trim: 'Utility 4D SLT2 2.4L I4',
      trim_code: '201031284',
      description: 'Neatly used',
      weight: 3867,
      isAvailable: true,
    };

    return request(app.getHttpServer())
      .post('/vehicles')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createVehicleDto)
      .expect(201)
      .then((response) => {
        vehicleId = response.body.id;
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          ...createVehicleDto,
        });
      });
  });

  it('should retrieve all vehicles', async () => {
    return request(app.getHttpServer())
      .get('/vehicles')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('should retrieve a vehicle by ID', async () => {
    return request(app.getHttpServer())
      .get(`/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          id: vehicleId,
          make: expect.any(String),
          model: expect.any(String),
          year: expect.any(Number),
          vin: expect.any(String),
          mileage: expect.any(Number),
          color: expect.any(String),
          price: expect.any(Number),
        });
      });
  });

  it('should update a vehicle', async () => {
    const updateVehicleDto = { color: 'Red' };

    return request(app.getHttpServer())
      .patch(`/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateVehicleDto)
      .expect(200)
      .then((response) => {
        expect(response.body.color).toBe('Red');
      });
  });

  it('should delete a vehicle', async () => {
    return request(app.getHttpServer())
      .delete(`/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(204);
  });
});
