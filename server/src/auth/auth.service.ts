import { createHash } from "node:crypto";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { User } from "src/users/interfaces/user.model";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string, token?: string) {
    if (token) {
      const data = await fetch(
        `${process.env.PGRIT_URL}/api/v1/accounts/verify_credentials`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const pgrituser = await data.json();
      console.log(pgrituser);
      // eslint-disable-next-line unicorn/no-null
      if (pgrituser.error) return null;
      // eslint-disable-next-line no-param-reassign
      username = pgrituser.username;

      const user = await this.prismaService.user.findFirst({
        where: {
          userid: username,
        },
      });
      if (!user) {
        await this.prismaService.user.create({
          data: {
            userid: username,
            pgritId: username,
            password: createHash("sha256").digest("hex"),
          },
        });
      }
    }

    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        userid: username,
      },
      include: {
        team: true,
      },
    });
    if (
      !token ||
      user.password === createHash("sha256").update(password).digest("hex")
    ) {
      return user;
    }

    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  async login(user: User) {
    const payload = { username: user.userid };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
