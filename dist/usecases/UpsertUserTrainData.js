import { prisma } from "../lib/db.js";
export class UpsertUserTrainData {
    async execute(dto) {
        const result = await prisma.userTrainData.upsert({
            where: { userId: dto.userId },
            create: {
                userId: dto.userId,
                weightInGrams: dto.weightInGrams,
                heightInCentimeters: dto.heightInCentimeters,
                age: dto.age,
                bodyFatPercentage: dto.bodyFatPercentage / 100,
            },
            update: {
                weightInGrams: dto.weightInGrams,
                heightInCentimeters: dto.heightInCentimeters,
                age: dto.age,
                bodyFatPercentage: dto.bodyFatPercentage / 100,
            },
        });
        return {
            userId: result.userId,
            weightInGrams: result.weightInGrams,
            heightInCentimeters: result.heightInCentimeters,
            age: result.age,
            bodyFatPercentage: result.bodyFatPercentage * 100,
        };
    }
}
