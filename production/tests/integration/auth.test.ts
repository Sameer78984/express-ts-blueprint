import request from "supertest";
import app from "../../src/app";
import { UserModel } from "../../src/modules/user/user.model";
import bcrypt from "bcryptjs";

// Mock Mongoose Model
jest.mock("../../src/modules/user/user.model");

describe("Auth Integration", () => {
  const mockUser = {
    _id: "user_123",
    email: "test@example.com",
    password: "hashed_password_123",
    toObject: function () {
      return {
        _id: this._id,
        email: this.email,
        password: this.password,
      };
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/signup", () => {
    it("should register a new user", async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/signup").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      // expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(mockUser.email);
    });

    it("should return 500 if user already exists (Service Error)", async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/signup").send({
        email: "test@example.com",
        password: "password123",
        username: "testuser",
      });

      expect(res.status).toBe(500);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      // Mock Mongoose Query Chain for .select("+password")
      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockUser),
      };
      (UserModel.findOne as jest.Mock).mockReturnValue(mockQuery);

      jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.body.token).toBeDefined();
    });

    it("should fail with wrong password", async () => {
      // Mock Mongoose Query Chain for .select("+password")
      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockUser),
      };
      (UserModel.findOne as jest.Mock).mockReturnValue(mockQuery);

      jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(500);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should clear the cookie", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).toBe(200);
      expect(res.headers["set-cookie"][0]).toContain("token=;");
    });
  });
});
