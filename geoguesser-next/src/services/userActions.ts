"use server";

import { prismaConnect } from "@/db/prismaGenerate";

export async function addUser(
  username: string,
  email: string,
  password: string,
  displayName: string
) {
  const user = await prismaConnect.user.create({
    data: {
      name: username,
      email: email,
      password: password,
      displayName: displayName,
    },
  });
  return user;
}

export async function updateUserScoreById(userId: string, score: number) {
  const user = await prismaConnect.game.update({
    where: {
      id: userId,
    },
    data: {
      score: score,
    },
  });
  return user;
}
